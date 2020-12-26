import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/page',
    name: 'page',
    component: () => import('../views/page/page.vue'),
    meta: {},
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/page/home.vue'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: 'classify',
        name: 'classify',
        component: () => import('../views/page/classify.vue'),
        meta: { title: '分类', keepAlive: false }
      },
      {
        path: 'phone',
        name: 'phone',
        component: () => import('../views/page/phone.vue'),
        meta: { title: '电话', keepAlive: false }
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/page/cart.vue'),
        meta: { title: '购物车', keepAlive: false }
      },
      {
        path: 'mine',
        name: 'mine',
        component: () => import('../views/page/mine.vue'),
        meta: { title: '我的', keepAlive: false }
      },
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/list.vue'),
    meta: { title: '列表页', keepAlive: false }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../views/detail.vue'),
    meta: { title: '详情页', keepAlive: false }
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
