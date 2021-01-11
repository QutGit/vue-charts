import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
axios.interceptors.request.use(function(config) {
    // console.log('http request ', config);
    return config;
}, function(error) {
    return Promise.reject(error);
})
// 响应拦截器
axios.interceptors.response.use(function(response) {
    let result = {};
    // 响应数据格式做二次处理，保证接口接收参数格式一致
    if(response.status === 200){
        if(response.data && response.data.data && response.data.data.list){
            response.data.data = response.data.data.list;
            result = response.data;
        }
        result = response.data;
    }
    return result;
}, function(error) {
    // 用户未登录 或登陆过期，根据接口返回做登录重定向
    if(error && error.response && error.response.status == 401){
        localStorage.removeItem("userId");
        localStorage.removeItem("access_token");
        location.href = "/login";
    }
    return Promise.reject(error.response.data);
})

export default axios;