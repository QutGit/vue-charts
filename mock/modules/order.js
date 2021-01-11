const Mock = require('mockjs');
const Random = Mock.Random;

// 服务信息 责任客服
let dhtLxs = []
let dht = ['派遣','单立户代理','大户代理','商业保险','代发工资','非全用工','BPO','薪酬优化','外包','证件办理','招聘猎头'];
dht.forEach((item,index) =>{
  let dhtE = {htLx: index + 1, htLxMc: item};
  dhtLxs.push(dhtE);
})

// 订单列表
let orderList = {
  'list|20':[{
    'sxgId|+1': 1,
    cs: "@city",
    gyXm: '@cname',
    hireDt: "@date('yyyy-MM-dd')",
    sepDt: "@date('yyyy-MM-dd')",
    'htLxMc|1': ['派遣','单立户代理','大户代理','商业保险','代发工资','非全用工','BPO','薪酬优化','外包','证件办理','招聘猎头'],
    sfzHm: '@ID',
    sxgLx: "@integer(1,4)",
    sxgZt: "@integer(1,2)"
  }]
}
let total = Random.natural(50,100);

// 订单详情 员工基本信息 
let stuffInfo = {
  gyXm: '@cname',
  hireDt: "@date('yyyy-MM-dd')",
  'hjXz|1': ['非农村户口', '农村户口'],
  'htLx|1': ['派遣','单立户代理','大户代理','商业保险','代发工资','非全用工','BPO','薪酬优化','外包','证件办理','招聘猎头'],
  htLxMc: Random.csentence(4,10),
  khMc: '@cname',
  phone: /^1[0-9]{10}$/,
  sfzHm: '@ID',
  'sfzLx|1': ['居民身份证', '护照', '驾驶本'],
  sjgzd: `${Random.county(true)}${Random.natural(1,30)}号`
}

// 订单详情 社保公积金信息
let fundList = {
  'list|6-10':[{
    bl: '企业比例 @float(0, 50, 0, 2) 个人比例 @float(0, 50, 0, 2)',
    'cpMc|1': ['失业保险','工伤保险','生育保险','养老保险','医疗保险','住房公积金','残障保障金', '补充公积金', '大病保险'],
    'grJe|500-2000.2':1,
    grJs: "@integer(1000,20000)",
    qyJe: "@integer(1000,20000)",
    'qyJs|500-2000.2': 1,
    'je|1000-5000.2': 1
  }]
}

// 劳动合同详情
let ldhtList = {
  'list|2-10': [{
    bz: '@csentence()',
    htEt: "@date('yyyy-MM-dd')",
    htSt: "@date('yyyy-MM-dd')",
    qsRq: "@date('yyyy-MM-dd')",
    syEt: "@date('yyyy-MM-dd')",
    sySt: "@date('yyyy-MM-dd')",
    'sygz|5000-40000.2': 1,
    syqx: '@integer(1,6)',
    'zw|1': ['总裁','副总','VP','经理','大区经理','总裁助理','部门Leader','组长','一般员工','实习生','外包'],
    zzgz: '@integer(5000,60000)'
  }]
};

// 左补零
function leftPad(m){
  return m < 10 ? `0${m}`: m;
}


export default [{
    url: '/mock/bumuApp/invoke/custInfo/getDhtLx',
    type: 'post',
    response: config => {
      return {
        status: 1,
        data: dhtLxs
      }
    }
  },
  {
    url: '/mock/bumuApp/invoke/custInfo/getSxg',
    type: 'post',
    response: config => {
      let pageSize = config.body.pageSize;
      let pageNumber = config.body.pageNumber;
      total = 110;
      return {
        status: 1,
        data: orderList,
        total: total,
        pages: total/pageSize,
        pageSize: pageSize,
        pageNumber: pageNumber
      }
    }
  },
  {
    url: '/mock/bumuApp/invoke/custInfo/getSxgBase',
    type: 'post',
    response: config => {
      return {
        status: 1,
        data: stuffInfo
      }
    }
  },
  {
    url: '/mock/bumuApp/invoke/custInfo/getSxgCp',
    type: 'post',
    response: config => {
      return {
        status: 1,
        data: fundList
      }
    }
  },
  {
    url: '/mock/bumuApp/invoke/custInfo/getLdht',
    type: 'post',
    response: config => {
      return {
        status: 1,
        data: ldhtList
      }
    }
  }
]