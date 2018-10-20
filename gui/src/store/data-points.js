import { socketInstance } from '../main'

const state = {
  loading: true,
  items: []
}

const loadAction = context => {
  context.commit('setLoading', true)
  socketInstance.emit('get_all_data_points')
}
const SOCKET_GET_ALL_DATA_POINTS_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
}

const addAction = (context, item) => {
  socketInstance.emit('add_data_point', item)
}
const SOCKET_ADD_DATA_POINT_RESPONSE = (state, response) => {
  state.items.push(response[0])
}

const updateAction = (context, dataPoint) => {
  socketInstance.emit('update_data_point', dataPoint)
}
const SOCKET_UPDATE_DATA_POINT_RESPONSE = (state, response) => {
  const mapFnc = item => {
    return (item._id === response[0]._id)
      ? response[0]
      : item
  }
  state.items = state.items.map(mapFnc)
  state.selected = response[0]
}

const removeAction = (context, item) => {
  socketInstance.emit('remove_data_point', item)
}
const SOCKET_REMOVE_DATA_POINT_RESPONSE = (state, response) => {
  state.items.push(response[0])
}

const actions = {
  loadAction,
  addAction,
  updateAction,
  removeAction
}

const mutations = {
  setLoading: (state, status) => state.isLoading = status,
  SOCKET_GET_ALL_DATA_POINTS_RESPONSE,
  SOCKET_ADD_DATA_POINT_RESPONSE,
  SOCKET_UPDATE_DATA_POINT_RESPONSE,
  SOCKET_REMOVE_DATA_POINT_RESPONSE
}

const isAddressAlreadyUsed =
  state =>
    (controlSystemId, address) =>
      !!state.items.find(item => item.controlSystem === controlSystemId && item.address === address)

const getters = {
  isLoading: state => state.loading,
  get: state => state.items,
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
