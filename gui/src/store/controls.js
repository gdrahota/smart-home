import { socketInstance } from '../main'

const state = {
  loading: true,
  items: [],
  selected: null
}

const SOCKET_CONTROLS_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
}

const addAction = (context, item) => {
  socketInstance.emit('add_control', item)
}

const updateAction = (context, item) => {
  socketInstance.emit('update_control', item)
}

const removeAction = (context, itemId) => {
  socketInstance.emit('remove_control', itemId)
}

const actions = {
  addAction,
  updateAction,
  removeAction
}

const SOCKET_ADD_CONTROLS_RESPONSE = (state, response) => {
  state.items.push(response[0])
  state.selected = response[0]
}

const SOCKET_UPDATE_CONTROLS_RESPONSE = (state, response) => {
  const mapFnc = item => {
    return (item._id === response[0]._id)
      ? response[0]
      : item
  }
  state.items = state.items.map(mapFnc)
  state.selected = response[0]
}

const SOCKET_REMOVE_CONTROLS_RESPONSE = (state, response) => {
  state.items = state.items.filter(i => i._id !== response[0])
  state.selected = null
}

const selectMutation = (context, item) => {
  state.selected = item
}

const mutations = {
  setLoading: (state, status) => state.isLoading = status,
  SOCKET_CONTROLS_RESPONSE,
  SOCKET_ADD_CONTROLS_RESPONSE,
  SOCKET_UPDATE_CONTROLS_RESPONSE,
  SOCKET_REMOVE_CONTROLS_RESPONSE,
  selectMutation
}

const getters = {
  isLoading: state => state.loading,
  get: state => state.items,
  getById: state => id => state.items.find(item => item._id === id),
  getActive: state => state.items.filter(item => item.state === 'active'),
  getByControlSystemId: state => id => state.items.filter(item => item.controlSystem === id),
  selected: state => state.selected
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
