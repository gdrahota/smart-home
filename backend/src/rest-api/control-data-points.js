import { ControlDataPointService } from '../services/control-data-points'

export const registerControlDataPointEndpoints = (io, socket) => {
  const cbGet = () =>
    ControlDataPointService.getAll((err, items) => {
      err
        ? socket.emit('get_all_control_data_points_failed', err)
        : socket.emit('get_all_control_data_points_response', items)
    })

  const cbUpsert = control =>
    ControlDataPointService.upsert(control, (err, item) => {
      err
        ? socket.emit('upsert_control_data_point_failed', err)
        : io.emit('upsert_control_data_point_response', item)
    })

  const cbRemove = id =>
    ControlDataPointService.remove(id, err => {
      err
        ? socket.emit('remove_control_data_point_failed', err)
        : io.emit('remove_control_data_point_response', id)
    })

  socket
    .on('get_all_control_data_points', cbGet)
    .on('upsert_control_data_point', cbUpsert)
    .on('remove_control_data_point', cbRemove)
}
