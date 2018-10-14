import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import RouterContainer from '../components/router-container'
import MaintainFacilities from '../components/admin/facilities'

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
              component: MaintainFacilities,
              meta: {
                title: 'Gebäude verwalten'
              }
            },
            {
              path: 'controls',
              component: MaintainFacilities,
              meta: {
                title: 'Steuerelemente verwalten'
              }
            }
          ]
        }
      ]
    }
  ]
})
