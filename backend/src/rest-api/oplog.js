import MongoOplog from "mongo-oplog"
import config from '../../config/server'
import mongoose from 'mongoose'
import { io } from '../infrastructure/websocket'
import { handleKnxValue } from './handleKnxIncommingValue'

const subscribeToCollections = [
  'control-data-points',
  'control-systems',
  'controls',
  'data-points',
  'external-data-sources',
  'facilities',
  'facility-attribute-values',
  'facility-attributes',
  'file-uploads',
  'knx-events',
  'schedules',
  'users',
  'values-from-knx',
]

export let oplog

export const connectToOplog = async () => {
  return new Promise((resolve, reject) => {
    oplog = MongoOplog(config.mongoDb.oplog.url, { coll: config.mongoDb.oplog.collection })

    oplog.tail().then(
      () => {
        console.log('connected to oplog')
        resolve()
      },
      err => {
        console.log('connection to oplog FAILED')
        reject(err)
      }
    )
  })
}

export const handleOplog = () => {
  oplog.on('insert', doc => {
    const nsParts = doc.ns.split('.')
    const collection = nsParts[1]

    if (subscribeToCollections.indexOf(collection) === -1) {
      return
    }

    try {
      if (collection === 'values-from-knx') {
        handleKnxValue(doc.o._id).then()
      }

      mongoose
        .model(collection)
        .findOne(doc.o)
        .exec(
          (err, data) => {
            if (io) {
              io.emit('add_' + collection.replace(/-/g, '_').toLowerCase() + '_response', data)
            }
          })
    } catch (e) {
      if (e.name !== 'MissingSchemaError') {
        console.log(' ')
        console.log('insert error', doc)
        console.log(e)
        console.log(' ')
      }
    }
  })

  oplog.on('update', async doc => {
    const nsParts = doc.ns.split('.')
    const collection = nsParts[1]

    if (subscribeToCollections.indexOf(collection) === -1) {
      return
    }

    if (collection === 'values-from-knx') {
      handleKnxValue(doc.o2._id).then()
    }

    try {
      mongoose
        .model(collection)
        .findOne(doc.o2)
        .exec((err, data) => {
          if (!err && data && io) {
            io.emit('update_' + collection.replace(/-/g, '_').toLowerCase() + '_response', data)
          }
        })
    } catch (e) {
      if (e.name !== 'MissingSchemaError') {
        console.log(' ')
        console.log('update error', doc)
        console.log(e)
        console.log(' ')
      }
    }

  })

  oplog.on('delete', doc => {
    const nsParts = doc.ns.split('.')
    const collection = nsParts[1]

    if (subscribeToCollections.indexOf(collection) === -1) {
      return
    }

    if (io) {
      io.emit('remove_' + collection.replace(/-/g, '_').toLowerCase() + '_response', doc.o._id)
    }
  })
  console.log('oplog handler established')
}
