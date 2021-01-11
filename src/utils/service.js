import axios from './axios';
import conf from '../support/config';
import md5 from 'js-md5';

// 参数组装
export default async function service(url,method = 'GET',params = {}){
  if(!url) return;
  let userId = localStorage.getItem("userId");
  let token = "";
  let timestamp = Date.now();
  // 判断是否是登录类型接口，签名不一样需要单独处理
  let isLogin = false;
  if(url.indexOf('/bumuApp') >= 0){
    let secretKey = conf.secretKey;
    let apiMethod = url.substr(url.lastIndexOf('/')+1);
    let md5Str = userId + apiMethod + secretKey;
    token = md5(md5Str);
    if(process.env.NODE_ENV === 'production'){
      url = conf.whost + url;
    }
  }else{
    isLogin = true;
    let access_token = localStorage.getItem("access_token");
    axios.defaults.headers.common['Authorization'] = `Bearer${access_token}`;

    if(process.env.NODE_ENV === 'production'){
      url = conf.loginHost + url;
    }
  }

  let aParams ={ method, url: `${ url }`};
  // 使用mock假数据
  if(conf.mock && process.env.NODE_ENV === 'development'){
    method = "POST";
    aParams = { method: "POST", url: '/mock' + url};
  } else {
    // 测试环境自动加前缀 /api
    if(process.env.NODE_ENV === 'development'){
      if(url.indexOf('/bumuApp') >= 0){
        aParams.url = '/api' + url;
      }else{
        aParams.url = '/loginapi' + url;
      }
    }
    // 是否默认传入 userid跟token
    if(!params.isWrap){
      if(!isLogin){
        params.userId = userId;
        params.token = token;
        // params.sign = token;
        // params.timestamp = timestamp;
      }
    }else{
      delete params.isWrap;
    }
  }
  // 根据请求类型，拼接不同参数
  method == 'GET' ? aParams.params = params : aParams.data = params;

  return axios(aParams)
}