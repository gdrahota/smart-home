import Vue from 'vue'
import router from '../router'
import Store from '../store'

export const EventBus = new Vue()

EventBus
  .$on('logout', () => {
    Store.dispatch('client/logoutAction')
    router.push('/')
  })
  .$on('login-or-re-login', to => {
    const client = Store.state.client

    if (client.loggedIn === false) {
      if (to) {
        Store.commit('client/setRequestedRouteBeforeLogin', to)
      }

      if (client.reLoginFailure === null) {
        Store.dispatch('client/reLoginAction')
      } else {
        router.replace('/login')
      }
    }
  })
  .$on('connected', () => Store.commit('client/setSocketStateMutation', 'connected'))
  .$on('disconnected', () => Store.commit('client/setSocketStateMutation', 'disconnected'))

Store.subscribe((mutation, state) => {
  const watchMutations = [
    'client/SOCKET_LOGIN_RESPONSE',
    'client/SOCKET_LOGIN_FAILED',
    'client/SOCKET_RELOGIN_RESPONSE',
    'client/SOCKET_RELOGIN_FAILED',
  ]
  if (watchMutations.indexOf(mutation.type) === -1) {
    return
  }

  if (state.client.loggedIn === false) {
    EventBus.$emit('login-or-re-login')
  } else {
    const lastRoute = state.client.requestedRouteBeforeLogin

    if (lastRoute && state.client.requestedRouteBeforeLogin.path !== 'login') {
      router.replace(lastRoute.fullPath)
      Store.commit('client/setRequestedRouteBeforeLogin', null)
    } else {
      router.push('/control')
    }
  }
})
