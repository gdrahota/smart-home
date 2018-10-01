import Vue from 'vue'
import Vuex from 'vuex'

import facilities from './facilities'
import controls from './controls'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    facilities,
    controls
  }
})
