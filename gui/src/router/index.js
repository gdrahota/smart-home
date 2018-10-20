import Vue from 'vue'
import Router from 'vue-router'
import Controls from '../components/admin/controls'
import ControlSystems from '../components/admin/control-systems'
import DataPoints from '../components/admin/data-points'
import Facilities from '../components/admin/facilities'
import Home from '../views/Home.vue'
import RouterContainer from '../components/router-container'

Vue.use(Router)

export default new Router({
  routes: [
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
