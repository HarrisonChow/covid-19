import Vue from 'vue'
import VueRouter from 'vue-router'
import News from '../views/News.vue'
import About from '../views/About.vue'
import Worldwide from '../views/Worldwide.vue'
import Faqs from '../views/Faqs.vue'
import Search from '../views/Search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'News',
    component: News
  },
  {
    path: '/Worldwide',
    name: 'Worldwide',
    component: Worldwide
  },
  {
    path: '/faqs',
    name: 'Faqs',
    component: Faqs
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
