import express from 'express'
import http from 'http'
import { bindWebSocketToServer, closeConnection } from '../../../src/infrastructure/websocket'
import { registerEndpoints } from '../../../src/rest-api'

const app = express()
const server = http.Server(app)

const start = cb => {
  bindWebSocketToServer(server, (err, io) => {
    if (err) {
      console.log('err', err)
      cb(err)
    } else {
      console.log('socket created')
      registerEndpoints(io, err => cb(err))
    }
  })
}

const stop = cb => {
  closeConnection(err => cb(err))
}

export default {
  start,
  stop
}

