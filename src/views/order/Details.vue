<template>
  <div class="o-details">
    <Modal :title="title" @displayFn="displayModal">
      <div class="d-content">
        <div class="stuff">
          <div class="vender">
            <p class="text-remark text-m">员工基本信息</p>
          </div>
          <div class="s-infos">
            <div class="s-item">
              <ul>
                <li>
                  <span class="text-gray text-s">员工姓名</span>
                  <p class="text-black text-s">{{stuffEntity.gyXm}}</p>
                </li>
                <li>
                  <span class="text-gray text-s">联系电话</span>
                  <p class="text-black text-s">{{stuffEntity.phone}}</p>
                </li>
                <li>
                  <span class="text-gray text-s">客户名称</span>
                  <p class="text-black text-s">{{stuffEntity.khMc}}</p>
                </li>
                <li>
                  <span class="text-gray text-s">人员分类</span>
                  <p class="text-black text-s">{{filterMc(stuffEntity.htLx)}}</p>
                </li>
              </ul>
            </div>
            <div class="s-item">
              <ul>
                <li>
                  <span class="text-gray text-s">证件类别</span>
                  <p class="text-black text-s">{{stuffEntity.sfzLx}}</p>
                </li>
                <li>
                  <span class="text-gray text-s">证件号码</span>
                  <p class="text-black text-s">{{stuffEntity.sfzHm}}</p>
                </li>
                <li>
                  <span class="text-gray text-s">户籍性质</span>
                  <p class="text-black text-s">{{stuffEntity.hjXz}}</p>
                </li>
                <li>
                  <span class="text-gray text-s">实际工作地</span>
                  <p class="text-black text-s">{{stuffEntity.sjgzd}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="fund-info filter-content">
          <div class="vender">
            <p class="text-remark text-m">社保公积金信息</p>
            <div class="datepicker search">
              <span class="label text-s text-black">选择月份</span>
              <Month class="start-month" type="input" v-model="reportMonth" :placeholder="'选择月份'" @callback="monthChange" />
              <button class="btn-search" @click="query">查 询</button>
            </div>
          </div>
          <div class="fund-table">
            <el-table show-summary :summary-method="getSummaries" :data="fundList" stripe :header-cell-style="headStyle" :cell-style="cellStyle">
              <el-table-column align="center" prop="cpMc" label="险种" width="100px"></el-table-column>
              <el-table-column align="center" prop="qyJe" label="企业基数" width="90px"><template slot-scope="scope">{{ scope.row.qyJe | thounds }}</template></el-table-column>
              <el-table-column align="center" prop="grJs" label="个人基数" width="90px"><template slot-scope="scope">{{ scope.row.grJs | thounds }}</template></el-table-column>
              <el-table-column align="center" prop="qybl" label="企业比例"></el-table-column>
              <el-table-column align="center" prop="grbl" label="个人比例"></el-table-column>
              <el-table-column align="center" prop="qyJs" label="企业金额" width="90px"><template slot-scope="scope">{{ scope.row.qyJs | thounds }}</template></el-table-column>
              <el-table-column align="center" prop="grJe" label="个人金额" width="90px"><template slot-scope="scope">{{ scope.row.grJe | thounds }}</template></el-table-column>
              <el-table-column align="center" prop="je" label="总金额" width="90px"><template slot-scope="scope">{{ scope.row.je | thounds }}</template></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>

import Modal from "../../components/Modal";
import Month from '../../components/Month';
import { leftPad } from "../../utils/filter";
import { getSxgBase, getSxgCp } from "../../utils/apis";

export default {
  name: 'oDetails',
  components: { Modal, Month },
  props: {
    title: String,
    sxgId: String,
    htList: Array,
  },
  data: function(){
    return{
      headStyle: { height: '40px', background: '#F2F2F2', 'font-size': '12px', 'font-weight': '400', 'padding-left': '14px' },
      cellStyle: { height: '40px', 'font-size': '12px', 'padding-left': '14px', 'box-shadow': '0px -1px 0px 0px rgba(0,0,0,0.1);' },
      display: false,
      reportMonth: '',
      month: '',
      stuffEntity: {}, // 员工基本信息
      fundList: [], // 公积金信息
      startTime: '',
    }
  },
  mounted() {
    let date = new Date();
    this.reportMonth = `${date.getFullYear()}/${leftPad(date.getMonth()+1)}`;
    this.month = `${date.getFullYear()}${leftPad(date.getMonth()+1)}`;
    // 员工基本信息
    this.getSxgBaseEntity({sxgId: this.sxgId});
    // 社保公积金信息
    this.getSxgCpList({sxgId: this.sxgId, reportMonth: this.month});
  },
  methods: {
    // 员工基本信息
    async getSxgBaseEntity(params){
      let result = await getSxgBase(params);
      if(result.status == 1){
        this.stuffEntity = result.data;
      }
    },
    // 计算合计
    getSummaries(param){
      const { columns, data } = param;
      const sums = [];
      if(!columns.length && !data.length) return;
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        let values = data.map((item) =>{
          if(column.property == 'qyJs' || column.property == 'grJe' || column.property == 'je'){
            return Number(item[column.property]);
          }else{
            return 'NULL'
          }
        })
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = sums[index].toFixed(2);
        } else {
          sums[index] = '-';
        }
      });
      return sums;
    },
    async getSxgCpList(params){
      let result = await getSxgCp(params);
      if(result.status == 1){
        this.fundList = result.data;
      }
    },
    // 查询按钮
    query(){
      this.getSxgCpList({sxgId: this.sxgId, reportMonth: this.month});
    },
    // 隐藏显示modal 回调
    displayModal(visible){
      this.$emit('closeDetailsFn', visible);
    },
    // 月份控件
    monthChange(dateText, date){
      this.month = "";
      if(date.year && date.month){
        this.month = `${date.year}${date.month}`;
      }
    },
    filterMc(val){
      let str = "";
      this.htList && val && this.htList.forEach((item) => {
        if(item.htLx == val){
          str = item.htLxMc;
        }
      });
      return str;
    }
  }
}
</script>
<style lang="scss" scoped>
    .o-details{
      text-align: center;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      .d-content{
        .stuff{
          padding: 20px 24px;
          text-align: left;
          .s-infos{
            display: flex;
            padding: 10px 16px;
            border-bottom: 1px solid #DBDBDB;
            .s-item{
              &:last-child{
                margin-left: 140px;
              }
              ul{
                li{
                  line-height: 30px;
                  span{
                    text-align: right;
                    display: inline-block;
                    width: 60px;
                    margin-right: 10px;
                  }
                  p{
                    display: inline-block;
                  }
                }
              }
            }
          }
        }
        .fund-info{
          padding: 0 24px;
          .vender{
            text-align: left;
            display: flex;
            justify-content: space-around;
            p{
              width: 100%;
              line-height: 32px;
            }
            .search{
              text-align: right;
              width: 100%;
            }
          }
          .fund-table{
            margin-top: 20px;
          }
        }
      }
    }
</style>