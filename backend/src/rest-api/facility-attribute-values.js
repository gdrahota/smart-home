import { FacilityAttributeValuesService } from '../services/facility-attribute-values'

export const registerFacilityAttributeValuesEndpoints = (io, socket) => {
  const cbAdd = async item => {
    try {
      await FacilityAttributeValuesService.add(item)
    }
    catch (err) {
      socket.emit('add_facility_attribute_value_failed', err)
    }
  }

  const cbRemove = async id => {
    try {
      await FacilityAttributeValuesService.remove(id)
    }
    catch (err) {
    }
  }

  const cbUpdate = async facility => {
    try {
      await FacilityAttributeValuesService.update(facility)
    }
    catch (err) {
      socket.emit('update_facility_attribute_value_failed', facility)
    }
  }

  socket
    .on('add_facility_attribute_value', cbAdd)
    .on('remove_facility_attribute_value', cbRemove)
    .on('update_facility_attribute_value', cbUpdate)
}
