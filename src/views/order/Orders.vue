<template>
  <div class="orders">
    <div class="wrap">
      <div class="filter-content">
        <el-input class="i-search-input" placeholder="姓名/证件号码/城市" size="small" v-model="qCon" >
          <img class="icon-search" slot="prefix" src="../../assets/search.png" alt="" />
        </el-input>
        <div class="s-option">
          <span class="label text-s text-black">人员分类</span>
          <el-select class="s-elselect" v-model="htLx" size="small" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in htLxList" :key="item.htLx" :label="item.htLxMc" :value="item.htLx"></el-option>
          </el-select>
        </div>
        <el-select class="datetype-select" v-model="dtType" size="small" placeholder="请选择类型">
          <el-option label="入职申报日期" value="1"></el-option>
          <el-option label="离职申报日期" value="2"></el-option>
        </el-select>
        <div class="date-picker">
          <el-date-picker class="picker" v-model="startDt" size="small" type="date" placeholder="开始时间"></el-date-picker>
          <span class="line text-black">-</span>
          <el-date-picker class="picker" v-model="endDt" size="small" type="date" placeholder="结束时间"></el-date-picker>
        </div>
        <button class="btn-search text-s text-white" @click="query">查 询</button>
        <div class="export" @click="exportExcel">
          <img src="../../assets/export.png" alt="">
          <span class="text-s text-black">导出</span>
        </div>
      </div>
      <div class="check-content">
        <span class="text-s text-remark">增减员状态：</span>
        <el-checkbox-group class="checks" v-model="checkTypes" @change="handleDtType">
          <el-checkbox label="1">增员中</el-checkbox>
          <el-checkbox label="2">在缴</el-checkbox>
          <el-checkbox label="3">减员中</el-checkbox>
          <el-checkbox label="4">停缴</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="check-content">
        <span class="text-s text-remark">变更状态：</span>
        <el-checkbox-group class="checks" v-model="checkStatus" @change="handleQType">
          <el-checkbox label="1">处理中</el-checkbox>
          <el-checkbox label="2">已完成</el-checkbox>
        </el-checkbox-group>
      </div>

      <!-- 表格内容 -->
      <div class="container">
        <el-table :data="list" stripe :header-cell-style="headStyle" :cell-style="cellStyle" id="out-table">
          <el-table-column align="center" prop="gyXm" label="姓名" width="80"></el-table-column>
          <el-table-column align="center" prop="sfzHm" label="证件号码" width="160"></el-table-column>
          <el-table-column align="center" prop="cs" label="参保城市"></el-table-column>
          <el-table-column align="center" prop="htLxMc" label="人员分类"></el-table-column>
          <el-table-column align="center" prop="hireDt" label="入职申报日期"></el-table-column>
          <el-table-column align="center" prop="sepDt" label="离职申报日期"></el-table-column>
          <el-table-column align="center" prop="sxgLxText" label="增减员状态"></el-table-column>
          <el-table-column align="center" prop="sxgZtText" label="变更状态"></el-table-column>
          <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click.native.prevent="orderDetails(scope.$index, scope.row)" type="text" size="small">查看详情</el-button>
              <el-button @click.native.prevent="contractDetails(scope.$index, scope.row)" type="text" size="small">劳动合同</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页组件 -->
      <div class="pagedevide">
        <el-pagination @current-change="handleCurrentChange" :current-page="pageNumber" :page-size="pageSize" :background="true"  layout="slot, prev, pager, next, jumper" :total="total" :hide-on-single-page="true">
          <div class="pagination-slot">
            <b>共</b>
            <span>{{totalSize}}</span>
            <b>页 /</b>
            <span>{{total}}</span>
            <b>条</b>
          </div>
        </el-pagination>
      </div>
    </div>

    <!-- 详情页面弹窗组件 -->
    <Details title="订单详情" :htList="htLxList" :sxgId="sxgId" v-if="orderDetailDisplay" @closeDetailsFn="closeDetails" ></Details>
    <Contract :title="contractTitle" :stuffName="stuffName" :sxgId="sxgId" v-if="contractDetailDisplay" @closeContractFn="closeContract" ></Contract>
  </div>
</template>
<script>

import Details from "./Details";
import Contract from "./Contract";
import Search from "../../components/Search";
import Filter from '../../utils/filter';
import { extExcel } from '../../utils/excel';
import { mapGetters } from "vuex";
import store from "../../store/index";
import { getDhtLx, getSxg } from "../../utils/apis";



