import { socketInstance } from '../main'

const state = {
  loading: true,
  items: []
}

const loadAction = context => {
  context.commit('setLoading', true)
  socketInstance.emit('get_all_control_data_points')
}
const SOCKET_GET_ALL_CONTROL_DATA_POINTS_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
}

const upsertAction = (context, item) => {
  socketInstance.emit('upsert_control_data_point', item)
}
const SOCKET_UPSERT_CONTROL_DATA_POINT_RESPONSE = (state, response) => {
  let isNew = true
  const mapFnc = item => {
    if (item._id === response[0]._id) {
      isNew = false
      return response[0]
    }
    return item
  }

  const items = state.items.map(mapFnc)
  if (isNew) {
    items.push(response[0])
  }
  state.items = items
  state.selected = response[0]
}

const removeAction = (context, item) => {
  socketInstance.emit('remove_control_data_point', item)
}
const SOCKET_REMOVE_CONTROL_DATA_POINT_RESPONSE = (state, response) => {
  state.items = state.items.filter(i => (i.control === response[0].control && i.endPoint === response[0].endPoint) === false)
}

const actions = {
  loadAction,
  upsertAction,
  removeAction
}

const mutations = {
  setLoading: (state, status) => state.isLoading = status,
  SOCKET_GET_ALL_CONTROL_DATA_POINTS_RESPONSE,
  SOCKET_UPSERT_CONTROL_DATA_POINT_RESPONSE,
  SOCKET_REMOVE_CONTROL_DATA_POINT_RESPONSE
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
