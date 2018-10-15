import Vue from 'vue'
import Vuex from 'vuex'

import facilities from './facilities'
import facilityAttributes from './facility-attributes'
import facilityAttributeValues from './facility-attribute-values'
import controls from './controls'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    facilities,
    facilityAttributes,
    facilityAttributeValues,
    controls
  }
})
