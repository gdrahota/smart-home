import { socketInstance } from '../main'

const state = {
  loggedIn: false,
  client: null
}

const loginAction = (context, credential) => {
  socketInstance.emit('login', credential)
}

const actions = {
  loginAction
}

export default {
  namespaced: true,
  state,
  actions
}
