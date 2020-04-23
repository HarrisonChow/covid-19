import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueMoment from 'vue-moment'
import BootstrapVue from 'bootstrap-vue'
import Autocomplete from '@trevoreyre/autocomplete-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@trevoreyre/autocomplete-vue/dist/style.css'

Vue.use(BootstrapVue)
Vue.use(VueMoment)
Vue.use(Autocomplete)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
