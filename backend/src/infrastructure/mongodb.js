import mongoose from 'mongoose'
import config from '../../config/server'
import MongoOplog from 'mongo-oplog'
import { io } from './websocket'

// Use native promises in mongoose
mongoose.Promise = global.Promise

export const oplog = MongoOplog('mongodb://127.0.0.1:27017/local', { coll: 'oplog.$main' })
oplog.tail()

oplog.on('insert', doc => {
  const nsParts = doc.ns.split('.')
  const collection = nsParts[1]

  mongoose.model(collection).findOne(doc.o).exec((err, data) => {
    io.emit('add_' + collection.replace(/-/g, '_').toLowerCase() + '_response', data)
  })
})

oplog.on('update', doc => {
  const nsParts = doc.ns.split('.')
  const collection = nsParts[1]
  mongoose.model(collection).findOne(doc.o2).exec((err, data) => {
    io.emit('update_' + collection.replace(/-/g, '_').toLowerCase() + '_response', data)
  })
})

oplog.on('delete', doc => {
  const nsParts = doc.ns.split('.')
  const collection = nsParts[1]
  io.emit('remove_' + collection.replace(/-/g, '_').toLowerCase() + '_response', doc.o._id)
})

const connect = cb => {
  mongoose.connect(
    config.mongoDb.url,
    config.mongoDb.options,
    err => cb(err)
  )
}

const disconnect = cb => mongoose.connection.close(err => cb(err))

const dropDatabase = cb => mongoose.connection.dropDatabase(err => cb(err))

export default {
  connect,
  disconnect,
  dropDatabase
}
