import Vue from 'vue'
import Store from '../store'
import Router from 'vue-router'
import Login from '../components/login'
import Controls from '../components/admin/controls'
import ControlSystems from '../components/admin/control-systems'
import DataPoints from '../components/admin/data-points'
import Facilities from '../components/admin/facilities'
import Home from '../views/Home.vue'
import RouterContainer from '../components/router-container'
import Control from '../components/control'
import KnxMonitor from '../components/utils/knx-monitor'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: RouterContainer,
      meta: {
        title: 'Home'
      },
      children: [
        {
          path: 'login',
          component: Login,
          name: 'login',
          meta: {
            title: 'Anmeldung'
          }
        },
        {
          path: 'control',
          component: Control,
          name: 'control',
          meta: {
            requiresAuth: true,
            title: 'Steuerung'
          }
        },
        {
          path: 'tools/knx-monitor',
          component: KnxMonitor,
          name: 'knx-monitor',
          meta: {
            requiresAuth: true,
            title: 'KNX-Monitor 2'
          }
        },
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
      router.replace(lastRoute.fullPath)
      Store.commit('client/setRequestedRouteBeforeLogin', null)
    } else {
      router.push('/')
    }
  }
})

export default router
