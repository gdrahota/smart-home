import Vue from 'vue'
import Store from '../store'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import RouterContainer from '../components/router-container'
import { EventBus } from '../event-bus'

const Schedules = () => import ('../components/admin/schedules')
const ExternalDataSources = () => import ('../components/admin/external-data-sources')
const OpenWeatherMap = () => import ('../components/admin/external-data-sources/open-weather-map')
const KnxMonitor = () => import ('../components/utils/knx-monitor')
const Control = () => import ('../components/control')
const Facilities = () => import('../components/admin/facilities')
const DataPoints = () => import('../components/admin/data-points')
const ControlSystems = () => import('../components/admin/control-systems')
const Controls = () => import('../components/admin/controls')
const Login = () => import('../components/login')
const ManageUsers = () => import('../components/admin/users')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
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
          name: 'tools',
          component: RouterContainer,
          meta: {
            requiresAuth: true,
            title: 'Werkzeug',
            hasNoContent: true,
          },
          children: [
            {
              name: 'knx-monitor',
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
              path: 'users',
              component: ManageUsers,
              meta: {
                title: 'Benutzerverwaltung'
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
  const cond1 = to.matched.some(record => record.meta.requiresAuth)
  const cond2 = Store.getters['client/userIsLoggedIn'] === false

  if (cond1 && cond2) {
    EventBus.$emit('login-or-re-login', to)
  } else {
    next()
  }
})

export default router
