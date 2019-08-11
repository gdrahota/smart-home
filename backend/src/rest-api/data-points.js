import { DataPointService } from '../services/data-points'

export const registerDataPointEndpoints = (io, socket) => {
  const cbAdd = async item => {
    try {
      await DataPointService.add(item)
    } catch (err) {
      socket.emit('add_data_point_failed', err)
    }
  }

  const cbRemove = async id => {
    try {
      await DataPointService.remove(id)
    } catch (err) {
      socket.emit('remove_data_point_failed', err)
    }
  }

  const cbUpdate = async control => {
    try {
      await DataPointService.update(control)
    } catch (err) {
      socket.emit('update_data_point_failed', err)
    }
  }

  socket
    .on('add_data_point', cbAdd)
    .on('remove_data_point', cbRemove)
    .on('update_data_point', cbUpdate)
}
