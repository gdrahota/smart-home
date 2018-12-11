import async from 'async'
import MongoDb from '../infrastructure/mongodb'
import { registerMongooseSchemas } from '../database/schemas'
import config from '../../config/server'
import { getControlSystemConfig, getCommand, removeCommand, setDataPointValue } from './data-access'
import { connectToKnx } from './eibd-api'
import { connectToOplog } from './oplog'

require('events').EventEmitter.prototype._maxListeners = 100

let serverConfig

let knxConnection

async.series(
  [
    cb1 => MongoDb.connect(cb1),
    cb1 => registerMongooseSchemas(cb1),
    cb1 => {
      getControlSystemConfig((err, config) => {
        serverConfig = config
        cb1(err)
      })
    },
    cb1 => {
      connectToKnx(serverConfig, (err, connection) => {
        knxConnection = connection
        cb1(err)
      })
    },
    cb1 => connectToOplog(config, knxConnection, cb1)
  ],
  err => {
    if (err) {
      console.log('=> ERROR during server startup:')
      console.log(err)
      console.log('========= SERVER STARTUP STOPPED ========')
      process.exit(0)
    } else {
      console.log('== SERVER STARTUP SUCCESSFULLY :) <<<')
      console.log('')
    }
  }
)
