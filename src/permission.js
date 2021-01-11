import router from './router/index';
import NProgress from 'nprogress';
import store from './store/index';

NProgress.configure({ showSpinner: false })

// 拦截路由 判断登录 动态加载路由等操作
router.beforeEach( async (to, from, next) =>{
    NProgress.start();
    // 异步加载路由信息
    await store.dispatch('permission/generateRoutes')
    // 从本地存储获取用户信息
    let userId = localStorage.getItem('userId') || '123';
    // 未登录直接跳转登录页面
    if(to.fullPath != '/login' && !userId && to.fullPath != '/forgot') {
      return next('/login');
    }
    // 判断是否有用户信息 页面刷新时调用，这一块我的处理是刷新页面重新加载接口，也可以放到sessionStorage里面，减少接口请求
    let userInfo = store.state.user.userInfo;
    if(userId && !userInfo.id){
      await store.dispatch("user/getUserInfo");
    }
    // 切到首页是显示透明菜单
    if(to.fullPath == '/'){
      setTimeout(() =>{
        window.scrollTo(0,0);
        store.dispatch('permission/getMenuType',1)
      },500)
    }else{
      store.dispatch('permission/getMenuType',2)
    }
    next()
})

router.afterEach(async () =>{
    NProgress.done();
})

