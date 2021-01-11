import { toThousands } from "../utils/filter";
// echarts图表配置参数
let hroextends = {
  title:{
    text:"按月在保人数",
    left: 0,
    textStyle: {
      color: "#333333",
      fontSize: 14
    },
    padding: [4,0,0,30],
    show: false
  },
  tooltip: {
    backgroundColor: "#fff",
    textStyle: {
      color: "#000"
    },
    padding: 16,
    extraCssText: 'box-shadow:0px 0px 10px 5px rgba(0,0,0,0.08);',
    formatter: function(params){
      let htmlStr = "";
      if(params.length === 1){
        htmlStr = `<p style="color: ${params[0].color}">${params[0].value[0]}&nbsp;&nbsp;${toThousands(params[0].value[1])}<p>`;
      } else {
        params.forEach((item) =>{
          htmlStr += `<p style="color: ${item.color}">${item.seriesName}&nbsp;&nbsp;${item.value || 0}<p>`;
        })
      }
      return htmlStr;
    },
  },
  legend: { // 图例样式
    x: 124,
    itemWidth: 8,
    itemHeight: 8,
    icon: 'circle',
    itemGap: 40
  },
  grid: {
    left: 80,
    width: '86%'
  },
  series: {
    barWidth: 10,
    smooth: false,
    symbolSize:6, //拐点圆的大小
  }
}

// 环形图相关设置
let ringSetting = {
  labelLine: {
    normal: {
      show: false
    }
  },
  radius: ['50%', '60%'],
  label: {
    normal: {
      show: false,
      position: 'center'
    },
    emphasis: { // 环形图内文字样式
      show: true,
      textStyle: {
        fontSize: '16',
        fontWeight: 'normal'
      },
      formatter: function(dt){
        return dt.name.split('|')[0];
      }
    }
  }
}
// 环形图相关设置
let ringExtends = {
  tooltip: {
    trigger: 'item',
    // formatter: "{a} <br/>{b}: {c} ({d}%)",
    formatter: function(object){
      let arr = object.name.split("|");
      return `<span style="color: ${object.color.scolor}">${arr[0]}<span>&nbsp;&nbsp;${object.value}(${arr[1]}%)`;
    },
    backgroundColor: "#fff",
    textStyle: {
      color: "#000"
    },
    padding: 16,
    extraCssText: 'box-shadow:0px 0px 10px 5px rgba(0,0,0,0.08);'
  },
  title:{
    text:"",
    left: 24,
    top: 16,
    textStyle: {
      color: "#333333",
      fontSize: 14,
      fontWeight: 400
    }
  },
  legend: { // 图例样式
    orient: 'vertical',
    x: '260',
    y: '70',
    itemWidth: 8,
    itemHeight: 8,
    icon: 'circle',
    textStyle: {　　　　　　　　　
      fontSize: 12,
      color: "#666666",
    },
    // itemGap: 30,
    // 图例文本格式化
    formatter: function (name) {
      let arr = name.split('|');
      let text = arr[0];
      let value = arr[1] + '%';
      if(arr[2] == 2){
        value = arr[1];
      }
      
      let str = '';
      if (text.length == 6) {
        str = text + "  " + value;;
      } else if (text.length == 5) {
        str = text + "    " + value;
      } else if (text.length == 4) {
        str = text + "        " + value;
      }else if(text.length == 3){
        str = text + "           " + value;
      }else if(text.length == 2){
        str = text + "              " + value;
      } else {
        str = text + value;
      }

      if(arr.length <= 1){
        str = "";
      }

      return str;
    }
  },
  series: {
    center: ['35%', '58%'],
    name: '',
    itemStyle: {
      normal: {
        // 设置环形图的阴影
        shadowBlur: 10,
        shadowColor: 'rgba(218,221,231,1)', 
        shadowOffsetX: 0,
        shadowOffsetY: 20
      }
    }
  }
}

export {
  hroextends,
  ringSetting,
  ringExtends
}