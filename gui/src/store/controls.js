import { sortByName } from './../sorters'
import { socket } from '../main'

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
  socket.emit('add_control', item)
}

const updateAction = (context, item) => {
  socket.emit('update_control', item)
}

const removeAction = (context, itemId) => {
  socket.emit('remove_control', itemId)
}

const actions = {
  addAction,
  updateAction,
  removeAction
}

const selectControl = (state, controlId) => {
  state.selected = controlId
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
  state.selected = response[0]._id
}

const SOCKET_REMOVE_CONTROLS_RESPONSE = (state, response) => {
  state.items = state.items.filter(i => i._id !== response[0])
  state.selected = null
}

const mutations = {
  setLoading: (state, status) => state.isLoading = status,
  selectControl,
  SOCKET_CONTROLS_RESPONSE,
  SOCKET_ADD_CONTROLS_RESPONSE,
  SOCKET_UPDATE_CONTROLS_RESPONSE,
  SOCKET_REMOVE_CONTROLS_RESPONSE
}

const getActive =
  state =>
    state
      .items
      .filter(item => item.state === 'active')
      .sort(sortByName)

const getByControlSystemId =
  state =>
    id =>
      state
        .items
        .filter(item => item.controlSystem === id)
        .sort(sortByName)

const getByAttributeValue =
  state =>
    valueId =>
      state
        .items
        .filter(item => item.attributeValues.indexOf(valueId) !== -1)
        .sort(sortByName)

const getById =
  state =>
    id =>
      state
        .items
        .find(item => item._id === id)

const get =
  state =>
    state
      .items
      .sort(sortByName)

const getters = {
  isLoading: state => state.loading,
  get,
  getById,
  getActive,
  getByControlSystemId,
  getByAttributeValue,
  getSelected: state => {
    if (state.selected) {
      return state.items.find(control => control._id === state.selected)
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
