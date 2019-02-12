import ClientService from '../services/clients'
import { ControlDataPointService } from '../services/control-data-points'
import { ControlDefinitionService } from '../services/control-definitions'
import { ControlSystemService } from '../services/control-systems'
import { ControlService } from '../services/controls'
import { DataPointService } from '../services/data-points'
import { ExternalDataSourceService } from '../services/external-data-sources'
import { FacilityAttributeValuesService } from '../services/facility-attribute-values'
import { FacilityAttributesService } from '../services/facility-attributes'
import { FacilityService } from '../services/facilities'
import { KnxEventService } from '../services/knx-events'
import { ScheduleService } from '../services/schedules'
import { UserService } from '../services/users'
import { ValuesFromKnxService } from '../services/values-from-knx'

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
    await getValues('control_definitions', ControlDefinitionService)
    await getValues('controls', ControlService)
    await getValues('data_points', DataPointService)
    await getValues('external_data_sources', ExternalDataSourceService)
    await getValues('facility_attribute_values', FacilityAttributeValuesService)
    await getValues('facility_attributes', FacilityAttributesService)
    await getValues('facilities', FacilityService)
    await getValues('knx_events', KnxEventService)
    await getValues('schedules', ScheduleService)
    await getValues('values_from_knx', ValuesFromKnxService)
    await getValues('users', UserService)

    socket.emit('control_system_types_response', ControlSystemService.getTypes())
  }

  const cbLogin = async credentials => {
    try {
      const response = await ClientService.login(credentials, socket.id)
      socket.emit('login_response', response)
      socket.join(response.client.clientId)
      await sendDataToClient()
    }
    catch (err) {
      socket.emit('login_failed', err)
    }
  }

  const cbReLogin = async clientId => {
    try {
      const response = await ClientService.reLogin(socket.id, clientId)

      socket.emit('reLogin_response', response)
      socket.join(response.client.clientId)
      await sendDataToClient()
    }
    catch (err) {
      socket.emit('relogin_failed', err)
    }
  }

  const cbLogout = async clientId => await ClientService.logOut(clientId)

  socket
    .on('login', cbLogin)
    .on('reLogin', cbReLogin)
    .on('logout', cbLogout)
}
