import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/index'
import './registerServiceWorker'
import './permission';
import './styles/index.scss'
import vueWaterfallEasy from 'vue-waterfall-easy'

Vue.config.productionTip = false;
 
// 千分位 过滤器 全局
Vue.filter('thounds', function(value){
  if(!value) return 0;
  if(isNaN(Number(value))) return 0;
  return (value || 0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
})
// 判断只有在开发环境下才加载mock接口，原因是mock会多出几十k的代码量，影响前端加载
if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock');
  mockXHR()
}

Vue.use(vueWaterfallEasy)

new Vue({
  el: '#app',
  router,
  components: {
    vueWaterfallEasy
  },
  store,
  render: h => h(App)
})
