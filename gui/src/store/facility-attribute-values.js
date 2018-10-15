import { socketInstance } from '../main'

const state = {
  loading: true,
  items: []
}

const loadAction = context => {
  context.commit('setLoading', true)
  socketInstance.emit('get_all_facility_attribute_values')
}
const SOCKET_GET_ALL_FACILITY_ATTRIBUTE_VALUES_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
}

const addAction = (context, item) => {
  socketInstance.emit('add_facility_attribute_value', item)
}
const SOCKET_ADD_FACILITY_ATTRIBUTE_VALUE_RESPONSE = (state, response) => {
  state.items.push(response[0])
}

const updateAction = (context, attribute) => {
  socketInstance.emit('update_facility_attribute_value', attribute)
}
const SOCKET_UPDATE_FACILITY_ATTRIBUTE_VALUE_RESPONSE = (state, response) => {
  const mapFnc = item => {
    return (item._id === response[0]._id)
      ? response[0]
      : item
  }
  state.items = state.items.map(mapFnc)
}

const removeAction = (context, id) => {
  socketInstance.emit('remove_facility_attribute_value', id)
}
const SOCKET_REMOVE_FACILITY_ATTRIBUTE_VALUE_RESPONSE = (state, response) => {
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
  SOCKET_GET_ALL_FACILITY_ATTRIBUTE_VALUES_RESPONSE,
  SOCKET_ADD_FACILITY_ATTRIBUTE_VALUE_RESPONSE,
  SOCKET_UPDATE_FACILITY_ATTRIBUTE_VALUE_RESPONSE,
  SOCKET_REMOVE_FACILITY_ATTRIBUTE_VALUE_RESPONSE
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
