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

localStorage.debug = '*'

console.log('location', location.hostname + ':' + config.server.port)

//export const socket = socketIoClient('127.0.0.1:' + config.server.port)
//export const socket = socketIoClient()

const inDevMode = process.env.NODE_ENV === 'development'
const socketOptions = { transports: ['websocket'], }

let url = window.location.protocol + '//' + window.location.hostname + ':'
url += inDevMode ? 3000 : window.location.port

console.log('=> connect to server via websocket url:', url)
export const socket = socketIoClient(url, socketOptions)

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

moment.locale('de')
Vue.use(VueMomentJS, moment)
Vue.component('confirm', Confirm)
Vue.component('KnxAddress', KnxAddress)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
