import Vue from 'vue'
import Vuex from 'vuex'

import facilities from './facilities'
import facilityAttributes from './facility-attributes'
import facilityAttributeValues from './facility-attribute-values'
import controls from './controls'
import dataPoints from './data-points'
import controlDataPoints from './control-data-points'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    controls,
    dataPoints,
    facilities,
    facilityAttributes,
    facilityAttributeValues,
    controlDataPoints
  }
})
