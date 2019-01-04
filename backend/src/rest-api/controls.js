import { ControlService } from '../services/controls'

export const registerControlEndpoints = (io, socket) => {
  const cbAdd = async facility => {
    try {
      await ControlService.add(facility)
    }
    catch (err) {
      socket.emit('add_control_failed', err)
    }
  }

  const cbRemove = async id => {
    try {
      await ControlService.remove(id)
    }
    catch (err) {
      socket.emit('remove_control_failed', err)
    }
  }

  const cbUpdate = async control => {
    try {
      await ControlService.update(control)
    }
    catch (err) {
      socket.emit('update_control_failed', err)
    }
  }

  socket
    .on('add_control', cbAdd)
    .on('remove_control', cbRemove)
    .on('update_control', cbUpdate)
}
