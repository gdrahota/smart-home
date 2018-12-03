import Vue from 'vue'
import router from '../router'
import store from '../store'

export const EventBus = new Vue()

EventBus.$on('logout', () => {
  store.dispatch('client/logoutAction')
  router.push('/')
})

EventBus.$on('reLogin', () => {
  store.dispatch('client/reLoginAction')
  router.push('/')
})
