import MongoOplog from "mongo-oplog"
import config from '../../config/server'
import mongoose from 'mongoose'
import { io } from '../infrastructure/websocket'
import { handleKnxValue } from './handleKnxIncommingValue'

export const connectToOplog = async () => {
  return new Promise((resolve, reject) => {
    const oplog = MongoOplog(config.mongoDb.oplog.url, { coll: config.mongoDb.oplog.collection })

    oplog.tail().then(
      () => {
        console.log('connected to oplog')
        resolve(oplog)
      },
      err => {
        console.log('connection to oplog FAILED')
        reject(err)
      }
    )
  })
}

export const handleOplog = oplog => {
  oplog.on('insert', doc => {
    const nsParts = doc.ns.split('.')
    const collection = nsParts[1]

    try {
      mongoose.model(collection).findOne(doc.o).exec((err, data) => {
        if (io) {
          io.emit('add_' + collection.replace(/-/g, '_').toLowerCase() + '_response', data)
        }
      })
    }
    catch (e) {
    }
  })

  oplog.on('update', doc => {
    const nsParts = doc.ns.split('.')
    const collection = nsParts[1]

    switch (collection) {
      case 'values-from-knx':
        handleKnxValue(doc).then()
        break
      default: {
        try {
          mongoose
            .model(collection)
            .findOne(doc.o2)
            .exec((err, data) => {
              if (!err && data && io) {
                io.emit('update_' + collection.replace(/-/g, '_').toLowerCase() + '_response', data)
              }
            })
        }
        catch (e) {
          console.log(e)
        }
      }
    }
  })

  oplog.on('delete', doc => {
    const nsParts = doc.ns.split('.')
    const collection = nsParts[1]
    if (io) {
      io.emit('remove_' + collection.replace(/-/g, '_').toLowerCase() + '_response', doc.o._id)
    }
  })
  console.log('oplog handler established')
}
