import { io } from '../infrastructure/websocket'
import { registerClientEndpoints } from './clients'
import { registerCommands } from './commands'
import { registerControlDataPointEndpoints } from './control-data-points'
import { registerControlEndpoints } from './controls'
import { registerControlSystemEndpoints } from './control-systems'
import { registerDataPointEndpoints } from './data-points'
import { registerExternalDataSourcesEndpoints } from './external-data-sources'
import { registerFacilityEndpoints } from './facilities'
import { registerFacilityAttributeEndpoints } from './facility-attributes'
import { registerFacilityAttributeValuesEndpoints } from './facility-attribute-values'
import { registerFileUploadEndpoints } from './file-uploads'
import { registerScheduleEndpoints } from './schedules'
import { registerUserEndpoints } from './users'
import UserService from '../services/clients'

export const registerEndpoints = () => {
  io
    .on('connection', async socket => {
      // register middleware for each new packet received
      socket.use((packet, next) => {
        UserService.updateExpirationDate(socket.id)
        next()
      })

      registerClientEndpoints(io, socket)
      registerCommands(io, socket)
      registerControlEndpoints(io, socket)
      registerControlDataPointEndpoints(io, socket)
      registerControlSystemEndpoints(io, socket)
      registerDataPointEndpoints(io, socket)
      registerExternalDataSourcesEndpoints(io, socket)
      registerFacilityEndpoints(io, socket)
      registerFacilityAttributeEndpoints(io, socket)
      registerFacilityAttributeValuesEndpoints(io, socket)
      registerFileUploadEndpoints(io, socket)
      registerScheduleEndpoints(io, socket)
      registerUserEndpoints(io, socket)
    })
    .on('disconnect', reason => {
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, need to reconnect manually
      }
      // else the socket will automatically try to reconnect
      console.log('webSocket disconnected')
    })
}
