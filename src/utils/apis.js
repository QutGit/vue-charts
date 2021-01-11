import service from './service';

// 首页 右侧 服务信息：责任客服信息
export const getZrkf =(params)=>service('/bumuApp/invoke/custInfo/getZrkf',"GET", params);
// 首页 右侧 社保信息
export const getSbjd =(params)=>service('/bumuApp/invoke/custInfo/getSbjd',"GET", params);
// 首页 左侧 在保人数，增员人数，减员人数
export const getOnEmpCount =(params)=>service('/bumuApp/invoke/custInfo/getOnEmpCount',"GET", params);
// 首页 左侧 根据选择月份获取就近已出账单
export const getLatestYs =(params)=>service('/bumuApp/invoke/custInfo/getLatestYs',"GET", params);
// 首页 左侧 按月账单金额折线图数据
export const getYsByMonths =(params)=>service('/bumuApp/invoke/custInfo/getYsByMonths',"GET", params);
// 首页 左侧 按月在保人数 增员人数，减员人数，在保人数
export const getOnEmpByMonths =(params)=>service('/bumuApp/invoke/custInfo/getOnEmpByMonths',"GET", params);


// 订单管理 人员分类列表 
export const getDhtLx =(params)=>service('/bumuApp/invoke/custInfo/getDhtLx',"GET", params);
// 订单管理 订单列表 
export const getSxg =(params)=>service('/bumuApp/invoke/custInfo/getSxg',"GET", params);
// 订单管理 订单详情 员工基本信息 
export const getSxgBase =(params)=>service('/bumuApp/invoke/custInfo/getSxgBase',"GET", params);
// 订单管理 订单详情 社保公积金信息
export const getSxgCp =(params)=>service('/bumuApp/invoke/custInfo/getSxgCp',"GET", params);
// 订单管理 劳动合同详情
export const getLdht =(params)=>service('/bumuApp/invoke/custInfo/getLdht',"GET", params);


// 对账单管理 账单模板名称
export const getZdmb =(params)=>service('/bumuApp/invoke/custInfo/getZdmb',"GET", params);
// 对账单管理 对账单列表
export const getYs =(params)=>service('/bumuApp/invoke/custInfo/getYs',"GET", params);
// 对账单详情 客户项目基本信息
export const getYsYcx =(params)=>service('/bumuApp/invoke/custInfo/getYsYcx',"GET", params);
// 对账单详情 员工信息
export const getYsmx =(params)=>service('/bumuApp/invoke/custInfo/getYsmx',"GET", params);


// 专项扣款 列表信息
export const getZxdk =(params)=>service('/bumuApp/invoke/custInfo/getZxdk',"GET", params);


// 登录相关
export const login =(params)=>service('/auth/login',"POST", params);
// 获取用户信息
export const getUser =(params)=>service('/user/info',"GET", params);
// 退出登录
export const logout =(params)=>service('/logout',"GET", params);
// 发送短信
export const sendMessage =(params)=>service('/open/send/code',"POST", params);

// 短信验证
export const smsVerify =(params)=>service('/open/verify/code',"POST", params);
// 修改密码
export const changePwd =(params)=>service('/auth/forgotPassword',"PUT", params);
// 修改手机号
export const changeMobile =(params)=>service('/auth/mobile',"PUT", params);