import { socket } from '../main'

const state = {
  loggedIn: false,
  loginFailure: null,
  reLoginFailure: null,
  client: null,
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
  state.client = null
}

const SOCKET_RELOGIN_FAILED = (state, response) => {
  state.reLoginFailure = response[0]
  state.client = null
}

const processLogin = (state, response) => {
  state.client = response[0].client
  state.loggedIn = true
  state.loginFailure = null
  state.reloginFailure = null
  localStorage.setItem('clientId', response[0].client.clientId)
}

const SOCKET_LOGIN_RESPONSE = processLogin

const SOCKET_RELOGIN_RESPONSE = processLogin

const logoutMutation = state => {
  state.client = null
  state.loggedIn = false
  state.loginFailure = null
  state.reloginFailure = null
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
  getClient: state => state.client,
  getLoginFailure: state => state.loginFailure,
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
