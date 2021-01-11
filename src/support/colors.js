// 社保、公积金、工资、个税、服务费、商保、代收代付其它、其它
export default [
  {
    text: '社保',
    type: 'linear',
    scolor: '#12B392',
    colorStops: [{
      offset: 0, color: '#21EBE8' // 0% 处的颜色
    }, {
      offset: 1, color: '#12B392' // 100% 处的颜色
    }],
    global: false // 缺省为 false
  },
  {
    text: '公积金',
    type: 'linear',
    scolor: '#B220E3',
    colorStops: [{
      offset: 0, color: '#FF76DB'
    }, {
      offset: 1, color: '#B220E3'
    }],
    global: false
  },
  {
    text: '工资',
    scolor: '#5267E2',
    type: 'linear',
    colorStops: [{
      offset: 0, color: '#1AC5FF'
    }, {
      offset: 1, color: '#5267E2'
    }],
    global: false
  },
  {
    text: '个税',
    type: 'linear',
    scolor: '#4EF6A6',
    colorStops: [{
      offset: 0, color: '#30B071'
    }, {
      offset: 1, color: '#4EF6A6'
    }],
    global: false
  },
  {
    text: '服务费',
    type: 'linear',
    scolor: '#FE601D',
    colorStops: [{
      offset: 0, color: '#FFC66B'
    }, {
      offset: 1, color: '#FE601D'
    }],
    global: false
  },
  {
    text: '商保',
    type: 'linear',
    scolor: '#3096FF',
    colorStops: [{
      offset: 0, color: '#4EDBFF'
    }, {
      offset: 1, color: '#3096FF'
    }],
    global: false
  },
  {
    text: '代收代付其他',
    type: 'linear',
    scolor: '#F7921C',
    colorStops: [{
      offset: 0, color: '#FFE584'
    }, {
      offset: 1, color: '#F7921C'
    }],
    global: false
  },
  {
    text: '残疾保障金',
    type: 'linear',
    scolor: '#45A31F',
    colorStops: [{
      offset: 0, color: '#B4EC51'
    }, {
      offset: 1, color: '#45A31F'
    }],
    global: false
  },
  // =================
  // {
  //   text: '社保',
  //   type: 'linear',
  //   colorStops: [{
  //     offset: 0, color: '#FE639E'
  //   }, {
  //     offset: 1, color: '#9747F1'
  //   }],
  //   global: false
  // },
  // {
  //   text: '社保',
  //   type: 'linear',
  //   colorStops: [{
  //     offset: 0, color: '#67C6FD'
  //   }, {
  //     offset: 1, color: '#6A7CF2'
  //   }],
  //   global: false
  // }
]