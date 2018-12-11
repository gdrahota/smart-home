import { socket } from '../main'

const state = {
}

const sendCommandAction = (context, item) => {
  socket.emit('send_command', item)
}

const actions = {
  sendCommandAction
}

export default {
  namespaced: true,
  state,
  actions
}
