import { FacilityService } from '../services/facilities'

export const registerFacilityEndpoints = (io, socket) => {
  const cbGet = () =>
    FacilityService.getAll((err, items) => {
      err
        ? socket.emit('get_all_facilities_failed', err)
        : socket.emit('get_all_facilities_response', items)
    })

  const cbAdd = facility =>
    FacilityService.add(facility, (err, item) => {
      err
        ? socket.emit('add_facility_failed', err)
        : io.emit('add_facility_response', item)
    })

  const cbRemove = id =>
    FacilityService.remove(id, (err, items) => {
      err
        ? socket.emit('remove_facility_failed', err)
        : io.emit('remove_facility_response', items)
    })

  const cbSetInactive = id =>
    FacilityService.setInactive(id, err => {
      err
        ? socket.emit('set_facility_inactive_failed', id)
        : io.emit('set_facility_inactive_response', id)
    })

  const cbUpdate = facility =>
    FacilityService.update(facility, (err, savedFacility) => {
      err
        ? socket.emit('update_facility_failed', facility)
        : io.emit('update_facility_response', savedFacility)
    })

  socket
    .on('get_all_facilities', cbGet)
    .on('add_facility', cbAdd)
    .on('remove_facility', cbRemove)
    .on('set_facility_inactive', cbSetInactive)
    .on('update_facility', cbUpdate)
}
