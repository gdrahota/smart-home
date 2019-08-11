import { FileUploadService } from './file-uploads'
import { Project, projectParser } from '../lib/index'

const saveNewFileUpLoad = async (name, inputPathName) => {
  const doc = {
    name,
    inputPathName
  }

  return await FileUploadService.add(doc)
}

const parseAndSaveProject = async inputPathName => {
  const parser = await projectParser(inputPathName, '/tmp')
  return await parser(true)
}

const saveOutputToFile = async (outputPathName, parsedFiles) => {
  await parsedFiles.exportToJson(outputPathName)
}

export default async (socket, fileEvent) => {
  try {
    // create new doc in collection 'file-uploads'
    const doc = await saveNewFileUpLoad(fileEvent.name, fileEvent.pathName)

    socket.emit('file_upload_succeeded', doc)

    const parsedProjectFiles = await parseAndSaveProject(doc.inputPathName)

    const outputFileName = '/tmp/' + doc._id + '.json'
    await saveOutputToFile(outputFileName, parsedProjectFiles)

    // save the output file name
    doc.outputPathName = outputFileName
    await doc.save()

    console.log('==> 2 file analyzed', doc)

    // instantiate the project reader
    console.log('parsedProjectFiles', parsedProjectFiles)
    const project = new Project(parsedProjectFiles)

    // collect all group addresses
    const groupAddresses = project.getGroupAddresses()
    console.log('==> 3 groupAddresses', groupAddresses)

    socket.emit('project_group_addresses', groupAddresses)
  } catch (err) {
    console.error('ERROR', err)
  }
}
