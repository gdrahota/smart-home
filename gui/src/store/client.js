import { socket } from '../main'

const state = {
  loggedIn: false,
  loginFailure: null,
  reLoginFailure: null,
  client: null,
  user: null,
  requestedRouteBeforeLogin: null,
  socketState: 'disconnected'
}

/* Actions */
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

/* Mutations */
const setRequestedRouteBeforeLogin = (state, routeObj) => {
  state.requestedRouteBeforeLogin = routeObj
}

const SOCKET_LOGIN_FAILED = (state, response) => {
  state.loginFailure = response[0]
  state.user = null
  state.client = null
}

const SOCKET_RELOGIN_FAILED = (state, response) => {
  state.reLoginFailure = response[0]
  state.user = null
  state.client = null
}

const processLogin = (state, response) => {
  state.client = response[0].client
  state.user = response[0].user
  state.loggedIn = true
  localStorage.setItem('clientId', response[0].client.clientId)
}

const SOCKET_LOGIN_RESPONSE = processLogin

const SOCKET_RELOGIN_RESPONSE = processLogin

const logoutMutation = state => {
  state.client = null
  state.user = null
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

/* Getters */
const getClientId = state => {
  if (state.client) {
    return state.client.clientId
  }
}

const getters = {
  userIsLoggedIn: state => state.loggedIn,
  getLoginFailure: state => state.loginFailure,
  getReLoginFailre: state => state.reLoginFailure,
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
