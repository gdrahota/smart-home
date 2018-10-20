import { socketInstance } from '../main'

const state = {
  loading: true,
  items: [],
  selected: null
}

const loadAction = context => {
  context.commit('setLoading', true)
  socketInstance.emit('get_all_facilities')
}
const SOCKET_GET_ALL_FACILITIES_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
}

const addAction = (context, item) => {
  socketInstance.emit('add_facility', item)
}
const SOCKET_ADD_FACILITY_RESPONSE = (state, response) => {
  state.items.push(response[0])
}

const setInactiveAction = (context, id) => {
  socketInstance.emit('set_facility_inactive', id)
}
const SOCKET_SET_FACILITY_INACTIVE_RESPONSE = (state, response) => {
  const mapFnc = item => {
    return (item._id === response[0])
      ? { ...item, state: 'inactive' }
      : item
  }
  state.items = state.items.map(mapFnc)
  state.selected = null
}

const updateFacilityAction = (context, facility) => {
  socketInstance.emit('update_facility', facility)
}
const SOCKET_UPDATE_FACILITY_RESPONSE = (state, response) => {
  const mapFnc = item => {
    return (item._id === response[0]._id)
      ? response[0]
      : item
  }
  state.items = state.items.map(mapFnc)
  state.selected = response[0]
}

const selectMutation = (context, item) => {
  state.selected = item
}

const actions = {
  loadAction,
  addAction,
  setInactiveAction,
  updateFacilityAction
}

const mutations = {
  setLoading: (state, status) => state.isLoading = status,
  SOCKET_GET_ALL_FACILITIES_RESPONSE,
  SOCKET_ADD_FACILITY_RESPONSE,
  SOCKET_SET_FACILITY_INACTIVE_RESPONSE,
  SOCKET_UPDATE_FACILITY_RESPONSE,
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
