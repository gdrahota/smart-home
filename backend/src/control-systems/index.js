import MongoDb from '../infrastructure/mongodb'
import { registerMongooseSchemas } from '../database/schemas'
import { getControlSystemConfig } from './data-access'
import { connectToKnx } from './eibd-api'
import { requestAllDataPopintValues, startCommandQueueWatcher } from './oplog'

const attachKnxControlSystem = async serverConfig => {
  try {
    await connectToKnx(serverConfig)
  }
  catch (e) {
    console.log('ERROR => ', e)
  }
}

const start = async () => {
  const controlSystemId = process.argv[2]
  console.log()
  console.log('====================================================================================================================')
  console.log('| control system with ID ', controlSystemId, 'starts                                                          |')

  try {
    await MongoDb.connect()
    registerMongooseSchemas()
    const serverConfig = await getControlSystemConfig(controlSystemId)
    await attachKnxControlSystem(serverConfig)
    startCommandQueueWatcher()
    await requestAllDataPopintValues(controlSystemId)

    console.log('| KNX ADAPTER STARTUP SUCCESSFULLY                                                                                 |')
    console.log('====================================================================================================================')
    console.log('')
  }
  catch (err) {
    console.log('| ERROR during knx adapter startup:                                                                                |')
    console.log(err)
    console.log('| KNX ADAPTER STOPPED !                                                                                            |')
    console.log('====================================================================================================================')
    console.log('')
    process.exit(0)
  }
}

(async () => await start())()
