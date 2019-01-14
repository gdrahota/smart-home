import { socket } from '../main'

const state = {}

const sendCommandAction = (context, item) => {
  if (!item.commandType) {
    item.commandType = 'writeValue'
  }
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
