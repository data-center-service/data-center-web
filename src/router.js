import Vue from 'vue'
import Router from 'vue-router'
import Business from './views/Business.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/business'
    },
    {
      path: '/business',
      name: 'business',
      component: Business
    }
  ]
})
