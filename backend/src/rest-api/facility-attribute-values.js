import { FacilityAttributeValuesService } from '../services/facility-attribute-values'

export const registerFacilityAttributeValuesEndpoints = (io, socket) => {
  const cbGet = () =>
    FacilityAttributeValuesService.getAll((err, items) => {
      err
        ? socket.emit('get_all_facility_attribute_values_failed', err)
        : socket.emit('get_all_facility_attribute_values_response', items)
    })

  const cbAdd = item =>
    FacilityAttributeValuesService.add(item, (err, savedItem) => {
      err
        ? socket.emit('add_facility_attribute_value_failed', err)
        : io.emit('add_facility_attribute_value_response', savedItem)
    })

  const cbRemove = id =>
    FacilityAttributeValuesService.remove(id, (err, items) => {
      err
        ? socket.emit('remove_facility_attribute_value_failed', err)
        : io.emit('remove_facility_attribute_value_response', items)
    })

  const cbUpdate = facility =>
    FacilityAttributeValuesService.update(facility, (err, savedFacility) => {
      err
        ? socket.emit('update_facility_attribute_value_failed', facility)
        : io.emit('update_facility_attribute_value_response', savedFacility)
    })

  socket
    .on('get_all_facility_attribute_values', cbGet)
    .on('add_facility_attribute_value', cbAdd)
    .on('remove_facility_attribute_value', cbRemove)
    .on('update_facility_attribute_value', cbUpdate)
}
