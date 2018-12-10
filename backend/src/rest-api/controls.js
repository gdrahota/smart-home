import { ControlService } from '../services/controls'

export const registerControlEndpoints = (io, socket) => {
  const cbAdd = facility =>
    ControlService.add(facility, err => {
      if (err) {
        socket.emit('add_control_failed', err)
      }
    })

  const cbRemove = id =>
    ControlService.remove(id, err => {
      if (err) {
        socket.emit('remove_control_failed', err)
      }
    })

  const cbUpdate = control => {
    ControlService.update(control, err => {
      if (err) {
        socket.emit('update_control_failed', err)
      }
    })
  }

  socket
    .on('add_control', cbAdd)
    .on('remove_control', cbRemove)
    .on('update_control', cbUpdate)
}