export default {
  name: 'Orders',
  components: { Details, Contract },
  data: function(){
    return {
      startDt: '',
      endDt: '',
      qCon: '',
      contractTitle: "劳动合同详情",
      stuffName: '',
      sxgId: 0, // 订单ID
      headStyle: { height: '40px', background: '#F2F2F2', 'font-size': '12px', 'font-weight': '400', 'padding-left': '14px' },
      cellStyle: { height: '40px', 'font-size': '12px', 'padding-left': '14px', 'box-shadow': '0px -1px 0px 0px rgba(0,0,0,0.1);' },
      list: [], // 列表内容
      htLx: "", // 人员分类
      htLxList: [],
      dtType: "1", // 日期类型拉卡框
      total: 0,
      pageSize: 20,
      pageNumber: 1,
      totalSize: 0,
      orderDetailDisplay: false,
      contractDetailDisplay: false,
      checkTypes: [], // 订单类型
      checkStatus: [], // 状态类型
      loading: false,
      zzMonth: '',
    }
  },
  computed: {
    ...mapGetters(["checkDtype", "checkQtype", "checkMonth"])
  },
  mounted() {
    // if(this.checkDtype){
    //   this.checkTypes = this.checkDtype.split(",");
    // }
    if(this.checkMonth && this.checkDtype){
      this.zzMonth = this.checkMonth.year.toString() + this.checkMonth.month;
    }
    if(this.checkQtype){
      this.dtType = this.checkQtype;
      let date = this.checkMonth;
      this.startDt = new Date(date.year, Number(date.month) - 1, '1');
      this.endDt = new Date(date.year, date.month, 0);
    }
    
    // 人员分类列表
    this.getDhtLxList();
    // 订单列表
    this.query();
  },
  methods: {
    async getDhtLxList(){
      let result = await getDhtLx();
      if(result.status == 1){
        this.htLxList = result.data;
      }
    },
    async getSxgList(params){
      let result = await getSxg(params);
      if(result.status == 1){
        let list = result.data;
        let orderType = {1: '增员中', 2: '在缴', 3: '减员中', 4: '停缴'};
        let orderStatus = {1: '处理中', 2: '已完成'};
        list.forEach((item) =>{
          item.sxgLxText = orderType[item.sxgLx];
          item.sxgZtText = orderStatus[item.sxgZt];
        })
        this.list = list;
        this.total = result.total;
        this.totalSize = Math.ceil(this.total / this.pageSize);
      }
    },
    // 列表查询 按钮
    query(){
      let { qCon, htLx, startDt, endDt, dtType,zzMonth } = this;
      if(startDt && endDt && (startDt.getTime() > endDt.getTime())){
        return this.$message({ type: 'error', message: "开始时间不能大于结束时间" });
      }
      startDt = startDt && Filter.date(startDt, 'yyyyMMdd');
      endDt = endDt && Filter.date(endDt, 'yyyyMMdd');
      let pageSize = this.pageSize;
      let pageNumber = 1;
      this.pageNumber = pageNumber;
      this.getSxgList({sxgCon:{qCon, htLx, startDt, endDt, zzMonth ,dtType, qType: this.checkTypes.join(','), qStatus: this.checkStatus.join(',') },pageSize, pageNumber});
    },
    // 分页事件
    handleCurrentChange(pageNumber) {
      this.pageNumber = pageNumber;
      let pageSize = this.pageSize;
      let { qCon, htLx, startDt, endDt, dtType, zzMonth } = this;
      if(startDt && endDt && (startDt.getTime() > endDt.getTime())){
        return this.$message({ type: 'error', message: "开始时间不能大于结束时间" });
      }
      startDt = startDt && Filter.date(startDt, 'yyyyMMdd');
      endDt = endDt && Filter.date(endDt, 'yyyyMMdd');
      this.getSxgList({sxgCon:{qCon, htLx, startDt, endDt, dtType, qType: this.checkTypes.join(','), qStatus: this.checkStatus.join(','), zzMonth },pageSize, pageNumber});
    },
    // 显示 订单详情
    orderDetails(index, data){
      this.sxgId = data.sxgId;
      this.orderDetailDisplay = true;
    },
    // 隐藏 订单详情
    closeDetails(visible){
      this.orderDetailDisplay = visible;
    },
    // 显示 劳动合同详情
    contractDetails(index, data){
      this.sxgId = data.sxgId;
      this.stuffName = data.gyXm;
      this.contractTitle = `${data.gyXm}-个人劳动合同详情页`;
      this.contractDetailDisplay = true;
    },
    // 隐藏 劳动合同详情
    closeContract(visible){
      this.contractDetailDisplay = visible;
    },
    // 增减员状态
    handleDtType(value){
      this.checkTypes = value;
      store.dispatch("common/setDtType", value.join(','));
    },
    // 变更状态
    handleQType(value){
      this.checkStatus = value;
      store.dispatch("common/setQtype", value.join(','));
    },
    formatJson(filterVal, jsonData) {
      let orderType = {1: '增员中', 2: '在缴', 3: '减员中', 4: '停缴'};
      let orderStatus = {1: '处理中', 2: '已完成'};
      return jsonData.map(v => {
        return filterVal.map(j => {
          if(j == 'sxgLx') return orderType[v[j]];
          if(j == 'sxgZt') return orderStatus[v[j]];
          return v[j];
        })
      })
    },
    // 导出exal
    async exportExcel () {
      let { qCon, htLx, startDt, endDt, dtType } = this;
      if(startDt && endDt && (startDt.getTime() > endDt.getTime())){
        return this.$message({ type: 'error', message: "开始时间不能大于结束时间" });
      }
      startDt = startDt && Filter.date(startDt, 'yyyyMMdd');
      endDt = endDt && Filter.date(endDt, 'yyyyMMdd');

      const tHeader = ['订单ID', '姓名', '证件号码', '参保城市', '人员分类', '入职申报日期', '离职申报日期', '增减员状态', '变更状态'];
      const filterVal = ["sxgId","gyXm","sfzHm","cs","htLxMc","hireDt","sepDt","sxgLx","sxgZt"];
      const filename = "订单管理";

      this.$message({ type: 'success', message: "正在导出excel" });
      // 列表接口请求
      let result = await getSxg({sxgCon:{qCon, htLx, startDt, endDt, dtType, qType: this.checkTypes.join(','), qStatus: this.checkStatus.join(',') }});
      if(result.status == 1){
        let list = result.data;
        const data = this.formatJson(filterVal, list);
        extExcel(tHeader,data, filename);
      }else{
        this.$message({ type: 'error', message: "数据加载失败" });
      }
    }
  },
}
</script>
<style lang="scss" scoped>
    .orders{
      width: 100%;
      min-height: calc(100vh - 72px);
      margin-top: 72px;
      .wrap{
        width: 100%;
        position: relative;
        .display{
          display: block;
        }
      }
    }
</style>