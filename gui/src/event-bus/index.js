import Vue from 'vue'
import router from '../router'
import store from '../store'

export const EventBus = new Vue()

EventBus
  .$on('logout', () => {
    store.dispatch('client/logoutAction')
    router.push('/')
  })
  .$on('reLogin', () => {
    store.dispatch('client/reLoginAction')
    router.push('/')
  })
  .$on('connected', () => store.commit('client/setSocketStateMutation', 'connected'))
  .$on('disconnected', () => store.commit('client/setSocketStateMutation', 'disconnected'))
