import { ControlSystemService } from '../services/control-systems'

export const registerControlSystemEndpoints = (io, socket) => {
  const cbAdd = facility =>
    ControlSystemService.add(facility, err => {
      if (err) {
        socket.emit('add_control_system_failed', err)
      }
    })

  const cbUpdate = control =>
    ControlSystemService.update(control, (err, savedItem) => {
      if (err) {
        socket.emit('update_control_system_failed', err)
      }
    })

  const cbGetTypes = () =>
    ControlSystemService.getTypes((err, types) => socket.emit('get_control_system_types_response', types))

  socket
    .on('add_control_system', cbAdd)
    .on('update_control_system', cbUpdate)
    .on('get_control_system_types', cbGetTypes)
}
