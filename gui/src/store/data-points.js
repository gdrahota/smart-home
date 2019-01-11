import { socket } from '../main'
import { sortByAddress } from '../sorters'

const state = {
  loading: true,
  items: [],
  dataPointTypes: [
    { value: '1.001', label: '1.001: Ein / Aus' },
    { value: '1.002', label: '1.002: Wahr / Falsch' },
    { value: '1.003', label: '1.003: Entsperrt / Gesperrt' },
    { value: '1.009', label: '1.009: Öffnen/Schließen' },
    { value: '5.001', label: '5.001: 0...100 %' },
    { value: '5.003', label: '5.003: 0...360 °' },
    { value: '5.004', label: '5.004: 0...255' },
    { value: '6.001', label: '6.001: -128...127 %' },
    { value: '6.010', label: '6.010: -128...127' },
    { value: '7.001', label: '7.001: 0...65535' },
    { value: '7.002', label: '7.002: 0...65535 ms' },
    { value: '7.003', label: '7.003: 0...655,35 s' },
    { value: '7.004', label: '7.004: 0...6553,5 s' },
    { value: '7.005', label: '7.005: 0...65535 s' },
    { value: '7.006', label: '7.006: 0....65535 min' },
    { value: '7.007', label: '7.007: 0...65535 h' },
    { value: '7.011', label: '7.011: 0...65535 mm' },
    { value: '7.012', label: '7.012: 0...65535 mA' },
    { value: '7.013', label: '7.013: 0...65535 lux' },
    { value: '8.001', label: '8.001: -32768...32767' },
    { value: '8.002', label: '8.002: -32768...32767 ms' },
    { value: '8.010', label: '8.010: -327,68...327,67 %' },
    { value: '9.001', label: '9.001: -273...670760 °C' },
    { value: '9.002', label: '9.002: -670760...670760 K' },
    { value: '9.003', label: '9.003: -670760...670760 K/h' },
    { value: '9.004', label: '9.004: 0...670760 Lux' },
    { value: '9.005', label: '9.005: 0...670760 m/s' },
    { value: '9.006', label: '9.006: 0...670760 Pa' },
    { value: '9.020', label: '9.020: -670760...670760 mV' },
    { value: '9.021', label: '9.021: -670760...670760 mA' },
    { value: '9.024', label: '9.024: -670760...670760 kW' },
    { value: '9.028', label: '9.028: 0...670760,96 km/h' },
    { value: '10.001', label: '10.001: 1: Montag, ..., 7: Sonntag, 0: kein Tag' },
    { value: '11.001', label: '11.001: Datum: dD.mM.yY' },
    { value: '12.001', label: '12.001: Zählerimpluse (0...4294967295)' },
    { value: '13.001', label: '13.001: Zählerimpluse (-2147483648...2147483647)' },
    { value: '13.010', label: '13.010: Elektroenergie (-2147483648...2147483647 Wh)' },
    { value: '13.011', label: '13.011: Elektroenergie (-2147483648...2147483647 VAh)' },
    { value: '14.056', label: '14.056: Elektroenergie (W)' },
    { value: '15.000', label: '15.000: 4 Byte Binärdaten' },
    { value: '16.000', label: '16.000: 14 Zeichen als ASCII' },
    { value: '16.001', label: '16.001: 14 Zeichen als ISO-8859-1' },
    { value: '17.001', label: '17.001: Szenennummer (0...63)' }
  ]
}

const addAction = (context, item) => {
  socket.emit('add_data_point', item)
}

const updateAction = (context, dataPoint) => {
  socket.emit('update_data_point', dataPoint)
}

const removeAction = (context, item) => {
  socket.emit('remove_data_point', item)
}

const actions = {
  addAction,
  updateAction,
  removeAction
}

const SOCKET_DATA_POINTS_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
}

const SOCKET_ADD_DATA_POINTS_RESPONSE = (state, response) => {
  state.items.push(response[0])
}
const SOCKET_UPDATE_DATA_POINTS_RESPONSE = (state, response) => {
  const mapFnc = item => {
    return (item._id === response[0]._id)
      ? response[0]
      : item
  }
  state.items = state.items.map(mapFnc)
  state.selected = response[0]
}
const SOCKET_REMOVE_DATA_POINTS_RESPONSE = (state, response) => {
  state.items.push(response[0])
}

const mutations = {
  setLoading: (state, status) => state.isLoading = status,
  SOCKET_DATA_POINTS_RESPONSE,
  SOCKET_ADD_DATA_POINTS_RESPONSE,
  SOCKET_UPDATE_DATA_POINTS_RESPONSE,
  SOCKET_REMOVE_DATA_POINTS_RESPONSE
}

const isAddressAlreadyUsed =
  state =>
    (controlSystemId, address) =>
      !!state
        .items
        .find(item => item.controlSystem === controlSystemId && item.address === address)

const getByControlSystemId =
  state =>
    id =>
      state
        .items
        .filter(item => item.controlSystem === id)
        .sort(sortByAddress)

const getters = {
  isLoading: state => state.loading,
  get: state => state.items.sort(sortByAddress),
  getById: state => id => state.items.find(item => item._id === id),
  getByControlSystemId,
  isAddressAlreadyUsed,
  dataPointTypes: state => state.dataPointTypes
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
