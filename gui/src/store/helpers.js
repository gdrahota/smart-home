const state = {
  isInSelectionMode: false,
}

const startMutation = state => state.selecting = true

const stopMutation = state => state.selecting = false

const mutations = {
  startMutation,
  stopMutation
}

const getters = {
  isInSelectionMode: state => state.isInSelectionMode,
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
}
