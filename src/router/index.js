import Vue from 'vue'
import AppMain from '../views/layout/index'
import Layout from '../views/layout/Layout';
import Router from 'vue-router'


Vue.use(Router)
export const baseRouter = [
  {
    path: '/',
    component: AppMain,
    children: [
      {
        path: '', // 如果不设置路由 默认从父路由 Home 会被渲染在Layout中
        name: 'home',
        meta: {
          title: '首页'
        },
        // import 中的注释名称是为了 是否将相同名称的组件打包到同一个异步文件中
        component: () => import(/* webpackChunkName: "Home" */ '../views/home/Home.vue')
      },
      {
        path: '/mobile',
        name: 'mobile',
        meta: {
          title: '修改登录手机',
          expetc: true
        },
        component: () => import(/* webpackChunkName: "Home" */ '../views/home/Mobile.vue')
      },
      {
        path: '/login',
        name: 'login',
        meta: {
          title: '登录',
          expetc: true
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue')
      },
      {
        path: '/forgot',
        name: 'forgot',
        meta: {
          title: '找回密码',
          expetc: true
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/login/Forgot.vue')
      },
      {
        path: '/validate',
        name: 'validate',
        meta: {
          title: '获取手机验证码',
          expetc: true
        },
        component: () => import(/* webpackChunkName: "Home" */ '../views/home/Validate.vue')
      },
      {
        path: '/changepwd',
        name: 'changepwd',
        meta: {
          title: '修改登录密码',
          expetc: true
        },
        component: () => import(/* webpackChunkName: "Home" */ '../views/login/Password.vue')
      },
      {
        path: '/inputpwd',
        name: 'inputpwd',
        meta: {
          title: '修改登录密码',
          expetc: true
        },
        component: () => import(/* webpackChunkName: "Home" */ '../views/login/Inputpwd.vue')
      },
      {
        path: '/orders',
        name: 'orders',
        meta: {
          title: '订单管理'
        },
        component: () => import(/* webpackChunkName: "Order" */ '../views/order/Orders.vue')
      },
      {
        path: '/statement',
        name: 'statement',
        meta: {
          title: '对账单管理'
        },
        component: () => import(/* webpackChunkName: "Statement" */ '../views/statement/Statement.vue')
      },
      {
        path: '/policy',
        name: 'policy',
        meta: {
          title: '专项扣减'
        },
        component: () => import(/* webpackChunkName: "Policy" */ '../views/policy/Policy.vue')
      }
    ]
  },
  { path: '*', redirect: '/', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history',

  // 设置浏览器默认滚动位置
  // https://github.com/vuejs/vue-router/blob/dev/examples/scroll-behavior/app.js
  scrollBehavior(to, from, savedPosition) {
    console.log(savedPosition)
    // 异步滚动到指定位置
    // return new Promise((resolve, reject) =>{
    //   setTimeout(() =>{
    //     resolve({x: 0, y: 0})
    //   },2000)
    // })

    // if(savedPosition){
    //   return savedPosition;
    // }else {
    //   return {x: 0, y: 0}
    // }

    return {x: 0, y: 0}
  },
  routes: baseRouter
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher 
}

export default router
