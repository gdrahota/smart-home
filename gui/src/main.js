import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
import socketIoClient from 'socket.io-client'
import vueSocketIO from 'vue-socket.io'
import config from '../config/client'
import Confirm from './components/general/confirm-dialog'
import KnxAddress from './components/general/knx-address'
import filters from './filter'
import { EventBus } from './event-bus'

import ('./assets/general-styles.css')

filters.register(Vue)

localStorage.debug = '*##'

export const socket = socketIoClient(location.hostname + ':' + config.server.port)

socket
  .on('connect', () => {
    // after every connect/reconnect we need fresh data from the
    // server in order to be sure to operate on accurate data
    EventBus.$emit('connected')
    EventBus.$emit('reLogin')
  })
  .on('disconnect', () => {
    EventBus.$emit('disconnected')
  })

Vue.use(vueSocketIO, socket, store)
Vue.use(VueMomentJS, moment)
Vue.component('confirm', Confirm)
Vue.component('KnxAddress', KnxAddress)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
