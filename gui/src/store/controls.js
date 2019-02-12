import { sortByControlTypeAndByName } from './../sorters'
import { socket } from '../main'

const state = {
  loading: true,
  items: [],
  selected: null,
  latestUpdate: null,
}

/* Actions */
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

/* Mutations */
const SOCKET_CONTROLS_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
  state.latestUpdate = new Date()
}

const SOCKET_ADD_CONTROLS_RESPONSE = (state, response) => {
  state.items.push(response[0])
  state.selected = response[0]._id
  state.latestUpdate = new Date()
}

const SOCKET_UPDATE_CONTROLS_RESPONSE = (state, response) => {
  const mapFnc = item => {
    if (item._id === response[0]._id) {
      return response[0]
    }
    return item
  }
  state.items = state.items.map(mapFnc)
  state.latestUpdate = new Date()
}

const SOCKET_REMOVE_CONTROLS_RESPONSE = (state, response) => {
  state.items = state.items.filter(i => i._id !== response[0])
  state.selected = null
  state.latestUpdate = new Date()
}

const selectControl = (state, item) => {
  state.selected = item
}

const mutations = {
  setLoading: (state, status) => state.isLoading = status,
  selectControl,
  SOCKET_CONTROLS_RESPONSE,
  SOCKET_ADD_CONTROLS_RESPONSE,
  SOCKET_UPDATE_CONTROLS_RESPONSE,
  SOCKET_REMOVE_CONTROLS_RESPONSE
}

/* Getters */
const getActive = state =>
  state
    .items
    .filter(item => item.state === 'active')
    .sort(sortByControlTypeAndByName)

const getByAttributeValue = state => valueId =>
  state
    .items
    .filter(item => item.attributeValues.indexOf(valueId) !== -1)
    .sort(sortByControlTypeAndByName)

const getById = state => id => state.items.find(item => item._id === id)

const getByControlType = state => controlType => state.items.filter(item => item.controlType === controlType)

const get = state => state.items.sort(sortByControlTypeAndByName)

const getSelectedControl = state => {
  if (state.selected) {
    return getById(state)(state.selected)
  }
  return null
}

const getters = {
  isLoading: state => state.loading,
  get,
  getById,
  getActive,
  getByControlType,
  getByAttributeValue,
  getSelectedControlId: state => state.selected,
  getSelectedControl,
  getLatestUpdateDate: state => state.latestUpdate,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
