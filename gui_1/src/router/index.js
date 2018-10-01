import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import AdminContainer from '../components/admin'
import MaintainFacilities from '../components/admin/facilities'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminContainer,
      children: [
        {
          path: 'facilities',
          component: MaintainFacilities
        }
      ]
    }
  ]
})
