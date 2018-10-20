import { ControlSystemService } from '../services/control-systems'

export const registerControlSystemEndpoints = (io, socket) => {
  const cbGet = () =>
    ControlSystemService.getAll((err, items) => {
      err
        ? socket.emit('get_all_control_systems_failed', err)
        : socket.emit('get_all_control_systems_response', items)
    })

  const cbAdd = facility =>
    ControlSystemService.add(facility, (err, item) => {
      err
        ? socket.emit('add_control_system_failed', err)
        : io.emit('add_control_system_response', item)
    })

  const cbUpdate = control =>
    ControlSystemService.update(control, (err, savedItem) => {
      err
        ? socket.emit('update_control_system_failed', err)
        : io.emit('update_control_system_response', savedItem)
    })

  const cbGetTypes = () =>
    ControlSystemService.getTypes((err, types) => socket.emit('get_control_system_types_response', types))

  socket
    .on('get_all_control_systems', cbGet)
    .on('add_control_system', cbAdd)
    .on('update_control_system', cbUpdate)
    .on('get_control_system_types', cbGetTypes)
}
