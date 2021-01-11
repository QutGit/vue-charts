const Mock = require('mockjs');
const Random = Mock.Random;

// 劳动合同详情
let list = {
  'list|20': [{
    cs: '@city()',
    jsy: "@date('yyyyMM')",
    'sfzLx|1': ['身份证','护照', '驾驶本'],
    sfzHm: "@ID",
    xm: "@cname",
    'zfdk_je|1000-8000.2': 1,
    'zfzj_je|1000-4000.2': 1,
    'sylr_je|1000-4000.2': 1,
    'znjy_je|1000-4000.2': 1,
    'jxjy_je|1000-4000.2': 1
  }]
};
let total = Random.natural(50,100);

// 左补零
function leftPad(m){
  return m < 10 ? `0${m}`: m;
}


export default [{
    url: '/mock/bumuApp/invoke/custInfo/getZxdk',
    type: 'post',
    response: config => {
      let pageSize = config.body.pageSize;
      let pageNumber = config.body.pageNumber;
      total = 110;
      return {
        status: 1,
        data: list,
        total: total,
        pages: total/pageSize,
        pageSize: pageSize,
        pageNumber: pageNumber
      }
    }
  }
]