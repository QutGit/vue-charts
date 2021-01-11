function isDev(){
    return process.env.NODE_ENV === 'development' ? true : false;
}
// 开发环境域名
let devApi = "https://xshapitest.linlongyun.com"; // 业务
let devId = "https://xshidtest.linlongyun.com";   // 登录
// 生产环境域名
let prodApi = "https://xshapitest.linlongyun.com"; // 业务
let prodId = "https://xshidtest.linlongyun.com";   // 登录
export default {
    whost: isDev() ? devApi : prodApi,
    loginHost: isDev() ? devId : prodId,
    secretKey: isDev() ? "bumuApp" : "bumuApp",
    mock: true, // 启用mock数据
}