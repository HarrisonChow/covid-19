import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Australia from '../views/Australia.vue'
import Worldwide from '../views/Worldwide.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Australia',
    name: 'Australia',
    component: Australia
  },
  {
    path: '/Worldwide',
    name: 'Worldwide',
    component: Worldwide
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
