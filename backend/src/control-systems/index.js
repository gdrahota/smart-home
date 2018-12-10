import async from 'async'
import MongoDb from '../infrastructure/mongodb'
import { registerMongooseSchemas } from '../database/schemas'
import config from '../../config/server'
import { getDataPoint, getControlSystemConfig, getCommand, removeCommand, setDataPointValue } from './data-access'
import { connect } from './eibd-api'
import { connectToOplog } from './oplog'

require('events').EventEmitter.prototype._maxListeners = 100

let serverConfig

let eibd

// helper to terminate tunnel
export const stop = () => {
  return client.disconnect().then(
    () => process.exit(),
    () => process.exit()
  )
}

const KnxListener = require("knx-listener")
const knxDatapoints = require('knx-datapoints')

const connectToControlSystem = (serverConfig, cb) => {
  // 2. Establish tunneling with recovery time of 1s
  client.bind(serverConfig.host, serverConfig.port, { timeout: 2000 })
  //
  //client.ready(() => {
  //  console.log('socket established')
  //
  //  async.series(
  //    [
  //      cb1 => send("6/1/1", cb1),
  //      cb1 => setTimeout(cb1, 1000),
  //      cb1 => send("4/1/1", cb1),
  //    ],
  //    err => {
  //      console.log('fertig', err)
  //      cb()
  //    }
  //  )

  client.on("query", data => {
    const groupAddress = KnxListener.num2knxAddr(data.dest)
    async.waterfall([
      cb1 => getDataPoint(groupAddress, cb1),
      (dataPoint, cb1) => {
        let payload = null
        try {
          if (dataPoint.dataType.substr(0, 1) === '1') {
            payload = data.data[0] === 1
          } else {
            payload = knxDatapoints.decode(dataPoint.dataType, data.data)
          }
        }
        catch (e) {
          console.log('DPT not supported', dataPoint.dataType, e)
        }

        if (payload !== null) {
          console.log('update', groupAddress, payload)
          setDataPointValue(dataPoint, payload, cb1)
        }
      }
    ])
    cb()
  })
}

async.series([
    cb1 => MongoDb.connect(err => {
      console.log('connected', err)
      cb1(err)
    }),
    cb1 => registerMongooseSchemas(() => {
      console.log('registerMongooseSchemas')
      cb1()
    }),
    cb1 => {
      getControlSystemConfig((err, config) => {
        serverConfig = config
        cb1(err)
      })
    },
    cb1 => connect(serverConfig, (err, connection) => {
      eibd = connection
      console.log('connected to eibd')
      cb1(err)
    }),
    cb1 => {
      connectToOplog(config, eibd)
      cb1()
    }
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
