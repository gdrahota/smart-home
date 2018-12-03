import { socket } from '../main'

const state = {
  loading: true,
  items: []
}

const upsertAction = (context, item) => {
  socket.emit('upsert_command_queue', item)
}

const actions = {
  upsertAction
}

const SOCKET_COMMAND_QUEUE_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
}

const SOCKET_ADD_COMMAND_QUEUE_RESPONSE = (state, response) => {
  state.items = [...state.items, response[0]]
}

const SOCKET_UPDATE_COMMAND_QUEUE_RESPONSE = (state, response) => {
  const mapFnc = item => {
    if (item._id === response[0]._id) {
      return response[0]
    }
    return item
  }

  state.items = state.items.map(mapFnc)
}

const SOCKET_REMOVE_COMMAND_QUEUE_RESPONSE = (state, id) => {
  state.items = state.items.filter(item => item._id !== id[0])
}

const mutations = {
  setLoading: (state, status) => state.isLoading = status,
  SOCKET_COMMAND_QUEUE_RESPONSE,
  SOCKET_ADD_COMMAND_QUEUE_RESPONSE,
  SOCKET_UPDATE_COMMAND_QUEUE_RESPONSE,
  SOCKET_REMOVE_COMMAND_QUEUE_RESPONSE
}

const getters = {
  isLoading: state => state.loading,
  get: state => state.items
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
