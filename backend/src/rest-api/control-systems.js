import { ControlSystemService } from '../services/control-systems'

export const registerControlSystemEndpoints = (io, socket) => {
  const cbAdd = async facility => {
    try {
      await ControlSystemService.add(facility)
    }
    catch (err) {
      socket.emit('add_control_system_failed', err)
    }
  }

  const cbUpdate = async control => {
    try {
      await ControlSystemService.update(control)
    }
    catch (err) {
      socket.emit('update_control_system_failed', err)
    }
  }

  const cbGetTypes = async () => {
    try {
      ControlSystemService.getTypes((err, types) => socket.emit('get_control_system_types_response', types))
    }
    catch (err) {
      socket.emit('get_control_system_types_failed', err)
    }
  }

  socket
    .on('add_control_system', cbAdd)
    .on('update_control_system', cbUpdate)
    .on('get_control_system_types', cbGetTypes)
}
