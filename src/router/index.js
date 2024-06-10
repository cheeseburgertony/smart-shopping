import Vue from 'vue'
import VueRouter from 'vue-router'

// 直接导入的需要在前面
import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'
import store from '@/store'

// 如果文件夹下的要引入的文件名是index则可以不用写文件名，直接写文件夹名即可
// 使用懒路由，当访问到该页面时才加载相对应的资源，进行优化，加载过的资源不会重复加载（防止首页面加载将所有资源一次性加载，访问过慢）
const Login = () => import('@/views/login')
const MyOrder = () => import('@/views/myorder')
const Pay = () => import('@/views/pay')
const ProDetail = () => import('@/views/prodetail')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/myorder', component: MyOrder },
    { path: '/pay', component: Pay },
    // 动态路由传参，确认将来是哪个商品，路由参数中携带id
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})

// 所有路由在真正访问到之前(解析渲染对应组件页面前),都会先经过全局前置守卫
// 只有全局守卫放行了,才会到达对应页面

/**
 * 全局前置导航守卫
 * to：  到哪里去，到哪去的完整路由信息对象（路径，参数）
 * from：从哪里来，从哪来的完整路由信息对象（路径，参数）
 * next()：是否放行
 * (1)next()     直接放行，放行到to要去的路径
 * (2)next(路径)  进行拦截，拦截到next里配置的路径
 */

// 创建一个数组用于存放访问需要权限的页面
const authUrl = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  // 查看需要权限访问的页面中是否包含当前要访问的页面
  if (!authUrl.includes(to.path)) {
    // 不包含直接放行
    next()
    return
  }
  // 如果包含则继续判断是否有token
  // 这个token访问路径太长了，去getters封装一下
  const token = store.getters.token
  if (token) {
    // 有token放行
    next()
  } else {
    // 无token拦截到login
    next('/login')
  }
})

export default router
