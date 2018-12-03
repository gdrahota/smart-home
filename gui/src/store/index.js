import Vue from 'vue'
import Vuex from 'vuex'

import client from './client'
import commandQueue from './command-queue'
import controls from './controls'
import controlDataPoints from './control-data-points'
import controlSystems from './control-systems'
import facilities from './facilities'
import facilityAttributes from './facility-attributes'
import facilityAttributeValues from './facility-attribute-values'
import dataPoints from './data-points'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    client,
    commandQueue,
    controls,
    controlDataPoints,
    controlSystems,
    dataPoints,
    facilities,
    facilityAttributes,
    facilityAttributeValues
  }
})
