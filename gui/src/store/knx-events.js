import { socket } from '../main'

const state = {
  loading: true,
  items: []
}

const SOCKET_KNX_EVENTS_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
}

const addAction = (context, item) => {
  socket.emit('add_control', item)
}

const updateAction = (context, item) => {
  socket.emit('update_control', item)
}

const removeAction = (context, itemId) => {
  socket.emit('remove_control', itemId)
}

const actions = {
  addAction,
  updateAction,
  removeAction
}

const SOCKET_ADD_KNX_EVENTS_RESPONSE = (state, response) => {
  state.items.push(response[0])
}

const SOCKET_UPDATE_KNX_EVENTS_RESPONSE = (state, response) => {
  const mapFnc = item => {
    if (item._id === response[0]._id) {
      return response[0]
    }
    return item
  }
  state.items = state.items.map(mapFnc)
  state.selected = response[0]._id
}

const SOCKET_REMOVE_KNX_EVENTS_RESPONSE = (state, response) => {
  state.items = state.items.filter(i => i._id !== response[0])
  state.selected = null
}

const mutations = {
  SOCKET_KNX_EVENTS_RESPONSE,
  SOCKET_ADD_KNX_EVENTS_RESPONSE,
  SOCKET_UPDATE_KNX_EVENTS_RESPONSE,
  SOCKET_REMOVE_KNX_EVENTS_RESPONSE
}

const get = state => state.items
const isLoading = state => state.items.loading

const getters = {
  get,
  isLoading
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
