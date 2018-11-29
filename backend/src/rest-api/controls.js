import { ControlService } from '../services/controls'

export const registerControlEndpoints = (io, socket) => {
  const cbAdd = facility =>
    ControlService.add(facility, (err, item) => {
      err
        ? socket.emit('add_control_failed', err)
        : io.emit('add_control_response', item)
    })

  const cbRemove = id =>
    ControlService.remove(id, (err, items) => {
      err
        ? socket.emit('remove_control_failed', err)
        : io.emit('remove_control_response', items)
    })

  const cbUpdate = control =>
    ControlService.update(control, (err, savedItem) => {
      err
        ? socket.emit('update_control_failed', err)
        : io.emit('update_control_response', savedItem)
    })

  socket
    .on('add_control', cbAdd)
    .on('remove_control', cbRemove)
    .on('update_control', cbUpdate)
}
