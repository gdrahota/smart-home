import { socket } from '../main'

const state = {
  loading: true,
  items: []
}

const upsertAction = (context, item) => {
  socket.emit('upsert_control_data_point', item)
}

const removeAction = (context, item) => {
  socket.emit('remove_control_data_point', item)
}

const actions = {
  upsertAction,
  removeAction
}

const SOCKET_CONTROL_DATA_POINTS_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
}

const SOCKET_UPDATE_CONTROL_DATA_POINTS_RESPONSE = (state, response) => {
  const mapFnc = item => {
    if (item._id === response[0]._id) {
      return response[0]
    }
    return item
  }

  state.items = state.items.map(mapFnc)
  state.selected = response[0]
}

const SOCKET_ADD_CONTROL_DATA_POINTS_RESPONSE = (state, response) => {
  state.items = [...state.items, response[0]]
  state.selected = response[0]
}

const SOCKET_REMOVE_CONTROL_DATA_POINTS_RESPONSE = (state, response) => {
  state.items = state.items.filter(i => (i.control === response[0].control && i.endPoint === response[0].endPoint) === false)
}

const mutations = {
  setLoading: (state, status) => state.isLoading = status,
  SOCKET_CONTROL_DATA_POINTS_RESPONSE,
  SOCKET_ADD_CONTROL_DATA_POINTS_RESPONSE,
  SOCKET_UPDATE_CONTROL_DATA_POINTS_RESPONSE,
  SOCKET_REMOVE_CONTROL_DATA_POINTS_RESPONSE
}

const getByControlAndEndPoint = state => (controlId, endPoint) => state.items.find(i => i.control === controlId && i.endPoint === endPoint)

const getters = {
  isLoading: state => state.loading,
  get: state => state.items,
  getUsage: state => dataPointId => state.items.filter(item => item.dataPoint === dataPointId),
  getByControlAndEndPoint
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
