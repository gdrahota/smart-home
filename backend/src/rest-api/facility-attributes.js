import { FacilityAttributesService } from '../services/facility-attributes'

export const registerFacilityAttributeEndpoints = (io, socket) => {
  const cbAdd = async item => {
    try {
      await FacilityAttributesService.add(item)
    }
    catch (err) {
      socket.emit('add_facility_attribute_failed', err)
    }
  }

  const cbRemove = async id => {
    try {
      await FacilityAttributesService.remove(id)
    }
    catch (err) {
      socket.emit('remove_facility_attribute_failed', err)
    }
  }

  const cbUpdate = async facility => {
    try {
      await FacilityAttributesService.update(facility)
    }
    catch (err) {
      socket.emit('update_facility_attribute_failed', facility)
    }
  }

  socket
    .on('add_facility_attribute', cbAdd)
    .on('remove_facility_attribute', cbRemove)
    .on('update_facility_attribute', cbUpdate)
}
