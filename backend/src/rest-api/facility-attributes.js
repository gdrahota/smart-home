import { FacilityAttributesService } from '../services/facility-attributes'

export const registerFacilityAttributeEndpoints = (io, socket) => {
  const cbGet = () =>
    FacilityAttributesService.getAll((err, items) => {
      err
        ? socket.emit('get_all_facility_attributes_failed', err)
        : socket.emit('get_all_facility_attributes_response', items)
    })

  const cbAdd = item =>
    FacilityAttributesService.add(item, (err, savedItem) => {
      err
        ? socket.emit('add_facility_attribute_failed', err)
        : io.emit('add_facility_attribute_response', savedItem)
    })

  const cbRemove = id =>
    FacilityAttributesService.remove(id, (err, items) => {
      err
        ? socket.emit('remove_facility_attribute_failed', err)
        : io.emit('remove_facility_attribute_response', items)
    })

  const cbUpdate = facility =>
    FacilityAttributesService.update(facility, (err, savedFacility) => {
      err
        ? socket.emit('update_facility_attribute_failed', facility)
        : io.emit('update_facility_attribute_response', savedFacility)
    })

  socket
    .on('get_all_facility_attributes', cbGet)
    .on('add_facility_attribute', cbAdd)
    .on('remove_facility_attribute', cbRemove)
    .on('update_facility_attribute', cbUpdate)
}