import { FileUploadService } from './file-uploads'
import { Project, projectParser } from '../lib/index'
import readProjectFromJson from '../lib/readProjectFromJson'
import DecompressZip from 'decompress-zip'

const unzip = pathAndFileName => {
  const fileName = pathAndFileName.substring(5)
  const saveToDirectory = '/tmp/projects/' + fileName.substring(0, fileName.length - 8)

  const unZipper = new DecompressZip(pathAndFileName)

  return new Promise((resolve) => {
    // Install handlers
    unZipper.on('error', err => {
      console.log('B')
      resolve(err)
    })

    unZipper.on('extract', (data) => {
      console.log('file unzipped successfully', data)
      resolve(saveToDirectory)
    })

    // Start the extraction process
    unZipper.extract({
      path: saveToDirectory
    })
  })
}

const saveNewFileUpLoad = async (name, inputPathName) => {
  const doc = {
    name,
    inputPathName
  }

  return await FileUploadService.add(doc)
}

const parseAndSaveProject = async workingDir => {
  try {
    const parser = await projectParser(workingDir, workingDir)
    return await parser(true)
  } catch (error) {
    console.log(error)
  }
}

const saveOutputToFile = async (outputPathName, parsedFiles) => {
  await parsedFiles.exportToJson(outputPathName)
}

export default async (socket, fileEvent) => {
  try {
    const saveToDirectory = await unzip(fileEvent.pathName)

    // create new doc in collection 'file-uploads'
    const doc = await saveNewFileUpLoad(fileEvent.name, fileEvent.pathName)

    const parsedProjectFiles = await parseAndSaveProject(saveToDirectory)

    const outputFileName = saveToDirectory + '/output.project'
    await saveOutputToFile(outputFileName, parsedProjectFiles)

    //save the output file name
    doc.outputPathName = outputFileName
    await doc.save()

    //console.log('==> 2 file analyzed', doc)

    // instantiate the project reader
    const reader = await readProjectFromJson(outputFileName)

    socket.emit('file_upload_succeeded', doc)

    const project = new Project(reader)

    // collect all group addresses
    const groupAddresses = project.getGroupAddresses()
    //console.log('==> 3 groupAddresses', groupAddresses)

    socket.emit('project_group_addresses', groupAddresses)

    const buildingParts = project.getBuildingParts()
    //console.log('==> 4 buildingParts', buildingParts)

    socket.emit('setup_building_parts', buildingParts)

    const devices = project.getDevices()
    socket.emit('setup_devices', devices)

    console.log('')
    console.log('groupAddresses', groupAddresses.length)
    console.log('rooms', buildingParts.length)
    console.log('devices', devices.length)
    console.log('')
  } catch (err) {
    console.error('ERROR', err)
  }
}
