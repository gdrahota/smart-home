import { socket } from '../main'

const state = {
  loading: true,
  items: [],
  selected: null,
  groupAddresses: null,
}

const addAction = (context, item) => {
  socket.emit('add.file-upload', item)
}

const removeAction = (context, id) => {
  socket.emit('remove.file-upload', id)
}

const updateAction = (context, item) => {
  socket.emit('update.file-upload', item)
}

const actions = {
  addAction,
  updateAction,
  removeAction,
}

const SOCKET_FILE_UPLOADS_RESPONSE = (state, response) => {
  console.log('GET ALL', response[0])
  state.items = response[0]
  state.loading = false
}

const SOCKET_ADD_FILE_UPLOADS_RESPONSE = (state, response) => {
  console.log('ADD', response[0])
  state.items.push(response[0])
}

const SOCKET_UPDATE_FILE_UPLOADS_RESPONSE = (state, response) => {
  const mapFnc = item => {
    return (item._id === response[0]._id)
      ? response[0]
      : item
  }
  state.items = state.items.map(mapFnc)
}

const SOCKET_REMOVE_FILE_UPLOADS_RESPONSE = (state, response) => {
  state.items = state.items.filter(f => f._id !== response[0])
}

const SOCKET_PROJECT_GROUP_ADDRESSES = (state, items) => {
  state.groupAddresses = items[0].map(i => {
    return {
      ...i,
      selected: false
    }
  })
}

const select = (state, item) => {
  state.selected = item
}

const SOCKET_FILE_UPLOAD_SUCCEEDED = (state, fileData) => {
  state.selected = fileData[0]._id
  console.log('SOCKET_FILE_UPLOADED', fileData[0])
}

const mutations = {
  setLoading: (state, status) => state.isLoading = status,
  SOCKET_FILE_UPLOADS_RESPONSE,
  SOCKET_ADD_FILE_UPLOADS_RESPONSE,
  SOCKET_UPDATE_FILE_UPLOADS_RESPONSE,
  SOCKET_REMOVE_FILE_UPLOADS_RESPONSE,
  SOCKET_FILE_UPLOAD_SUCCEEDED,
  SOCKET_PROJECT_GROUP_ADDRESSES,
  select,
}

const getters = {
  isLoading: state => state.loading,
  get: state => state.items,
  getById: state => id => state.items.find(f => f._id === id),
  getSelected: state => state.items.find(f => f._id === state.selected),
  getProjectGroupAddresses: state => state.groupAddresses,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
