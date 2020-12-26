import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/page',
    name: 'page',
    component: () => import('../views/page.vue'),
    meta: {},
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about.vue'),
    meta: { title: '其他', keepAlive: false }
  },
  { path: '/', redirect: { name: 'home' } }
]

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 })
})

export default router
