import { socket } from '../main'

const state = {
  loggedIn: false,
  error: null,
  client: null,
  requestedRouteBeforeLogin: null
}

const loginAction = (context, credential) => {
  socket.emit('login', credential)
}

const reLoginAction = () => {
  const clientId = localStorage.getItem('clientId')
  if (clientId) {
    console.log('--- clientId', clientId)
    socket.emit('reLogin', clientId)
  }
}

const logoutAction = context => {
  socket.emit('logout', context.getters.getClientId)
  context.commit('logoutMutation')
}

const actions = {
  loginAction,
  reLoginAction,
  logoutAction
}

const setRequestedRouteBeforeLogin = (state, routeObj) => {
  state.requestedRouteBeforeLogin = routeObj
}

const SOCKET_LOGIN_FAILED = (state, err) => {
  state.error = err[0]
}

const SOCKET_LOGIN_RESPONSE = (state, response) => {
  state.client = response[0].client
  state.loggedIn = true
  localStorage.setItem('clientId', response[0].client.clientId)
}

const logoutMutation = state => {
  state.client = null
  state.loggedIn = false
  state.error = null
}

const mutations = {
  setRequestedRouteBeforeLogin,
  SOCKET_LOGIN_RESPONSE,
  SOCKET_LOGIN_FAILED,
  logoutMutation
}

const getClientId = state => {
  if (state.client) {
    return state.client.clientId
  }
}

const getters = {
  userIsLoggedIn: state => state.loggedIn,
  getError: state => state.error,
  getClientId
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
