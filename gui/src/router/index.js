import Vue from 'vue'
import Store from '../store'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import RouterContainer from '../components/router-container'

const Schedules = () => import ('../components/admin/schedules')
const ExternalDataSources = () => import ('../components/admin/external-data-sources')
const OpenWeatherMap = () => import ('../components/admin/external-data-sources/open-weather-map')
const SelectDayAndTime = () => import ('../components/admin/schedules/index2')
const KnxMonitor = () => import ('../components/utils/knx-monitor')
const Control = () => import ('../components/control')
const Facilities = () => import('../components/admin/facilities')
const DataPoints = () => import('../components/admin/data-points')
const ControlSystems = () => import('../components/admin/control-systems')
const Controls = () => import('../components/admin/controls')
const Login = () => import('../components/login')

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
          path: 'tools',
          component: RouterContainer,
          meta: {
            requiresAuth: true,
            title: 'Werkzeug',
            hasNoContent: true,
          },
          children: [
            {
              path: 'knx-monitor',
              component: KnxMonitor,
              meta: {
                title: 'KNX-Monitor'
              }
            },
          ]
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
            },
            {
              path: 'schedules',
              component: Schedules,
              meta: {
                title: 'Zeitsteuerung'
              }
            },
            {
              path: 'schedules-2',
              component: SelectDayAndTime,
              meta: {
                title: 'Zeitsteuerung II'
              }
            },
            {
              path: 'external-data-sources',
              component: ExternalDataSources,
              meta: {
                title: 'Externe Datenquellen'
              },
              children: [
                {
                  path: 'open-weather-map/:id/:name',
                  component: OpenWeatherMap,
                  meta: {
                    title: 'OpenWeatherMap'
                  }
                }
              ]
            },
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
