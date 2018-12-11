import ClientService from '../services/clients'
import { ControlDataPointService } from '../services/control-data-points'
import { CommandQueueService } from '../services/command-queue'
import { ControlService } from '../services/controls'
import { ControlSystemService } from '../services/control-systems'
import { DataPointService } from '../services/data-points'
import { FacilityService } from '../services/facilities'
import { FacilityAttributesService } from '../services/facility-attributes'
import { FacilityAttributeValuesService } from '../services/facility-attribute-values'
import async from 'async'

export const registerClientEndpoints = (io, socket) => {
  const sendDataToClient = () => {
    console.log('logged in')
    async.series([
      cb => {
        ControlDataPointService.getAll((err, items) => {
          err
            ? socket.emit('control_data_points_failed', err)
            : socket.emit('control_data_points_response', items)
          cb()
        })
      },
      cb => {
        ControlSystemService.getAll((err, items) => {
          err
            ? socket.emit('control_systems_failed', err)
            : socket.emit('control_systems_response', items)
          cb()
        })
      },
      cb => {
        ControlSystemService.getTypes((err, items) => {
          err
            ? socket.emit('control_system_types_failed', err)
            : socket.emit('control_system_types_response', items)
          cb()
        })
      },
      cb => {
        DataPointService.getAll((err, items) => {
          err
            ? socket.emit('data_points_failed', err)
            : socket.emit('data_points_response', items)
          cb()
        })
      },
      cb => {
        ControlService.getAll((err, items) => {
          err
            ? socket.emit('controls_failed', err)
            : socket.emit('controls_response', items)
          cb()
        })
      },
      cb => {
        FacilityAttributeValuesService.getAll((err, items) => {
          err
            ? socket.emit('facility_attribute_values_failed', err)
            : socket.emit('facility_attribute_values_response', items)
          cb()
        })
      },
      cb => {
        FacilityAttributesService.getAll((err, items) => {
          err
            ? socket.emit('facility_attributes_failed', err)
            : socket.emit('facility_attributes_response', items)
          cb()
        })
      },
      cb => {
        FacilityService.getAll((err, items) => {
          err
            ? socket.emit('facilities_failed', err)
            : socket.emit('facilities_response', items)
          cb()
        })
      },
    ])
  }

  const cbLogin = credentials =>
    ClientService.login(credentials, socket.id, (err, clientAndRoles) => {
      console.log('login', credentials)
      if (err) {
        socket.emit('login_failed', err)
      } else {
        socket.emit('login_response', clientAndRoles)
        // Join private channel
        socket.join(clientAndRoles.client.clientId)

        // send data to client
        sendDataToClient()
      }
    })

  const cbReLogin = clientId =>
    ClientService.reLogin(socket.id, clientId, (err, clientAndRoles) => {
      if (err || !clientAndRoles) {
        socket.emit('login_failed')
      } else {
        socket.emit('login_response', clientAndRoles)
        // Join private channel
        socket.join(clientAndRoles.client.clientId)

        // send data to client
        sendDataToClient()
      }
    })

  const cbLogout = clientId =>
    ClientService.logOut(clientId)

  socket
    .on('login', cbLogin)
    .on('reLogin', cbReLogin)
    .on('logout', cbLogout)
}
