import { FacilityService } from '../services/facilities'

export const registerFacilityEndpoints = (io, socket) => {
  const cbAdd = async facility => {
    try {
      await FacilityService.add(facility)
    }
    catch (err) {
      socket.emit('add_facility_failed', err)
    }
  }

  const cbRemove = async id => {
    try {
      await FacilityService.remove(id)
    }
    catch (err) {
      socket.emit('remove_facility_failed', err)
    }
  }

  const cbUpdate = async facility => {
    try {
      await FacilityService.update(facility)
    }
    catch (err) {
      socket.emit('update_facility_failed', facility)
    }
  }

  socket
    .on('add_facility', cbAdd)
    .on('remove_facility', cbRemove)
    .on('update_facility', cbUpdate)
}
