<template>
  <div class="home">
    <div class="wrap">
      <div class="content">
        <div class="month-s">
          <Month type="month" v-model="searchMonth" :defaultDate="searchMonth" @callback="monthChange" />
        </div> 
        <div class="c-top">
          <div class="c-cards">
            <div class="cards">
              <div class="c-item" @click="skipPage('orders','dtType', '100')">
                <p class="text-s">{{dateEntity.month}}月在职人数</p>
                <h1 class="text-xxxl">{{empCountEntity.onEmp || 0}}<span class="text-m">人</span></h1>
              </div>
              <div class="c-item" @click="skipPage('orders','qType', '1')">
                <p class="text-s">{{dateEntity.month}}月增员人数</p>
                <h1 class="text-xxxl">{{empCountEntity.addEmp || 0}}<span class="text-m">人</span></h1>
              </div>
            </div>
            <div class="cards">
              <div class="c-item" @click="skipPage('orders','qType', '2')">
                <p class="text-s">{{dateEntity.month}}月减员人数</p>
                <h1 class="text-xxxl">{{empCountEntity.offEmp || 0}}<span class="text-m">人</span></h1>
              </div>
              <div class="c-item" @click="skipPage('statement', 'statement', '')">
                <p class="text-s">{{latestYsEntity&&latestYsEntity.ysNy&&latestYsEntity.ysNy.substr(4)}}月已出账单</p>
                <h1 class="text-xxxl">{{latestYsEntity&&latestYsEntity.ysJe|thounds}}<span class="text-m">元</span></h1>
              </div>
            </div>
          </div>
          <div class="c-ring">
            <ve-ring :data="ringCharts" height="280px" :colors="colors" :settings="ringSetting" :extend="ringExtends"></ve-ring>
            <div class="c-select">
              <div class="s-text" @click="ringShow()">
                <span class="text-s">{{ringText}}</span>
                <img src="../../assets/right.png" :class="{'r-show': showRingSelect}" alt="">
              </div>
              <div class="s-options" v-show="showRingSelect">
                <div class="option text-s" @click="ringSelect(1)">按成本占比</div>
                <div class="option text-s" @click="ringSelect(2)">按金额（万元）</div>
              </div>
            </div>
          </div>
        </div> 
        <div class="charts">
          <span class="text-black text-m c-title">按月账单金额</span>
          <ve-line width="100%" height="370px" :colors="ysColors" :data="chartData" :extend="hroextends" theme-name="hro-echarts"></ve-line>
        </div>
        <div class="charts">
          <span class="text-black text-m c-title">按月在保人数</span>
          <ve-histogram :colors="togramColors" height="370px" :data="charts" :settings="chartSettings" :extend="hroextends" theme-name="hro-echarts"></ve-histogram>
        </div>
      </div>
      <div class="sidebar">
        <div class="s-top">
          <div class="title">
            <h1 class="text-m text-black">服务信息</h1>
          </div>
          <div class="service">
            <ul>
              <li v-if="zrkfEntity&&zrkfEntity.kfXm">
                <span class="text-gray text-s">责任客服</span>
                <p class="text-black text-s">{{zrkfEntity.kfXm}}</p>
              </li>
              <li v-if="zrkfEntity&&zrkfEntity.kfDh">
                <span class="text-gray text-s">联系电话</span>
                <p class="text-black text-s">{{zrkfEntity.kfDh}}</p>
              </li>
              <li v-if="zrkfEntity&&zrkfEntity.kfEmail">
                <span class="text-gray text-s">邮箱地址</span>
                <p class="text-black text-s">{{zrkfEntity.kfEmail}}</p>
              </li>
              <li v-if="zrkfEntity&&zrkfEntity.kfDz">
                <span class="text-gray text-s">地址</span>
                <p class="mh text-black text-s">{{zrkfEntity.kfDz}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="s-bottom">
          <div class="title">
            <h1 class="text-m text-black">社保信息</h1>
          </div>
          <div class="s-content" v-if="sbjdList.length == 0">
            <div class="vender">
              <p class="text-s text-gray">暂无数据</p>
            </div>
          </div>
          <div class="s-content" v-if="sbjdList.length > 0">
            <div class="vender">
              <p class="text-s text-gray">以下城市增减员时间小于5天</p>
            </div>
            <div class="policys" v-for="(item,index) in sbjdList" :key="index">
              <h2 class="text-black text-s">{{item.csMc}}</h2>
              <div class="item" v-for="(c,cIdx) in item.sbArr" :key="cIdx">
                <p class="text-s text-black">{{c}}</p>
                <a class="text-s text-gray">每月{{item.jd}}号</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store/index";
import colors from "../../support/colors";
import { hroextends,ringSetting, ringExtends } from "../../support/echarts-config";
import '@/support/echarts-theme';
import { getZrkf, getSbjd, getOnEmpCount, getLatestYs, getYsByMonths, getOnEmpByMonths } from "../../utils/apis";
import Month from '../../components/Month';
import { leftPad,toThousands } from '../../utils/filter';

export default {
  name: "home",
  components: { Month },
  data: function() {
    this.chartSettings = {
      showLine: ['在保人数'],
      axisSite: { right: ['在保人数'] },
      // yAxisName: ['按月在保人数', '在保人数'],
    }
    this.hroextends = hroextends;
    this.ringSetting = ringSetting;
    this.ringExtends = ringExtends;
    this.colors = colors;
    this.ysColors = ["#6A7CF2"];
    this.togramColors = ["#7889F3", "#FFD657", "#95D14C"];

    return {
      zrkfEntity: {},
      sbjdList: [],
      empCountEntity: {},
      latestYsEntity: {},
      searchMonth: '',
      dateEntity: {},
      ysMonthList: [],
      empMonthList: [],
      showRingSelect: false,
      ringType: 1,
      ringText: '按成本占比',
      chartData: {
        columns: ['日期', '账单金额'],
        rows: []
      },
      charts: {
        columns: ['日期', '增员人数', '减员人数', '在保人数'],
        rows: []
      },
      ringCharts: {
        columns: ['cpMc', 'cpJe'],
        rows: []
      },
      value: ''
    };
  },
  computed: {
    
  },
  mounted() {
    let date = new Date();
    this.searchMonth = `${date.getFullYear()}-${leftPad(date.getMonth() + 1)}`;
    this.dateEntity = {year: date.getFullYear(), month: leftPad(date.getMonth() + 1)};
    let dateParam = `${date.getFullYear()}${leftPad(date.getMonth() + 1)}`;
    // 服务信息 责任客服信息
    this.getZrkfData();
    // 社保信息 列表
    this.getSbjdData();
    // 获取在保人数，增员人数，减员人数数据
    this.getOnEmpCountEntity({reportMonth: dateParam});
    // 根据选择月份获取就近已出账单
    this.getLatestYsData({reportMonth: dateParam});
    // 按月账单金额折线图数据
    this.getYsByMonthsList({startMonth: `${date.getFullYear()}01`, endMonth: dateParam});
    // 按月在保人数 增员人数，减员人数，在保人数
    this.getOnEmpByMonthsList({startMonth: `${date.getFullYear()}01`, endMonth: dateParam});
  },
  methods: {
    async getZrkfData(){
      let result = await getZrkf();
      if(result.status == 1){
        this.zrkfEntity = result.data;
      }else{
        this.$message({ type: 'error', message: result.msg });
      }
    },
    async getSbjdData(){
      let result = await getSbjd();
      if(result.status == 1){
        this.sbjdList = result.data;
      }
    },
    async getOnEmpCountEntity(params){
      let result = await getOnEmpCount(params);
      if(result.status == 1){
        this.empCountEntity = result.data;
      }
    },
    async getLatestYsData(params){
      let result = await getLatestYs(params);
      if(result.status == 1){
        this.latestYsEntity = result.data;
        let ringType = this.ringType;
        let mxList = result.data && result.data.mxList ?  result.data.mxList : [];
        // 计算图表比例
        mxList&&mxList.forEach((item) =>{
          if(ringType == 2){
            item.percent = (Number(item.cpJe/10000)).toFixed(2);
            item.cpMc = item.cpMc + '|' + item.percent + '|' + '2';
          }else{
            item.percent = (Number(item.cpJe/result.data.ysJe) * 100).toFixed(2);
            item.cpMc = item.cpMc + '|' + item.percent + '|' + '1';
          }
        })
        this.ringCharts.rows = mxList;
        if(this.latestYsEntity&&this.latestYsEntity.ysNy){
          this.ringExtends.title.text = `${this.latestYsEntity.ysNy.substr(4)}月已出账单分类`;
        }
      }
    },
    async getYsByMonthsList(params){
      let result = await getYsByMonths(params);
      if(result.status == 1){
        let list = result.data;
        this.ysMonthList = list;
        
        let rows = [];
        list&&list.forEach((item) =>{
          if(item.ysNy){
            let chart = { '日期': item.ysNy, '账单金额': item.ysJe };
            rows.push(chart);
          }
        })
        // 图表数据填充
        this.chartData.rows = rows;
      }
    },
    async getOnEmpByMonthsList(params){
      let result = await getOnEmpByMonths(params);
      if(result.status == 1){
        let list = result.data;
        this.empMonthList = list;
        let rows = [];
        list.forEach((item) =>{
          let chart = { '日期': item.reportMonth, '增员人数': item.addEmp || 0, '减员人数': item.offEmp || 0, '在保人数': item.onEmp };
          rows.push(chart);
        })
        this.charts.rows = rows;
      }
    },
    // 页面跳转
    skipPage(pType, type, state){
      if(type && type == 'dtType'){
        store.dispatch("common/setDtType", state);
      } else {
        store.dispatch("common/setDtType", "");
      }

      if(type && type == 'qType'){
        store.dispatch("common/setQtype", state);
      } else {
        store.dispatch("common/setQtype", "");
      }

      if(type && (type == 'qType' || type == 'dtType')){
        store.dispatch("common/setMonth", this.dateEntity);
      }else{
        store.dispatch("common/setMonth", "");
      }

      if(type && type == 'statement'){
        let m = this.latestYsEntity;
        let date = null;
        if(m && m.ysNy){
          date = {
            year: m.ysNy.substr(0,4),
            month: m.ysNy.substr(4)
          }
        }
        store.dispatch("common/setMonthS", date);
      } else {
        store.dispatch("common/setMonthS", "");
      }
      
      this.$router.push(`/${pType}`);
    },
    // 月份选择监听
    monthChange(dateText, date){
      this.dateEntity = date;
      this.getOnEmpCountEntity({reportMonth: `${date.year}${date.month}`});
      this.getLatestYsData({reportMonth: `${date.year}${date.month}`});
    },
    // 补零方法
    leftPad(num){
      return num < 10 ? `0${num}` : num;
    },
    // 环形图类型选择展示
    ringShow(){
      this.showRingSelect = !this.showRingSelect;
    },
    // 环形图类型选择
    ringSelect(t){
      this.ringType = t;
      this.showRingSelect = false;
      let date = this.dateEntity;
      if(t == 1){
        this.ringText = '按成本占比';
      }else{
        this.ringText = '按金额（万元）';
      }
      this.getLatestYsData({reportMonth: `${date.year}${date.month}`});
    },
  }
};
</script>
<style lang="scss">
.home {
  background: #f5f5f5;
  height: 100%;
  padding: 0 24px 24px;
  .wrap {
    display: flex;
    // height: 100%;
    margin-top: 80px;
    .content{
      width: 100%;
      min-height: 400px;
      margin-right: 20px;
      position: relative;
      .c-filter{
        padding: 4px 0 16px;
        display: inline-block;
        >img{
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
        >span{
          vertical-align: middle;
          font-weight: 600;
        }
      }
      .month-s{
        display: inline-block;
        width: 120px;
      }
      .c-top{
        display: flex;
        .c-cards{
          width: 100%;
          flex: 1;
          .cards{
            display: flex;
            &:not(:first-child){
              margin-top: 20px;
            }
            .c-item{
              color: #333333;
              flex: 1;
              width: 100%;
              padding: 16px 20px;
              height: 130px;
              background: #FDFDFD;
              border-radius:4px;
              cursor: pointer;
              &:not(:first-child){
                margin-left: 20px;
              }
              &:hover{
                color: #FEFEFE;
                background:linear-gradient(317deg,rgba(126,147,255,1) 0%,rgba(106,124,242,1) 100%);
                box-shadow:0px 0px 15px 0px rgba(83,98,200,0.54);
                opacity:.97;
                transition: box-shadow .2s ease-in-out;
              }
              h1{
                // line-height: 54px;
                line-height: 1.2;
                margin-top: 10px;
                >span{
                  margin-left: 4px;
                }
              }
            }
          }
        }
        .c-ring{
          width: 420px;
          height: 280px;
          margin-left: 20px;
          background: #FEFEFE;
          position: relative;
          .c-select{
            position: absolute;
            top: 16px;
            right: 30px;
            .s-text{
              cursor: pointer;
              span{
                color: #666666;
              }
              img{
                width: 9px;
                transform: rotate(90deg);
                margin-left: 10px;
              }
              .r-show{
                transform: rotate(-90deg);
              }
            }
            .s-options{
              position: absolute;
              top: 30px;
              left: 0;
              z-index: 200;
              background: #ffffff;
              width: 120px;
              box-shadow: 0 0 20px 0 rgba(0,0,0,.07);
              padding: 10px 0;
              .option{
                color: #666666;
                line-height: 24px;
                padding-left: 6px;
                cursor: pointer;
                &:hover{
                  background: #eeeeee;
                }
              }
            }
          }
        }
      }
      .charts{
        margin-top: 20px;
        background: #FEFEFE;
        padding: 20px;
        position: relative;
        .c-title{
          position: absolute;
          top: 20px;
          left: 40px;
          z-index: 1000;
          &::after{
            content: " ";
            position: absolute;
            top: 3px;
            left: -8px;
            width: 3px;
            height: 14px;
            background: #6A7CF2;
          }
        }
      }
    }
    .sidebar{
      min-height: 400px;
      height: 100%;
      width: 360px;
      .title{
        padding: 0 20px 10px 28px;
        h1{
          font-weight: 600;
          position: relative;
          &::after{
            content: ' ';
            width: 3px;
            height: 14px;
            background: #6A7CF2;
            position: absolute;
            left: -8px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
      .s-top{
        background: $white;
        padding-top: 20px;
        .service{
          padding: 0 30px 10px;
          ul{
            width: 100%;
            li{
              width: 100%;
              display: flex;
              text-align: left;
              line-height: 24px;
              span{
                display: inline-block;
                width: 66px;
              }
              p{
                width: 100%;
                margin-left: 10px;
              }
              .mh{
                min-height: 50px;
              }
            }
          }
        }
      }
      .s-bottom{
        background: $white;
        margin-top: 20px;
        max-height: 980px;
        height: 100%;
        overflow-y: auto;
        padding-top: 20px;
        .s-content{
          padding: 0 30px 10px;
          height: 100%;
          .policys{
            h2{
              font-weight: 600;
              margin: 10px 0 6px;
            }
            &:not(:last-child){
              padding-bottom: 10px;
              border-bottom: 1px solid #DBDBDB;
            }
            .item{
              display: flex;
              line-height: 30px;
              p{
                flex-grow: 1;
              }
              a:hover{
                text-decoration: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
