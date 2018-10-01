import { facilityData } from './facility-data'

const state = {
  loading: true,
  facilities: []
}

const actions = {
  loadAction: context => {
    context.commit('receivedMutation', facilityData)
  }
}

const mutations = {
  receivedMutation: (state, facilities) => {
    state.facilities = facilities
    state.loading = false
  }
}

const getters = {
  isLoading: state => state.loading,
  get: state => state.facilities
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
