import { UserService } from '../services/users'

export const registerUserEndpoints = (io, socket) => {
  const cbAdd = async item => {
    try {
      await UserService.add(item)
    }
    catch (err) {
      socket.emit('add_user_failed', err)
    }
  }

  const cbUpdate = async facility => {
    try {
      await UserService.update(facility)
    }
    catch (err) {
      socket.emit('update_user_failed', facility)
    }
  }

  socket
    .on('add_user', cbAdd)
    .on('update_user', cbUpdate)
}
