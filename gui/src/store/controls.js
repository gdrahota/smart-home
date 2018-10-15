import { socketInstance } from '../main'

const state = {
  loading: true,
  items: [],
  selected: null
}

const loadAction = context => {
  context.commit('setLoading', true)
  socketInstance.emit('get_all_controls')
}
const SOCKET_GET_ALL_CONTROLS_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
}

const addAction = (context, item) => {
  socketInstance.emit('add_control', item)
}
const SOCKET_ADD_CONTROL_RESPONSE = (state, response) => {
  state.items.push(response[0])
  state.selected = response[0]
}

const updateAction = (context, item) => {
  socketInstance.emit('update_control', item)
}
const SOCKET_UPDATE_CONTROL_RESPONSE = (state, response) => {
  const mapFnc = item => {
    return (item._id === response[0]._id)
      ? response[0]
      : item
  }
  state.items = state.items.map(mapFnc)
  state.selected = response[0]
}

const removeAction = (context, itemId) => {
  socketInstance.emit('remove_control', itemId)
}
const SOCKET_REMOVE_CONTROL_RESPONSE = (state, response) => {
  state.items = state.items.filter(i => i._id !== response[0])
  state.selected = null
}

const selectMutation = (context, item) => {
  state.selected = item
}

const actions = {
  loadAction,
  addAction,
  updateAction,
  removeAction
}

const mutations = {
  setLoading: (state, status) => state.isLoading = status,
  SOCKET_GET_ALL_CONTROLS_RESPONSE,
  SOCKET_ADD_CONTROL_RESPONSE,
  SOCKET_UPDATE_CONTROL_RESPONSE,
  SOCKET_REMOVE_CONTROL_RESPONSE,
  selectMutation
}

const getters = {
  isLoading: state => state.loading,
  get: state => state.items,
  getActive: state => state.items.filter(item => item.state === 'active'),
  selected: state => state.selected
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
