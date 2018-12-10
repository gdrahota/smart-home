import config from '../../config/server'
//import socketIo from 'socket.io'

let conn
export let io

export const bindWebSocketToServer = (server, cb) => {
  io = require('socket.io')(server);

  io.on('connect', () => {
    console.log('client has been connected', )
  })

  conn = server.listen(
    config.server.port,
    err => {
      if (err) {
        console.log('WebSocket connection error:', err)
      } else {
        console.log('>>> SERVER LISTENS ON PORT ' + config.server.port + ' bind to ip address ' + config.server.host)
      }
      cb(err)
    }
  )
}

export const closeConnection = cb => conn.close(err => cb(err))
