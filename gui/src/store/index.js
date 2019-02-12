import Vue from 'vue'
import Vuex from 'vuex'

import client from './client'
import commands from './commands'
import controls from './controls'
import controlDataPoints from './control-data-points'
import controlDefinitions from './control-definitions'
import controlSystems from './control-systems'
import dataPoints from './data-points'
import externalDataSources from './external-data-sources'
import facilities from './facilities'
import facilityAttributes from './facility-attributes'
import facilityAttributeValues from './facility-attribute-values'
import helpers from './helpers'
import knxEvents from './knx-events'
import schedules from './schedules'
import timeSlots from './time-slots'
import users from './users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    client,
    commands,
    controls,
    controlDataPoints,
    controlDefinitions,
    controlSystems,
    dataPoints,
    externalDataSources,
    facilities,
    facilityAttributes,
    facilityAttributeValues,
    helpers,
    knxEvents,
    schedules,
    timeSlots,
    users,
  }
})
