const cp = require('child_process')
import { ControlSystemService } from '../services/control-systems'

export const startKnxAdapters = async controlSystemConfig => {
  const subProcesses = []
  const controlSystems = await ControlSystemService.getAll()

  controlSystems.forEach(controlSystem => {
    const process = cp.fork(`${__dirname}/../control-systems/index.js`, [controlSystem._id])
    subProcesses.push(process)
  })

  return subProcesses
}
