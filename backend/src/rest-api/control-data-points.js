import { ControlDataPointService } from '../services/control-data-points'

export const registerControlDataPointEndpoints = (io, socket) => {
  const cbUpsert = async control => {
    try {
      await ControlDataPointService.upsert(control)
    }
    catch (err) {
      socket.emit('upsert_control_data_points_failed', err)
    }
  }

  const cbRemove = async ({ control, endPoint }) => {
    try {
      await ControlDataPointService.removeControlDataPoint(control, endPoint)
    }
    catch (err) {
      socket.emit('remove_control_data_points_failed', err)
    }
  }

  socket
    .on('upsert_control_data_point', cbUpsert)
    .on('remove_control_data_point', cbRemove)
}
