import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/reset.css'
import './assets/css/common.css'

import Dialog from './components/dialog'
import Loading from './components/loading'
import toast from './components/toast'

import './JS/plugin'
import './JS/FastClick'
import utils from './JS/utils'
import VueScroller from 'vue-scroller'
import { get, post } from './JS/ajax'

import { baseApi } from './JS/config'
console.log(baseApi)

Vue.use(VueScroller)
Vue.use(utils)

Vue.prototype.$dialog = Dialog
Vue.prototype.$loading = Loading
Vue.prototype.$toast = toast
Vue.prototype.$http = { get, post }

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
