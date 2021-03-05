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
        path: '/sticky',
        name: 'sticky',
        meta: {
          title: '层级'
        },
        // import 中的注释名称是为了 是否将相同名称的组件打包到同一个异步文件中
        component: () => import(/* webpackChunkName: "Home" */ '../views/home/Sticky.vue')
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
