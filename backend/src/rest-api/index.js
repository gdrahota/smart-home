import MongoOplog from "mongo-oplog"
import mongoose from 'mongoose'
import { io } from '../infrastructure/websocket'
import { registerClientEndpoints } from './clients'
import { registerFacilityEndpoints } from './facilities'
import { registerFacilityAttributeEndpoints } from './facility-attributes'
import { registerFacilityAttributeValuesEndpoints } from './facility-attribute-values'
import { registerControlEndpoints } from './controls'
import { registerDataPointEndpoints } from './data-points'
import { registerControlDataPointEndpoints } from './control-data-points'
import { registerControlSystemEndpoints } from './control-systems'
import { registerCommandQueueEndpoints } from './command-queue'
import UserService from '../services/clients'
import config from '../../config/server'

export const registerEndpoints = cb => {
  io
    .on('connection', socket => {
        // register middleware for each new packet received
        socket.use((packet, next) => {
          UserService.updateExpirationDate(socket.id)
          next()
        })

        registerClientEndpoints(io, socket)
        registerFacilityEndpoints(io, socket)
        registerFacilityAttributeEndpoints(io, socket)
        registerFacilityAttributeValuesEndpoints(io, socket)
        registerControlEndpoints(io, socket)
        registerDataPointEndpoints(io, socket)
        registerControlDataPointEndpoints(io, socket)
        registerControlSystemEndpoints(io, socket)
        registerCommandQueueEndpoints(io, socket)
      }
    )
    .on('disconnect', reason => {
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, need to reconnect manually
      }
      // else the socket will automatically try to reconnect
      console.log('webSocket disconnected')
    })

  const oplog = MongoOplog(config.mongoDb.oplog.url, { coll: config.mongoDb.oplog.collection })
  oplog.tail(() => {
    console.log('oplog started')
  })

  oplog.on('op', data => {
    //console.log('op', data);
  })

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
    try {
      mongoose.model(collection).findOne(doc.o2).exec((err, data) => {
        console.log('update_' + collection.replace(/-/g, '_').toLowerCase() + '_response')
        if (io) {
          io.emit('update_' + collection.replace(/-/g, '_').toLowerCase() + '_response', data)
        }
      })
    }
    catch (e) {
      console.log(e)
    }
  })

  oplog.on('delete', doc => {
    const nsParts = doc.ns.split('.')
    const collection = nsParts[1]
    if (io) {
      io.emit('remove_' + collection.replace(/-/g, '_').toLowerCase() + '_response', doc.o._id)
    }
  })

  cb()
}
