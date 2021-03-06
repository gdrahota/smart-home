import { socket } from '../main'

const state = {
  loading: true,
  items: [],
  types: [],
  selected: null
}

const SOCKET_CONTROL_SYSTEMS_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
}

const SOCKET_CONTROL_SYSTEM_TYPES_RESPONSE = (state, response) => {
  state.types = response[0]
}

const addAction = (context, item) => {
  socket.emit('add_control_system', item)
}

const updateAction = (context, item) => {
  socket.emit('update_control_system', item)
}

const removeAction = (context, id) => {
  socket.emit('remove_control_system', id)
}

const SOCKET_ADD_CONTROL_SYSTEMS_RESPONSE = (state, response) => {
  state.items = [...state.items, response[0]]
  state.selected = response[0]
}

const SOCKET_UPDATE_CONTROL_SYSTEMS_RESPONSE = (state, response) => {
  const mapFnc = item => {
    return (item._id === response[0]._id)
      ? response[0]
      : item
  }
  state.items = state.items.map(mapFnc)
  state.selected = response[0]
}

const SOCKET_REMOVE_CONTROL_SYSTEMS_RESPONSE = (state, response) => {
  state.items = state.items.filter(item => item._id !== response[0])
}

const selectMutation = (context, item) => {
  state.selected = item
}

const actions = {
  addAction,
  updateAction,
  removeAction,
}

const mutations = {
  setLoading: (state, status) => state.isLoading = status,
  SOCKET_CONTROL_SYSTEMS_RESPONSE,
  SOCKET_ADD_CONTROL_SYSTEMS_RESPONSE,
  SOCKET_UPDATE_CONTROL_SYSTEMS_RESPONSE,
  SOCKET_REMOVE_CONTROL_SYSTEMS_RESPONSE,
  SOCKET_CONTROL_SYSTEM_TYPES_RESPONSE,
  selectMutation,
}

const getters = {
  isLoading: state => state.loading,
  get: state => state.items,
  getById: state => id => state.items.find(item => item._id === id),
  getActive: state => state.items.filter(item => item.state === 'active'),
  selected: state => state.selected,
  getTypes: state => state.types,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
