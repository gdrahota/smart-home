import Vue from 'vue'
import Vuex from 'vuex'

import client from './client'
import commands from './commands'
import controls from './controls'
import controlDataPoints from './control-data-points'
import controlSystems from './control-systems'
import dataPoints from './data-points'
import facilities from './facilities'
import facilityAttributes from './facility-attributes'
import facilityAttributeValues from './facility-attribute-values'
import knxEvents from './knx-events'
import schedules from './schedules'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    client,
    commands,
    controls,
    controlDataPoints,
    controlSystems,
    dataPoints,
    facilities,
    facilityAttributes,
    facilityAttributeValues,
    knxEvents,
    schedules
  }
})
