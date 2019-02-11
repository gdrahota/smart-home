import { socket } from '../main'

const state = {
  loading: true,
  items: [],
  states: [
    { value: 'active', text: 'freigeschaltet' },
    { value: 'disabled', text: 'gesperrt' },
  ],
}

const addAction = (context, item) => {
  socket.emit('add_user', item)
}

const updateAction = (context, item) => {
  socket.emit('update_user', item)
}

const actions = {
  addAction,
  updateAction,
}

const SOCKET_USERS_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
}

const SOCKET_ADD_USERS_RESPONSE = (state, response) => {
  state.items.push(response[0])
}

const SOCKET_UPDATE_USERS_RESPONSE = (state, response) => {
  const mapFnc = item => {
    return (item._id === response[0]._id)
      ? response[0]
      : item
  }
  state.items = state.items.map(mapFnc)
}

const mutations = {
  setLoading: (state, status) => state.isLoading = status,
  SOCKET_USERS_RESPONSE,
  SOCKET_ADD_USERS_RESPONSE,
  SOCKET_UPDATE_USERS_RESPONSE,
}

const getCurrentUser = (state, dummy1, dummy2, rootGetters) => {
  const client = rootGetters['client/getClient']

  if (!client) {
    return null
  }

  return state.items.find(user => user._id === client.userId)
}

const getters = {
  isLoading: state => state.loading,
  get: state => state.items,
  getById: state => id => state.items.find(f => f._id === id),
  getCurrentUser,
  getStates: state => state.states,
  getStateLabel: state => value => {
    const item = state.states.find(item => item.value === value)
    if (item) {
      return item.text
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
