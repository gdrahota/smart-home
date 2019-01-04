import { socket } from '../main'

const state = {
  loading: true,
  items: [],
  selected: null
}

const addAction = (context, item) => {
  socket.emit('add_facility', item)
}

const removeAction = (context, id) => {
  socket.emit('remove_facility', id)
}

const updateFacilityAction = (context, facility) => {
  socket.emit('update_facility', facility)
}

const actions = {
  addAction,
  updateFacilityAction,
  removeAction,
}

const SOCKET_FACILITIES_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
}

const SOCKET_ADD_FACILITIES_RESPONSE = (state, response) => {
  state.items.push(response[0])
}

const SOCKET_UPDATE_FACILITIES_RESPONSE = (state, response) => {
  const mapFnc = item => {
    return (item._id === response[0]._id)
      ? response[0]
      : item
  }
  state.items = state.items.map(mapFnc)
  state.selected = response[0]
}
const SOCKET_REMOVE_FACILITIES_RESPONSE = (state, response) => {
  state.items = state.items.filter(f => f._id !== response[0])
}

const selectMutation = (context, item) => {
  state.selected = item
}

const mutations = {
  setLoading: (state, status) => state.isLoading = status,
  SOCKET_FACILITIES_RESPONSE,
  SOCKET_ADD_FACILITIES_RESPONSE,
  SOCKET_UPDATE_FACILITIES_RESPONSE,
  SOCKET_REMOVE_FACILITIES_RESPONSE,
  selectMutation
}

const getters = {
  isLoading: state => state.loading,
  get: state => state.items,
  getById: state => id => state.items.find(f => f._id === id),
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
