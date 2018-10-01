import { controlData } from './control-data'

const state = {
  loading: true,
  controls: []
}

const actions = {
  loadAction: context => {
    context.commit('receivedMutation', controlData)
  }
}

const mutations = {
  receivedMutation: (state, controls) => {
    state.controls = controls
    state.loading = false
  }
}

const getters = {
  isLoading: state => state.loading,
  get: state => state.controls
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
