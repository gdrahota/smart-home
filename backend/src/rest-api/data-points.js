import { DataPointService } from '../services/data-points'

export const registerDataPointEndpoints = (io, socket) => {
  const cbAdd = facility =>
    DataPointService.add(facility, (err, item) => {
      err
        ? socket.emit('add_data_point_failed', err)
        : io.emit('add_data_point_response', item)
    })

  const cbRemove = id =>
    DataPointService.remove(id, (err, items) => {
      err
        ? socket.emit('remove_data_point_failed', err)
        : io.emit('remove_data_point_response', items)
    })

  const cbUpdate = control =>
    DataPointService.update(control, (err, savedItem) => {
      err
        ? socket.emit('update_data_point_failed', err)
        : io.emit('update_data_points_response', savedItem)
    })

  socket
    .on('add_data_point', cbAdd)
    .on('remove_data_point', cbRemove)
    .on('update_data_point', cbUpdate)
}
