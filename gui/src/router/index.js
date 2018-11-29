import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
import Controls from '../components/admin/controls'
import ControlSystems from '../components/admin/control-systems'
import DataPoints from '../components/admin/data-points'
import Facilities from '../components/admin/facilities'
import Home from '../views/Home.vue'
import RouterContainer from '../components/router-container'
import Store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      name: 'login',
      meta: {
        title: 'Anmeldung'
      }
    },
    {
      path: '/',
      component: RouterContainer,
      meta: {
        title: 'Home'
      },
      children: [
        {
          path: 'admin',
          component: RouterContainer,
          meta: {
            requiresAuth: true,
            title: 'Einstellungen',
            hasNoContent: true
          },
          children: [
            {
              path: 'facilities',
              component: Facilities,
              meta: {
                title: 'Gebäude verwalten'
              }
            },
            {
              path: 'controls',
              component: Controls,
              meta: {
                title: 'Steuerelemente verwalten'
              }
            },
            {
              path: 'control-systems',
              component: ControlSystems,
              meta: {
                title: 'Bussysteme verwalten'
              }
            },
            {
              path: 'data-points',
              component: DataPoints,
              meta: {
                title: 'Endpunkte verwalten'
              }
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Store.getters['client/userIsLoggedIn']) {
      Store.commit('client/setRequestedRouteBeforeLogin', to)
      next({
        name: 'login',
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

Store.subscribe((mutation, state) => {
  if (mutation.type === 'client/SOCKET_LOGIN_RESPONSE' && state.client.loggedIn === true) {
    const lastRoute = state.client.requestedRouteBeforeLogin

    if (lastRoute && state.client.requestedRouteBeforeLogin.path !== 'login') {
      router.push(lastRoute.fullPath)
      Store.commit('client/setRequestedRouteBeforeLogin')
    } else {
      router.push('/')
    }
  }

  if (mutation.type === 'client/logoutUser') {
    router.push('/login')
  }
})

export default router
