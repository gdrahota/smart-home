import config from '../../config/server'
import uploadAndAnalyzeEtsProject from '../services/upload-and-analyze-ets-project'

let conn
export let io

export const bindWebSocketToServer = async server => {
  return new Promise((resolve, reject) => {
    io = require('socket.io')(server)

    io.on('connect', () => {
      console.log('-> client has been connected')
    })

    io.sockets.on("connection", socket => {
      const SocketIOFileUpload = require('socketio-file-upload')
      const uploader = new SocketIOFileUpload();
      uploader.dir = '/tmp'

      uploader.listen(socket);

      uploader.on('start', event => {
        console.log('start', event.file);
      })

      // file has been uploaded
      uploader.on('saved', async event => {
        console.log('saved', event.file);
        await uploadAndAnalyzeEtsProject(socket, event.file)
      })

      uploader.on('error', event => {
        console.log("Error from uploader", event)
      })
    })

    conn = server
      .listen(
        config.server.port,
        err => {
          if (err) {
            console.log('=! Server does NOT listening!', err)
            reject(err)
          } else {
            console.log('=> Server listens on port ' + config.server.port + ' bind to ip address 0.0.0.0')
            resolve(conn)
          }
        }
      )
  })
}

export const closeConnection = async () => conn.close()
