import MongoDb from '../infrastructure/mongodb'
import { registerMongooseSchemas } from '../database/schemas'
import { getControlSystemConfig } from './data-access'
import { connectToKnx } from './eibd-api'
import { connectToOplog, handleOplog } from './oplog'
import config from '../../config/server'

require('events').EventEmitter.prototype._maxListeners = 100

const start = async () => {
  const controlSystemId = process.argv[2]
  console.log()
  console.log('====================================================================================================================')
  console.log('| control system with ID ', controlSystemId, 'starts                                                          |')

  try {
    await MongoDb.connect()
    registerMongooseSchemas()
    const serverConfig = await getControlSystemConfig(controlSystemId)
    await connectToKnx(serverConfig)
    const oplog = await connectToOplog(config)
    handleOplog(oplog)

    console.log('| KNX ADAPTER STARTUP SUCCESSFULLY                                                                                 |')
    console.log('====================================================================================================================')
    console.log('')
  }
  catch (err) {
    console.log('| ERROR during knx adapter startup:                                                                                |')
    console.log(err)
    console.log('| KNX ADAPTER STARTUP STOPPED                                                                                      |')
    console.log('====================================================================================================================')
    console.log('')
    process.exit(0)
  }
}

(async () => await start())()
