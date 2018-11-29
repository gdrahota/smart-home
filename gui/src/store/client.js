import { socket } from '../main'

const state = {
  loggedIn: false,
  error: null,
  client: null,
  requestedRouteBeforeLogin: null
}

const loginAction = (context, credential) => {
  console.log('loginAction', credential)
  socket.emit('login', credential)
}

const actions = {
  loginAction
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
}

const mutations = {
  setRequestedRouteBeforeLogin,
  SOCKET_LOGIN_RESPONSE,
  SOCKET_LOGIN_FAILED
}

const getters = {
  userIsLoggedIn: state => state.loggedIn,
  getError: state => state.error,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
