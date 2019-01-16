import { sortByName } from './../sorters'
import { socket } from '../main'

const state = {
  loading: true,
  items: [],
  selected: null,
  definitions: [
    {
      name: 'shutter',
      label: 'Rollladen',
      icon: 'fa-bars',
      endPoints: [
        { endPoint: 'shutter-position-set', label: 'Fahrbefehl', dpt: '5.001', dataType: '5.001' },
        { endPoint: 'shutter-position-response', label: 'Bestätigung', dpt: '5.001', dataType: '5.001' },
        { endPoint: 'window-state-response', label: 'Fersterkontakt', dpt: '1.009' }
      ]
    },
    {
      name: 'lightSwitch',
      label: 'Lichtschalter',
      icon: 'fa-lightbulb-o',
      endPoints: [
        { endPoint: 'switch', label: 'Schaltbefehl', dpt: '1.001' },
        { endPoint: 'response', label: 'Bestätigung', dpt: '1.001' },
      ]
    },
    {
      name: 'lightDimmer',
      label: 'Lichtdimmer',
      icon: 'fa-lightbulb-o',
      endPoints: [
        { endPoint: 'switch', label: 'Schaltbefehl', dpt: '1.001' },
        { endPoint: 'dim', label: 'Dimmen', dpt: '5.001' },
        { endPoint: 'dim-response', label: 'Rückmeldung', dpt: '5.001' },
      ]
    },
    {
      name: 'rtc',
      label: 'Heizungssteuerung',
      icon: 'fa-thermometer-half',
      endPoints: [
        { endPoint: 'temp-current-value', label: 'Ist-Temperatur', dtp: '9.001' },
        { endPoint: 'temp-target-value', label: 'Soll-Temperatur', dtp: '9.001' },
        { endPoint: 'switch-response', label: 'Bestätigung (Ein/Aus)', dtp: '1.009' },
        { endPoint: 'pusher-response', label: 'Bestätigung (0..100 %)', dtp: '5.001' },
      ]
    }
  ],
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
  state.selected = response[0]._id
}

const SOCKET_UPDATE_CONTROLS_RESPONSE = (state, response) => {
  const mapFnc = item => {
    if (item._id === response[0]._id) {
      return response[0]
    }
    return item
  }
  state.items = state.items.map(mapFnc)
  //state.selected = response[0]._id
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

const getActive = state =>
  state
    .items
    .filter(item => item.state === 'active')
    .sort(sortByName)

const getByControlSystemId = state => id =>
  state
    .items
    .filter(item => item.controlSystem === id)
    .sort(sortByName)

const getByAttributeValue = state => valueId =>
  state
    .items
    .filter(item => item.attributeValues.indexOf(valueId) !== -1)
    .sort(sortByName)

const getById = state => id => state.items.find(item => item._id === id)

const get = state => state.items.sort(sortByName)

const getSelectedControl = state => {
  if (state.selected) {
    return getById(state)(state.selected)
  }
  return null
}

const getDefinitions = state => state.definitions
const getDefinitionByName = state => name => state.definitions.find(d => d.name === name)

const getters = {
  isLoading: state => state.loading,
  get,
  getById,
  getActive,
  getByControlSystemId,
  getByAttributeValue,
  getSelectedControlId: state => state.selected,
  getSelectedControl,
  getDefinitions,
  getDefinitionByName,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
