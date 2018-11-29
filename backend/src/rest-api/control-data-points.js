import { ControlDataPointService } from '../services/control-data-points'

export const registerControlDataPointEndpoints = (io, socket) => {
  const cbUpsert = control =>
    ControlDataPointService.upsert(control, err => {
      if (err) {
        socket.emit('upsert_control_data_point_failed', err)
      }
    })

  const cbRemove = id =>
    ControlDataPointService.remove(id, err => {
      if (err) {
        socket.emit('remove_control_data_point_failed', err)
      }
    })

  socket
    .on('upsert_control_data_point', cbUpsert)
    .on('remove_control_data_point', cbRemove)
}
