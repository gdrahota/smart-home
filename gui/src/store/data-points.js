import { socket } from '../main'

const state = {
  loading: true,
  items: []
}

const addAction = (context, item) => {
  socket.emit('add_data_point', item)
}

const updateAction = (context, dataPoint) => {
  socket.emit('update_data_point', dataPoint)
}

const removeAction = (context, item) => {
  socket.emit('remove_data_point', item)
}

const actions = {
  addAction,
  updateAction,
  removeAction
}

const SOCKET_DATA_POINTS_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
}

const SOCKET_ADD_DATA_POINTS_RESPONSE = (state, response) => {
  state.items.push(response[0])
}
const SOCKET_UPDATE_DATA_POINTS_RESPONSE = (state, response) => {
  const mapFnc = item => {
    return (item._id === response[0]._id)
      ? response[0]
      : item
  }
  state.items = state.items.map(mapFnc)
  state.selected = response[0]
}
const SOCKET_REMOVE_DATA_POINTS_RESPONSE = (state, response) => {
  state.items.push(response[0])
}

const mutations = {
  setLoading: (state, status) => state.isLoading = status,
  SOCKET_DATA_POINTS_RESPONSE,
  SOCKET_ADD_DATA_POINTS_RESPONSE,
  SOCKET_UPDATE_DATA_POINTS_RESPONSE,
  SOCKET_REMOVE_DATA_POINTS_RESPONSE
}

const isAddressAlreadyUsed =
  state =>
    (controlSystemId, address) =>
      !!state.items.find(item => item.controlSystem === controlSystemId && item.address === address)

const getters = {
  isLoading: state => state.loading,
  get: state => state.items,
  getById: state => id => state.items.find(item => item._id === id),
  getByControlSystemId: state => id => state.items.filter(item => item.controlSystem === id),
  isAddressAlreadyUsed
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
