const Mock = require('mockjs');
const Random = Mock.Random;

// 客户账单模板
let mbCustomers = {
  'list|1-10':[{
    'zdmbId|+1': 1,
    zdmbMc: "@city@csentence(2,5)"
  }]
}

// 对账单列表
let billList = {
  'list|20':[{
    'ysId|+1': 1,
    'ysJe|1000-50000.2': 1,
    ysNy: "@date('yyyyMM')",
    zdmbMc: "@city@csentence(2,5)"
  }]
};
let total = Random.integer(20,100);

// 对账单详情 客户项目基本信息
let customerInfo = {
  'list|2-10':[{
    'cpMc|1': ['一次性社保', '服务费', '项目经费', '代缴公积金', '代缴社保'],
    'dlMc|1': ['社保', '服务费', '项目', '代缴', '公积金'],
    'je|1000-50000.2': 1,
    'jjg|1000-50000.2': 1,
    'zzs|1000-5000.2': 1
  }]
};

// 对账单详情 员工明细
let stuffInfo = {
  'list|30-100':[{
    xm: '@cname',
    sfzHm: '@ID',
    fwny: "@date('yyyyMM')",
    cs: '@city',
    'sbQyje|1000-5000.2': 1,
    'sbGrje|1000-5000.2': 1,
    'gjjQyje|1000-5000.2': 1,
    'gjjbGrje|1000-5000.2': 1,
    'czjJe|1000-5000.2': 1,
    'sf|1000-5000.2': 1,
    'gs|1000-5000.2': 1,
    'sbJeJjg|1000-5000.2': 1,
    'sbZzs|1000-5000.2': 1,
    'sbJe|1000-5000.2': 1,
    'dsdfGrje|1000-5000.2': 1,
    'dsdfQyje|1000-5000.2': 1,
    'fwfJe|1000-5000.2': 1,
    'fwfZzs|1000-5000.2': 1,
    'fwfJeJjg|1000-5000.2': 1,
    'zje|1000-5000.2': 1
  }]
};
let head = {
  's1|1':["社保", ""],
  's2|1':["公积金", ""],
  's3|1':["商业保险", ""],
  's4|1':["代收代付其它", ""],
  's5|1':["工资", ""],
  's7|1':["服务费", ""],
  's8|1':["残疾保障金", ""],
};

// 左补零
function leftPad(m){
  return m < 10 ? `0${m}`: m;
}

export default [{
    url: '/mock/bumuApp/invoke/custInfo/getZdmb',
    type: 'post',
    response: config => {
      return {
        status: 1,
        data: mbCustomers
      }
    }
  },
  {
    url: '/mock/bumuApp/invoke/custInfo/getYs',
    type: 'post',
    response: config => {
      let pageSize = config.body.pageSize;
      let pageNumber = config.body.pageNumber;
      total = 110;
      return {
        status: 1,
        data: billList,
        total: total,
        pages: total/pageSize,
        pageSize: pageSize,
        pageNumber: pageNumber
      }
    }
  },
  {
    url: '/mock/bumuApp/invoke/custInfo/getYsYcx',
    type: 'post',
    response: config => {
      return {
        status: 1,
        data: customerInfo
      }
    }
  },
  {
    url: '/mock/bumuApp/invoke/custInfo/getYsmx',
    type: 'post',
    response: config => {
      return {
        status: 1,
        data: stuffInfo,
        head: head
      }
    }
  }
]