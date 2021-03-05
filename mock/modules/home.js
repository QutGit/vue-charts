const Mock = require('mockjs');
const Random = Mock.Random;

let categorys = [];
let cs = Random.natural(5,8);
for(let i = 1; i <= cs; i++){
  let cat = {
    'termId|+1': 1,
    iconUrl: 'http://qiniu.zuolinju.com/kama/kama.png',
    'name|1': ["人物", "风景", "街拍", "抽象", "艺术", "人像", "人文", "私房", "恋人", "儿童", "风光", "旅行", "城市", "建筑", "生活", "水下", "街拍"],
    'slug|1': ['person', 'view', 'street', 'abstract', 'art', 'person', 'cultural', 'private', 'lover', 'children'],
    description: '摄影类'
  }
  categorys.push(cat);
}

// 根据选择月份获取就近已出账单
let latestYs = {
  'mxList|1-8': [{
      'cpJe|50-100.2':1,
      'cpMc|+1': ['社保','公积金','工资','个税','服务费','商业保险','残疾保障金', '代收代付其它']
    }
  ],
  ysId: Random.natural(1000,400000),
  'ysJe|1000-40000.2':1,
  ysNy: Random.date('yyyyMM')
}
// 获取按月账单金额 图表数据
let ysList = [];
let m = Random.natural(1,12);
let year = Random.date('yyyy');
for(let i = 1; i <= m; i++){
  let ysEntity = {
    'ysId|+1': 1,
    'ysJe|5000-100000.2':1,
    ysNy: `${year}${leftPad(i)}`
  }
  ysList.push(ysEntity);
}
// 按月在保人数
let empPerList = [];
let ms = Random.natural(1,12);
let y = Random.date('yyyy');
for(let i = 1; i <= ms; i++){
  let empEntity = {
    'ysId|+1': 1,
    addEmp: Random.natural(100,1500),
    offEmp: Random.natural(100,1500),
    onEmp: Random.natural(2000,5000),
    reportMonth: `${y}${leftPad(i)}`
  }
  empPerList.push(empEntity);
}

let arrCity = [];
let integer = Random.integer(1,5);
for(let i = 0; i < integer; i++){
  let s = ['社保','公积金'];
  let c = `@city()${s[i%2]}`;
  arrCity.push(c);
}
let getSbjd = {
  'list|1-20':[{
    csMc: '@city()',
    jd: "@date('dd')",
    sbArr: arrCity
  }]
};

// 左补零
function leftPad(m){
  return m < 10 ? `0${m}`: m;
}

export default [{
    url: '/mock/webapi/categorys',
    type: 'post',
    response: config => {
      return {
        code: 0,
        msg: 'success',
        list: categorys
      }
    }
  },
  {
    url: '/mock/bumuApp/invoke/custInfo/getZrkf',
    type: 'post',
    response: config => {
      return {
        status: 1,
        data: getZrkf
      }
    }
  },
  {
    url: '/mock/bumuApp/invoke/custInfo/getSbjd',
    type: 'post',
    response: config => {
      return {
        status: 1,
        data: getSbjd
      }
    }
  },
  {
    url: '/mock/bumuApp/invoke/custInfo/getLatestYs',
    type: 'post',
    response: config => {
      return {
        status: 1,
        data: latestYs
      }
    }
  },
  {
    url: '/mock/bumuApp/invoke/custInfo/getYsByMonths',
    type: 'post',
    response: config => {
      return {
        status: 1,
        data: ysList
      }
    }
  },
  {
    url: '/mock/bumuApp/invoke/custInfo/getOnEmpByMonths',
    type: 'post',
    response: config => {
      return {
        status: 1,
        data: empPerList
      }
    }
  }
]