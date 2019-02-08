import { socket } from '../main'

const state = {
  loggedIn: false,
  loginFailure: null,
  reLoginFailure: null,
  client: null,
  requestedRouteBeforeLogin: null,
  socketState: 'disconnected'
}

const loginAction = (context, credential) => {
  socket.emit('login', credential)
}

const reLoginAction = () => {
  const clientId = localStorage.getItem('clientId')
  if (clientId) {
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
  state.loginFailure = err[0]
  state.reLoginFailed = false
}

const SOCKET_RELOGIN_FAILED = (state, response) => {
  state.reLoginFailure = response[0]
}

const processLogin = (state, response) => {
  if (response[0] && response[0].client) {
    state.client = response[0].client
    state.loggedIn = true
    localStorage.setItem('clientId', response[0].client.clientId)
  } else {
    state.client = null
    state.loggedIn = false
    state.reLoginFailed = true
    state.loginFailure = null
  }
}

const SOCKET_LOGIN_RESPONSE = processLogin

const SOCKET_RELOGIN_RESPONSE = processLogin

const logoutMutation = state => {
  state.client = null
  state.loggedIn = false
  state.error = null
}

const setSocketStateMutation = (state, socketState) => {
  state.socketState = socketState
}

const mutations = {
  setRequestedRouteBeforeLogin,
  SOCKET_LOGIN_RESPONSE,
  SOCKET_RELOGIN_RESPONSE,
  SOCKET_LOGIN_FAILED,
  SOCKET_RELOGIN_FAILED,
  logoutMutation,
  setSocketStateMutation,
}

const getClientId = state => {
  if (state.client) {
    return state.client.clientId
  }
}

const getters = {
  userIsLoggedIn: state => state.loggedIn,
  getLoginFailure: state => state.loginFailure,
  getReLoginFailed: state => state.reLoginFailed,
  getClientId,
  getSocketState: state => state.socketState,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
