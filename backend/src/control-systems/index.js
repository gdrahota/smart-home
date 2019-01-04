import MongoDb from '../infrastructure/mongodb'
import { registerMongooseSchemas } from '../database/schemas'
import { getControlSystemConfig } from './data-access'
import { connectToKnx } from './eibd-api'
import { connectToOplog, handleOplog } from './oplog'
import config from '../../config/server'

require('events').EventEmitter.prototype._maxListeners = 100

const start = async () => {
  try {
    await MongoDb.connect()
    registerMongooseSchemas()
    const serverConfig = await getControlSystemConfig()
    const knxConnection = await connectToKnx(serverConfig)
    const oplog = await connectToOplog(config)
    handleOplog(oplog, knxConnection)

    console.log('== SERVER STARTUP SUCCESSFULLY :) <<<')
    console.log('')
  }
  catch (err) {
    console.log('=> ERROR during server startup:')
    console.log(err)
    console.log('========= SERVER STARTUP STOPPED ========')
    process.exit(0)
  }
}

(async () => await start())()
