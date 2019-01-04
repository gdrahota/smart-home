import ClientService from '../services/clients'
import { ControlDataPointService } from '../services/control-data-points'
import { ControlSystemService } from '../services/control-systems'
import { DataPointService } from '../services/data-points'
import { ControlService } from '../services/controls'
import { FacilityAttributeValuesService } from '../services/facility-attribute-values'
import { FacilityAttributesService } from '../services/facility-attributes'
import { FacilityService } from '../services/facilities'

export const registerClientEndpoints = (io, socket) => {
  const sendDataToClient = async () => {
    const getValues = async (responseType, service) => {
      try {
        const items = await service.getAll()
        socket.emit(responseType + '_response', items)
      }
      catch (err) {
        socket.emit(responseType + '_failed', err)
      }
    }

    await getValues('control_data_points', ControlDataPointService)
    await getValues('control_systems', ControlSystemService)
    await getValues('control_system_types', ControlSystemService)
    await getValues('data_points', DataPointService)
    await getValues('controls', ControlService)
    await getValues('facility_attribute_values', FacilityAttributeValuesService)
    await getValues('facility_attributes', FacilityAttributesService)
    await getValues('facilities', FacilityService)

    socket.emit('control_system_types_response', ControlSystemService.getTypes())
  }

  const cbLogin = async credentials => {
    try {
      const client = await ClientService.login(credentials, socket.id)

      if (client === 'UNKNOWN_USER_OR_WRONG_PASSWORD') {
        socket.emit('login_failed', client)
      } else {
        const clientAndRoles = { client }
        socket.emit('login_response', clientAndRoles)
        socket.join(clientAndRoles.client.clientId)
        await sendDataToClient()
      }
    }
    catch (err) {
      socket.emit('login_failed', err)
    }
  }

  const cbReLogin = async clientId => {
    try {
      const client = await ClientService.reLogin(socket.id, clientId)
      const clientAndRoles = { client }
      socket.emit('login_response', clientAndRoles)
      socket.join(clientAndRoles.client.clientId)
      await sendDataToClient()
    }
    catch (err) {
      socket.emit('login_failed')
    }
  }

  const cbLogout = async clientId => await ClientService.logOut(clientId)

  socket
    .on('login', cbLogin)
    .on('reLogin', cbReLogin)
    .on('logout', cbLogout)
}
