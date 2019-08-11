import { Project } from './index'
import JsonFileReader from './readProjectFromJson'

const read = async () => {
  const projectData = await JsonFileReader('./OUTPUT.json')

  const project = new Project(projectData)

  console.log(project.getGroupAddresses())
  // console.log(JSON.stringify(project.getGroupAddresses()[0]))
  // console.log(project.getDevices())
  // project.getDevices()
}

(() => read())()
