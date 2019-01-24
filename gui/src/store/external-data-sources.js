import { socket } from '../main'

const state = {
  loading: true,
  items: [],
  selected: null
}

const SOCKET_EXTERNAL_DATA_SOURCES_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
}

const addAction = (context, item) => {
  socket.emit('add_external_data_source', item)
}

const updateAction = (context, item) => {
  console.log('saving....', item)
  socket.emit('update_external_data_source', item)
}

const removeAction = (context, item) => {
  socket.emit('remove_external_data_source', item)
}

const SOCKET_ADD_EXTERNAL_DATA_SOURCES_RESPONSE = (state, response) => {
  state.items = [...state.items, response[0]]
  state.selected = response[0]
}

const SOCKET_UPDATE_EXTERNAL_DATA_SOURCES_RESPONSE = (state, response) => {
  const mapFnc = item => {
    return (item._id === response[0]._id)
      ? response[0]
      : item
  }
  state.items = state.items.map(mapFnc)
  state.selected = response[0]
}

const SOCKET_REMOVE_EXTERNAL_DATA_SOURCES_RESPONSE = (state, response) => {
  state.items = state.items.filter(i => i._id !== response[0])
}

const selectMutation = (context, item) => {
  state.selected = item
}

const actions = {
  addAction,
  updateAction,
  removeAction
}

const mutations = {
  setLoading: (state, status) => state.isLoading = status,
  SOCKET_EXTERNAL_DATA_SOURCES_RESPONSE,
  SOCKET_ADD_EXTERNAL_DATA_SOURCES_RESPONSE,
  SOCKET_UPDATE_EXTERNAL_DATA_SOURCES_RESPONSE,
  SOCKET_REMOVE_EXTERNAL_DATA_SOURCES_RESPONSE,
  selectMutation
}

const getters = {
  isLoading: state => state.loading,
  get: state => state.items,
  getById: state => id => state.items.find(item => item._id === id),
  getByType: state => type => state.items.filter(item => item.type === type),
  selected: state => state.selected,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
