const Mock = require('mockjs');
const Random = Mock.Random;

// 登录接口返回值
let loginInfo = {
  'id|+1': 1,
  'hroId|+1': 1,
  mobile: 18600656670,
  status: "@integer(1,4)",
  'tenantId|+1': 1,
  userName: "@cname",
  description: "@csentence()"
};

// 左补零
function leftPad(m){
  return m < 10 ? `0${m}`: m;
}


export default [{
    url: '/mock/auth/login',
    type: 'post',
    response: config => {
      return {
        status: 200,
        data: loginInfo
      }
    }
  },
  {
    url: '/mock/user/info',
    type: 'post',
    response: config => {
      return {
        status: 200,
        data: loginInfo
      }
    }
  },
  {
    url: '/mock/logout',
    type: 'post',
    response: config => {
      return {
        status: 200,
        data: {
          message: "退出成功"
        }
      }
    }
  },
  {
    url: '/mock/sms/verify',
    type: 'post',
    response: config => {
      return {
        status: 200,
        data: {
          message: "验证成功"
        }
      }
    }
  },
  {
    url: '/mock/auth/password',
    type: 'post',
    response: config => {
      return {
        status: 200,
        data: {
          message: "修改成功"
        }
      }
    }
  },
  {
    url: '/mock/sms/send/18600656670',
    type: 'post',
    response: config => {
      return {
        status: 200,
        data: {
          message: "发送成功"
        }
      }
    }
  }
]