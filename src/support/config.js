function isDev(){
    return process.env.NODE_ENV === 'development' ? true : false;
}
// 开发环境域名
let devApi = "http://kama.zuolinju.com:3302"; // 业务
let devId = "http://kama.zuolinju.com:3302";   // 登录
// 生产环境域名
let prodApi = "http://kama.zuolinju.com:3302"; // 业务
let prodId = "http://kama.zuolinju.com:3302";   // 登录
export default {
    whost: isDev() ? devApi : prodApi,
    loginHost: isDev() ? devId : prodId,
    secretKey: isDev() ? "bumuApp" : "bumuApp",
    mock: false, // 启用mock数据
}
