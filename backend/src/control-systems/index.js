import async from 'async'
import MongoDb from '../infrastructure/mongodb'
import mongoose from 'mongoose'
import { registerMongooseSchemas } from '../database/schemas'
import processQueue from './process-queue'

const net = require('net')

let socket
let socketConfig

const getControlSystemConfig = cb => {
  mongoose
    .model('control-systems')
    .findOne()
    .exec((err, item) => {
      socketConfig = item
      cb(err)
    })
}

const connectToControlSystem = cb => {
  socket = new net.Socket()
  socket.connect(socketConfig.port, socketConfig.host, err => {
    socket.on('data', data => {
      console.log('data received', data.toString())
    })
    cb(err)
  })
}

async.series([
    cb1 => MongoDb.connect(err => cb1(err)),
    cb1 => registerMongooseSchemas(() => cb1()),
    cb1 => getControlSystemConfig(() => cb1()),
    cb1 => connectToControlSystem(() => cb1()),
    cb1 => processQueue(socket, () => cb1())
  ],
  err => {
    if (err) {
      console.log('=> ERROR during server startup:')
      console.log(err)
      console.log('========= SERVER STARTUP STOPPED ========')
      process.exit(0)
    } else {
      console.log('== SERVER STARTUP SUCCESSFULLY :) <<<')

      //const cmd = { CMD: 'SEND_GROUP', 'SEND_GROUP_LEN': 2, 'SEND_GROUP_DATA': [0, 129], 'SEND_GROUP_DEST': '0/1/1' }
      //socket.write(JSON.stringify(cmd))
      //console.log(JSON.stringify(cmd))

      console.log('')
    }
  }
)
