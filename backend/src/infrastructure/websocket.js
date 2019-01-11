import config from '../../config/server'

let conn
export let io

export const bindWebSocketToServer = async server => {
  return new Promise((resolve, reject) => {
    io = require('socket.io')(server)

    io.on('connect', () => {
      console.log('-> client has been connected')
    })

    conn = server.listen(
      config.server.port,
      err => {
        if (err) {
          console.log('=! Server does NOT listening!', err)
          reject(err)
        } else {
          console.log('=> Server listens on port ' + config.server.port + ' bind to ip address ' + config.server.host)
          resolve(conn)
        }
      }
    )
  })
}

export const closeConnection = async () => conn.close()
