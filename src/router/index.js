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
        meta: { title: '购物车', keepAlive: false, requiresAuth: true }
      },
      {
        path: 'mine',
        name: 'mine',
        component: () => import('../views/page/mine.vue'),
        meta: { title: '我的', keepAlive: false, requiresAuth: true }
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
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
    meta: { title: '登录', keepAlive: false, goBack: true }
  },
  {
    path: '/reg',
    name: 'reg',
    component: () => import('../views/reg.vue'),
    meta: { title: '注册', keepAlive: false, goBack: true }
  },
  {
    path: '/distribution',
    name: 'distribution',
    component: () => import('../views/distribution.vue'),
    meta: { title: '分布页', keepAlive: false, requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about.vue'),
    meta: { title: '其他', keepAlive: false }
  },
  { path: '/', redirect: { name: 'home' } }
]
const createRouter = () => new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 })
})
function removeItem(){ 
  localStorage.removeItem("token") // 过期的话，就将已存在的token,key删掉
  localStorage.removeItem("key") // 过期的话，就将已存在的token,key删掉
}
var router = createRouter()
// 全局路由
router.beforeEach(async (to, from, next) => {
  // 判断哪些页面需要鉴权
  if (to.meta.requiresAuth) { //需要鉴权
    let token = localStorage.getItem('token')
    // 判断是否有token
    if (token) {// 有，说明有可能处于登录状态
      // 发送请求，查看token是否过期
      let data = await router.app.$http.post('/verify')
      // 判断token值是否过期
      if (data.token) { // 过期
        next()
      } else { //过期，跳回到登录页面
        removeItem() // 删除本地存储
        next({
          path: '/login',
          query: {
            redirectUrl: to.fullPath
          }
        })
      }
    } else {//无，说明没有处于登录状态，跳回到登录页面
      next({
        path: '/login',
        query: {
          redirectUrl: to.fullPath
        },
        replace: true
      });
    }
  }
  // 如果登录了，就不能进入登录
  if (to.meta.goBack) {
    let data = await router.app.$http.post('/verify')
    // 判断token值是否过期
    if (data.token) { // 没有过期
      router.app.$dialog.alert({
        message: "对不起，你已经登录了"
      })
        .then(() => {
          next(from.fullPath) // 回到原来的页面
        })
    } else { // 过期，跳回到登录页面
      removeItem() // 删除本地存储
      next()
    }
  }
  next()
})
function resetRouter(){ 
  const newRouter = createRouter()
  router = newRouter
}
export default router
