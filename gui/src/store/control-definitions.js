const state = {
  loading: true,
  items: [],
}

/* Mutations */
const SOCKET_CONTROL_DEFINITIONS_RESPONSE = (state, response) => {
  state.items = response[0]
  state.loading = false
}

const mutations = {
  SOCKET_CONTROL_DEFINITIONS_RESPONSE,
}

export default {
  namespaced: true,
  state,
  mutations,
  getters: {
    get: state => state.items,
    getByName: state => name => state.items.find(def => def.name === name),
  }
}
