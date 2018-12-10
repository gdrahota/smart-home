import mongoose from 'mongoose'

import async from 'async'
import MongoDb from '../infrastructure/mongodb'
import { registerMongooseSchemas } from '../database/schemas'

const net = require('net')
let socket

const getControlSystemConfig = cb => {
  mongoose
    .model('control-systems')
    .findOne()
    .exec(cb)
}

const connectToControlSystem = (serverConfig, cb) => {
  socket = new net.Socket()
  socket.connect(serverConfig.port, serverConfig.host, err => {
    socket.on('data', data => {
      console.log('data received', data.toString())
    })
    socket.on('error', data => {
      console.log('error received', data.toString())
    })
    console.log('connected', err)
    cb(err)
  })
}

const sleep = (ms, cb) => {
  setTimeout(cb, ms);
}

const getNextCommand = cb => {
  mongoose
    .model('command-queue')
    .findOne({}, (err, item) => {
      if (!item) {
        cb('NO DATA')
      } else {
        cb(err, item)
      }
    })
}

const updateDataPoint = (item, cb) => {
  const QUERY = { address: item.targetAddress }
  const UPDATE = { $set: { value: item.payload } }
  mongoose.model('data-points').update(QUERY, UPDATE, cb)
}

const removeCommand = (item, cb) => {
  const QUERY = { targetAddress: item.targetAddress }
  mongoose.model('command-queue').remove(QUERY, cb)
}

const processNextCommand = cb => {
  let command
  async.series([
      cb1 => getNextCommand((err, item) => {
        command = item
        console.log(item)

        if (item) {
          const commandToSend = {
            CMD: 'SEND_GROUP',
            SEND_GROUP_DEST: item.targetAddress,
            SEND_GROUP_LEN: 1,
            SEND_GROUP_DATA: [item.payload ? 1 : 0]
          }


          socket.write(JSON.stringify(buf.read()))
        }

        cb1(err)
      }),
      cb1 => updateDataPoint(command, cb1),
      //cb1 => removeCommand(command, cb1)
    ],
    () => {
      cb()
    })
}

const processQueue = () => {
  async.forever(
    cb1 => {
      async.series([
          cb2 => sleep(2000, cb2),
          cb2 => processNextCommand(cb2),
        ],
        err => cb1(err)
      )
    },
    err => {
      console.log('processQueue', err)
      process.exit(1)
    }
  )
}

let serverConfig

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
    cb1 => {
      connectToControlSystem(serverConfig, cb1)
    },
    cb1 => {
      console.log('processQueue...')
      processQueue()
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
