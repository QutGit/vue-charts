<template>
  <div class="statement">
    <div class="wrap">
      <div class="filter-content">
        <div class="s-option">
          <span class="label text-s text-black">账单模板名称</span>
          <el-select class="s-elselect" v-model="zdmbId" size="small" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in billList" :key="item.zdmbId" :label="item.zdmbMc" :value="item.zdmbId"></el-option>
          </el-select>
        </div>
        <div class="datepicker"> 
          <span class="label text-s text-black">账单月份</span>
          <Month class="start-month" type="input" v-model="startMonth" :placeholder="'开始日期'" @callback="startMonthChange" />
          <span class="line text-black">-</span>
          <Month class="end-month" type="input" v-model="endMonth" :placeholder="'结束日期'" @callback="endMonthChange" />
        </div>
        <button class="btn-search text-s text-white" @click="query">查 询</button>
      </div>
      <div class="container">
        <el-table :data="list" stripe :header-cell-style="headStyle" :cell-style="cellStyle">
          <el-table-column align="center" prop="zdmbMc" label="账单模板名称"></el-table-column>
          <el-table-column align="center" prop="ysNy" label="账单月份"></el-table-column>
          <el-table-column align="center" label="账单应收金额"><template slot-scope="scope">{{ scope.row.ysJe | thounds }}</template></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="showDetails(scope.$index, scope.row)" type="text" size="small">查看详情</el-button>
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
    <Details title="对账单详情页" :statementId="ysId" v-if="detailsDisplay" @closeDetailsFn="closeDetails" ></Details>
  </div>
</template>
<script>

import Details from "./Details";
import Month from '../../components/Month';
import { mapGetters } from "vuex";
import store from "../../store/index";
import { leftPad } from "../../utils/filter";
import { getZdmb, getYs } from "../../utils/apis";

export default {
  name: 'Statement',
  components: { Details, Month },
  data: function(){
    return {
      detailsDisplay: false,
      startMonth: '',
      endMonth: '',
      sMonth: '',
      eMonth: '',
      ysId: '', // 对账单列表ID
      headStyle: { height: '40px', background: '#F2F2F2', 'font-size': '12px', 'font-weight': '400', 'padding-left': '14px' },
      cellStyle: { height: '40px', 'font-size': '12px', 'padding-left': '14px', 'box-shadow': '0px -1px 0px 0px rgba(0,0,0,0.1);' },
      billList: [], // 账单模板列表
      zdmbId: '',
      list: [],
      pageNumber: 1,
      total: 0,
      totalSize: 0,
      pageSize: 20
    }
  },
  computed: {
    ...mapGetters(["checkMonthS"])
  },
  mounted() {
    if(this.checkMonthS){
      let date = this.checkMonthS;
      this.sMonth = `${date.year}${date.month}`;
      this.eMonth = `${date.year}${date.month}`;
      this.startMonth = `${date.year}-${date.month}`;
      this.endMonth = `${date.year}-${date.month}`;
    }
    // 账单模版名称
    this.getZdmbList();
    // 对账单列表
    this.getList({pageSize: this.pageSize, pageNumber: this.pageNumber,startMonth: this.sMonth, endMonth: this.eMonth});
  },
  methods: {
    async getZdmbList(){
      let result = await getZdmb();
      if(result.status == 1){
        this.billList = result.data;
      }
    },
    async getList(params){
      let result = await getYs(params);
      if(result.status == 1){
        this.list = result.data;
        this.total = result.total;
        this.totalSize = Math.ceil(this.total / this.pageSize);
      }
    },
    // 查询 按钮
    query(){
      let startMonth = this.sMonth,endMonth = this.eMonth;
      if(startMonth && endMonth && startMonth > endMonth){
        return this.$message({ type: 'error', message: "开始时间不能大于结束时间" });
      }
      this.getList({zdmbId: this.zdmbId, startMonth, endMonth});
    },
    handleCurrentChange(page) {
      this.pageNumber = page;
      this.getList({pageSize: this.pageSize, pageNumber: page});
    },
    // 显示 对账单详情
    showDetails(index, data){
      this.detailsDisplay = true;
      this.ysId = data.ysId;
    },
    // 关闭 对账单详情
    closeDetails(visible){
      this.detailsDisplay = visible;
    },
    // 开始时间 选择监听
    startMonthChange(dateText, date){
      this.sMonth = "";
      if(date.year && date.month){
        this.sMonth = `${date.year}${date.month}`;
      }
    },
    // 结束时间 选择监听
    endMonthChange(dateText, date){
      this.eMonth = "";
      if(date.year && date.month){
        this.eMonth = `${date.year}${date.month}`;
      }
    }
  },
}
</script>
<style lang="scss" scoped>
    .statement{
      width: 800px;
      // min-height: calc(100vh - 72px);
      min-height: 300px;
      margin: 72px auto;
      height: 100%;
      .wrap{
        width: 100%;
        height: 100%;
        position: relative;
        .display{
          display: block;
        }
      }
    }
</style>