<template>
<div @click.stop="panelClick" class="vue-datepicker">
  <div class="date-select" @click="startChoice" v-if="type !== 'input'">
    <input type="text" readonly="readonly" class="month-input text-black text-m" :value="monthShortText" :placeholder="placeholder" @focus="startChoice" @click="startChoice" />
    <img class="select-icon" src="../assets/down.png" alt="">
  </div>
  <div class="date-input" @click="startChoice" v-if="type === 'input'">
    <input type="text" readonly="readonly" class="text-black text-s" :value="monthShortText" :placeholder="placeholder" @focus="startChoice" @click="startChoice" />
    <img class="date-icon" src="../assets/date.png" alt="">
    <i class="el-input__icon el-icon-circle-close" v-if="monthShortText" @click="clear"></i>
  </div>
  <div class="vue-datepicker-panels" v-show="monthPanelIsShow">
    <!--年月选择-->
    <div class="vue-datepicker-panel" v-show="monthPanelIsShow">
      <div class="vue-datepicker-month">
        <a @click="prevYear"><img src="../assets/left.png" alt=""></a>
        <span class="text-gray text-m">{{ year }}年</span>
        <a @click="nextYear"><img src="../assets/right.png" alt=""></a>
      </div>
      <table class="vue-datepicker-tb2">
        <col width="33%" />
        <col width="33%" />
        <col width="33%" />
        <tbody>
          <tr v-for="(season,idx) in monthArr" :key="idx">
            <td v-for="(m,mIndex) in season" :key="mIndex" @click="choiceMonth(m.id, $event)" :class="classMonth(m.id)">
              <span>{{ m.name }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import { leftPad } from '../utils/filter';
export default {
  props: {
    value: {
      type: String,
      default: '',
      twoWay: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    defaultDate: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    callback: {
      type: Function
    }
  },
  data() {
    let dateVal = new Date();
    if (this.defaultDate) {
      dateVal = new Date(this.defaultDate.replace(/-/g, "/"));
    } 
    return {
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      year: dateVal.getFullYear(),
      month: dateVal.getMonth()+1,
      monthPanelIsShow: false,
      monthShortValue: "",
      monthShortText: "",
    };
  },
  watch:{
    value(val){
      if(!!val){
        let time = new Date(val);
        this.monthShortValue = this.dateTimeFormat(time.getFullYear(),time.getMonth()+1);
        this.monthShortText = this.dateTextFormat(time.getFullYear(),leftPad(time.getMonth()+1));
        this.year = time.getFullYear();
        this.month = time.getMonth()+1;
      }
    }
  },
  mounted: function() {
    // 点击其他关闭选择框
    let that = this;
    document.body.addEventListener("click",function(){
      that.immEndChoice();
    });
  },
  computed: {
    // 组装月控件数据，二位数组
    monthArr() {
      let months = this.months, res = [];
      for (let i = 0; i <= 3; i++) {
        let temp = [];
        for (let j = 1; j <= 3; j++) {
          let id = i * 3 + j - 1;
          temp.push({ id, name: months[id] });
        }
        res.push(temp);
      }
      return res;
    },
    // 当前日期
    curr() {
      let year = "", month = "";
      let dateVal = new Date();
      if (this.value) {
        dateVal = new Date(this.value.replace(/-/g, "/"));
      }
      year = dateVal.getFullYear();
      month = dateVal.getMonth()+1;
      return { year, month };
    }
  },
  methods: {
    //点击文本框弹出日期选择
    startChoice(e) {
      if (e && e.type == 'keypress') {
        e.returnValue = false;
      }
      this.monthPanelIsShow = true;
      e.stopPropagation();
    },
    choiceMonth(m,event) {
      this.month = m+1;
      this.monthShortText = this.dateTextFormat(this.year, leftPad(this.month));
      this.monthShortValue = this.dateTimeFormat(this.year, this.month);
      this.$emit('callback',this.monthShortText, {year: this.year, month: leftPad(this.month)});
      this.immEndChoice();
    },
    // 清空月份
    clear(e){
      this.monthShortText = "";
      this.monthShortValue = "";
      this.$emit('callback',this.monthShortText, {year: "", month: ""});
      e.stopPropagation();
    },
    // 点击面板
    panelClick: function(e) {
      // 阻止冒泡
      this.monthPanelIsShow = false;
      e.stopPropagation();
    },
    // 选中样式
    classMonth(m) {
      let { month, year, curr } = this;
      return { 'z-on': this.monthShortValue == `${year}-${m + 1}` };
    },
    //前一年
    prevYear(e) {
      this.year--;
      e.stopPropagation();
    },
    //后一年
    nextYear(e) {
      this.year++;
      e.stopPropagation();
    },
    //立即关闭日期面板
    immEndChoice() {
      this.monthPanelIsShow = false;
    },
    //日期时间格式化输出
    dateTimeFormat:function(y, M) {
      return `${y}-${M}`;
    },
    dateTextFormat:function(y, M) {
      return `${y}年${M}月`;
    }
  }
}

</script>

<style scoped lang="scss">
@keyframes vueDatePicker {
  0% {
    opacity: 0;
    transform: translate(0, -10%) ;
  }
  100% {
    opacity: 1;
    transform: translate(0) ;
  }
}

.vue-datepicker {
  position: relative;
  width: 100%;
  cursor: pointer;
  .date-select{
    width: 100%;
    height: 100%;
    line-height: 32px;
    margin-bottom: 10px;
    cursor: pointer;
    position: relative;
    .month-input{
      // padding: 4px 0 16px;
      padding: 0;
      font-weight: 600;
      letter-spacing: 0.5px;
      border: none;
      width: 100%;
      height: 100%;
      cursor: pointer;
      background:rgba(247,247,247,1);
    }
    .select-icon{
      position: absolute;
      right: 20px;
      top: 6px;
      width: 20px;
      height: 20px;
    }
  }
  .date-input{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
    &:hover .el-icon-circle-close{
      display: inline-block;
    }
    .el-icon-circle-close{
      display: none;
      position: absolute;
      top: 0;
      right: 4px;
      z-index: 10;
      line-height: 32px;
    }
    input{
      border:1px solid rgba(230,230,230,1);
      border-radius:2px;
      width: 100%;
      height: 100%;
      padding: 5px 10px;
      padding-left: 30px;
      background:rgba(247,247,247,1);
      &:focus{
        border: 1px solid #5362C8;
        transition: 0.5s;
      }
    }
    .date-icon{
      width: 16px;
      height: 16px;
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
    }
  }
  .vue-datepicker-panels {
    position: absolute;
    z-index: 1998;
    left: 0;
    top: 40px;
    background-color: $white;
    width: 160px;
    height:166px;
    box-shadow:0px 0px 20px 0px rgba(0,0,0,0.07);
    padding: 10px 6px;
    animation: vueDatePicker 0.1s ease-out;
    .vue-datepicker-panel{
      .vue-datepicker-month {
        padding-bottom: 4px;
        line-height: 20px;
        width: 100%;
        overflow: hidden;
        text-align: center;
        display: flex;
        justify-content: space-around;
        >a {
          width: 20px;
          cursor: pointer;
          vertical-align: middle;
          >img{
            width: 100%;
          }
        }
        >span{
          width: 100%;
          vertical-align: middle;
        }
      }
      .vue-datepicker-tb2 {
        width: 100%;
        border-collapse: collapse;
        text-align: center;
        margin-top: 10px;
        tbody{
          tr{
            td{
              line-height: 26px;
              font-size: 12px;
              cursor: pointer;
              &:hover{
                background: #eee;
              }
              & >span{
                display: inline-block;
                width: 100%;
                height: 100%;
              }
              &.z-on{
                color: #6A7CF2;
              }
            }
          }
        }
      }
    }
  }
}

</style>
