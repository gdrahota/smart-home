import { registerClientEndpoints } from './clients'
import { registerFacilityEndpoints } from './facilities'
import { registerFacilityAttributeEndpoints } from './facility-attributes'
import { registerFacilityAttributeValuesEndpoints } from './facility-attribute-values'
import { registerControlEndpoints } from './controls'
import UserService from '../services/clients'

export const registerEndpoints = (io, cb) => {
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
      }
    )
    .on('disconnect', reason => {
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, need to reconnect manually
      }
      // else the socket will automatically try to reconnect
      console.log('webSocket disconnected')
    })

  cb()
}
