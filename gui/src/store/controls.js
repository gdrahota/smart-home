import { sortByControlTypeAndByName } from './../sorters'
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
        {
          endPoint: 'shutter-position-set',
          label: 'Fahre an Position',
          dpt: '5.001',
          dataType: '5.001',
          controlType: 'slider',
          min: 0,
          max: 100,
          step: 10,
          defaultValue: 0,
          unit: '%'
        },
        {
          endPoint: 'shutter-position-response',
          label: 'Bestätigung',
          dpt: '5.001',
          dataType: '5.001',
          controlType: 'slider',
          min: 0,
          max: 100,
          step: 10,
          defaultValue: 0,
          unit: '%'
        },
        {
          endPoint: 'window-state-response',
          label: 'Fersterkontakt',
          dpt: '1.009',
          controlType: 'switch',
          min: false,
          max: true,
          trueLabel: 'Ab',
          falseLabel: 'Auf',
          defaultValue: false,
        }
      ]
    },
    {
      name: 'lightSwitch',
      label: 'Lichtschalter',
      icon: 'fa-lightbulb-o',
      endPoints: [
        {
          endPoint: 'switch',
          label: 'Schaltbefehl',
          dpt: '1.001',
          controlType: 'switch',
          min: false,
          max: true,
          trueLabel: 'An',
          falseLabel: 'Aus',
          defaultValue: false,
        },
        {
          endPoint: 'response',
          label: 'Bestätigung',
          dpt: '1.001',
          controlType: 'readOnly',
        },
      ]
    },
    {
      name: 'lightDimmer',
      label: 'Lichtdimmer',
      icon: 'fa-lightbulb-o',
      endPoints: [
        {
          endPoint: 'switch',
          label: 'Schaltbefehl',
          dpt: '1.001',
          controlType: 'switch',
          min: false,
          max: true,
          trueLabel: 'An',
          falseLabel: 'Aus',
          defaultValue: false,
        },
        {
          endPoint: 'dim',
          label: 'Dimmen',
          dpt: '5.001',
          controlType: 'slider',
          min: 0,
          max: 100,
          step: 10,
          defaultValue: 0,
          unit: '%'
        },
        {
          endPoint: 'dim-response',
          label: 'Rückmeldung',
          dpt: '5.001',
          controlType: 'readOnly',
        },
      ]
    },
    {
      name: 'rtc',
      label: 'Heizungssteuerung',
      icon: 'fa-thermometer-half',
      endPoints: [
        {
          endPoint: 'temp-current-value',
          label: 'Ist-Temperatur',
          dtp: '9.001',
          controlType: 'readOnly',
        },
        {
          endPoint: 'temp-target-value',
          label: 'Soll-Temperatur',
          dtp: '9.001',
          controlType: 'slider',
          min: 10,
          max: 23,
          step: 0.5,
          defaultValue: 20,
          unit: '°C'
        },
        {
          endPoint: 'switch-response',
          label: 'Bestätigung (Ein/Aus)',
          dtp: '1.009',
          controlType: 'readOnly',
        },
        {
          endPoint: 'pusher-response',
          label: 'Bestätigung (0..100 %)',
          dtp: '5.001',
          controlType: 'readOnly',
        },
      ]
    },
    {
      name: '14CharTextDisplay',
      label: '14 Zeichen-Anzeige',
      icon: 'fa-text-width',
      endPoints: [
        {
          endPoint: 'set-text',
          label: 'Text senden',
          dtp: '16.000',
          controlType: 'text-field',
        },
      ]
    },
    {
      name: 'dayNightSwitch',
      label: 'Tag-/Nachtumschaltung',
      icon: 'fa-toggle-on',
      endPoints: [
        {
          endPoint: 'set-day',
          label: 'Jetzt ist Tag',
          dtp: '1.001',
          controlType: 'switch',
          min: false,
          max: true,
        },
        {
          endPoint: 'set-night',
          label: 'Jetzt ist Nacht',
          dtp: '1.001',
          controlType: 'switch',
          min: false,
          max: true,
        },
      ]
    },
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

const selectControl = (state, item) => {
  state.selected = item
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

const getDefinitions = state => state.definitions
const getDefinitionByName = state => name => state.definitions.find(d => d.name === name)

const getters = {
  isLoading: state => state.loading,
  get,
  getById,
  getActive,
  getByControlType,
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
