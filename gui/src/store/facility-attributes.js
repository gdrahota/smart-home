import { socketInstance } from '../main'

const state = {
  loading: true,
  items: []
}

const loadAction = context => {
  context.commit('setLoading', true)
  socketInstance.emit('get_all_facility_attributes')
}
const SOCKET_GET_ALL_FACILITY_ATTRIBUTES_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
}

const addAction = (context, item) => {
  socketInstance.emit('add_facility_attribute', item)
}
const SOCKET_ADD_FACILITY_ATTRIBUTE_RESPONSE = (state, response) => {
  state.items.push(response[0])
}

const updateAction = (context, attribute) => {
  socketInstance.emit('update_facility_attribute', attribute)
}
const SOCKET_UPDATE_FACILITY_ATTRIBUTE_RESPONSE = (state, response) => {
  const mapFnc = item => {
    return (item._id === response[0]._id)
      ? response[0]
      : item
  }
  state.items = state.items.map(mapFnc)
  state.selected = response[0]
}

const removeAction = (context, id) => {
  socketInstance.emit('remove_facility_attribute', id)
}
const SOCKET_REMOVE_FACILITY_ATTRIBUTE_RESPONSE = (state, response) => {
  state.items = state.items.filter(i => i._id !== response[0])
}

const actions = {
  loadAction,
  addAction,
  updateAction,
  removeAction
}

const mutations = {
  setLoading: (state, status) => state.isLoading = status,
  SOCKET_GET_ALL_FACILITY_ATTRIBUTES_RESPONSE,
  SOCKET_ADD_FACILITY_ATTRIBUTE_RESPONSE,
  SOCKET_UPDATE_FACILITY_ATTRIBUTE_RESPONSE,
  SOCKET_REMOVE_FACILITY_ATTRIBUTE_RESPONSE
}

const getters = {
  isLoading: state => state.loading,
  get: state => state.items,
  getByFacilityId: state => id => state.items.filter(i => i.facilityId === id),
  getByFacilityAttributeId: state => id => state.items.filter(i => i.facilityAttributeId === id)
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
