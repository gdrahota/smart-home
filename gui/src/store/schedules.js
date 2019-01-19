import { socket } from '../main'

const state = {
  loading: true,
  items: [],
  timeTypes: [
    { value: 'sunrise', text: 'Sonnenaufgang' },
    { value: 'sunset', text: 'Sonnenuntergang' },
  ],
  selected: null
}

const addAction = (context, item) => {
  socket.emit('add_schedule', item)
}

const removeAction = (context, id) => {
  socket.emit('remove_schedule', id)
}

const updateAction = (context, item) => {
  socket.emit('update_schedule', item)
}

const actions = {
  addAction,
  updateAction,
  removeAction,
}

const SOCKET_SCHEDULES_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
}

const SOCKET_ADD_SCHEDULES_RESPONSE = (state, response) => {
  state.items.push(response[0])
}

const SOCKET_UPDATE_SCHEDULES_RESPONSE = (state, response) => {
  const mapFnc = item => {
    return (item._id === response[0]._id)
      ? response[0]
      : item
  }
  state.items = state.items.map(mapFnc)
}

const SOCKET_REMOVE_SCHEDULES_RESPONSE = (state, response) => {
  state.items = state.items.filter(f => f._id !== response[0])
}

const select = (state, item) => {
  state.selected = item
}

const mutations = {
  setLoading: (state, status) => state.isLoading = status,
  SOCKET_SCHEDULES_RESPONSE,
  SOCKET_ADD_SCHEDULES_RESPONSE,
  SOCKET_UPDATE_SCHEDULES_RESPONSE,
  SOCKET_REMOVE_SCHEDULES_RESPONSE,
  select
}

const getters = {
  isLoading: state => state.loading,
  get: state => state.items,
  getById: state => id => state.items.find(f => f._id === id),
  getSelected: state => state.selected,
  getTimeTypes: state => state.timeTypes,
  getTimeTypeAndOffset: state => value => state.timeTypes.find(i => i.value === value)
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
