import { DataPointService } from '../services/data-points'

export const registerDataPointEndpoints = (io, socket) => {
  const cbAdd = facility =>
    DataPointService.add(facility, (err, item) => {
      if (err) {
        socket.emit('add_data_point_failed', err)
      }
    })

  const cbRemove = id =>
    DataPointService.remove(id, (err, items) => {
      if (err) {
        socket.emit('remove_data_point_failed', err)
      }
    })

  const cbUpdate = control =>
    DataPointService.update(control, (err, savedItem) => {
      if (err) {
        socket.emit('update_data_point_failed', err)
      }
    })

  socket
    .on('add_data_point', cbAdd)
    .on('remove_data_point', cbRemove)
    .on('update_data_point', cbUpdate)
}
