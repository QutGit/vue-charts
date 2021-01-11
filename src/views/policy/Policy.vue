<template>
  <div class="policy">
    <div class="wrap">
      <div class="filter-content">
        <el-input class="i-search-input" placeholder="姓名/证件号码" size="small" v-model="qCon" >
          <img class="icon-search" slot="prefix" src="../../assets/search.png" alt="" />
        </el-input>
        <div class="datepicker">
          <span class="label text-s text-black">开始抵扣月</span>
          <Month class="start-month" type="input" v-model="startMonth" :placeholder="'开始日期'" @callback="startMonthChange" />
          <span class="line text-black">-</span>
          <Month class="end-month" type="input" v-model="endMonth" :placeholder="'结束日期'" @callback="endMonthChange" />
        </div>
        <button class="btn-search text-s text-white" @click="query">查 询</button>
        <div class="export" @click="exportExcel">
          <img src="../../assets/export.png" alt="">
          <span class="text-s text-black">导出</span>
        </div>
      </div>
      <div class="container">
        <el-table :data="list" stripe :header-cell-style="headStyle" :cell-style="cellStyle">
          <el-table-column align="center" prop="xm" label="姓名"></el-table-column>
          <el-table-column align="center" prop="sfzLx" label="证件类型"></el-table-column>
          <el-table-column align="center" prop="sfzHm" label="证件号码" width="160"></el-table-column>
          <el-table-column align="center" prop="jsy" label="抵扣月"></el-table-column>
          <el-table-column align="center" prop="znjy_je" label="累计子女教育"></el-table-column>
          <el-table-column align="center" prop="zfdk_je" label="累计住房贷款利息" width="140"></el-table-column>
          <el-table-column align="center" prop="zfzj_je" label="累计住房公积金"></el-table-column>
          <el-table-column align="center" prop="sylr_je" label="累计赡养老人"></el-table-column>
          <el-table-column align="center" prop="jxjy_je" label="累计继续教育"></el-table-column>
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
  </div>
</template>
<script>

import { leftPad } from "../../utils/filter";
import Month from '../../components/Month';
import { extExcel } from '../../utils/excel';
import { getZxdk } from "../../utils/apis";

export default {
  name: 'Policy',
  components: { Month },
  data: function(){
    return {
      startMonth: '',
      endMonth: '',
      qCon: '',
      sMonth: '',
      eMonth: '',
      headStyle: { height: '40px', background: '#F2F2F2', 'font-size': '12px', 'font-weight': '400', 'padding-left': '14px' },
      cellStyle: { height: '40px', 'font-size': '12px', 'padding-left': '14px', 'box-shadow': '0px -1px 0px 0px rgba(0,0,0,0.1);' },
      list: [],
      pageNumber: 1,
      totalSize: 0,
      pageSize: 20,
      total: 0
    }
  },
  mounted() {
    // 列表数据
    this.getZxdkList({pageSize: this.pageSize, pageNumber: this.pageNumber});
  },
  methods: {
    async getZxdkList(params){
      let result = await getZxdk(params);
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
      this.getZxdkList({qCon: this.qCon, startMonth, endMonth});
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
    },
    handleCurrentChange(page) {
      this.pageNumber = page;
      this.getZxdkList({pageSize: this.pageSize, pageNumber: page});
    },
    // 导出按钮
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 导出exal
    async exportExcel () {
      let startMonth = this.sMonth,endMonth = this.eMonth;
      if(startMonth && endMonth && startMonth > endMonth){
        return this.$message({ type: 'error', message: "开始时间不能大于结束时间" });
      }

      const tHeader = ['姓名', '证件类型', '证件号码', '抵扣月', '累计子女教育', '累计住房贷款利息', '累计住房公积金', '累计赡养老人', '累计继续教育'];
      const filterVal = ["xm","sfzLx","sfzHm","jsy","znjy_je","zfdk_je","zfzj_je","sylr_je","jxjy_je"];
      const filename = "专项扣减";
      
      this.$message({ type: 'success', message: "正在导出excel" });
      let result = await getZxdk({qCon: this.qCon, startMonth, endMonth});
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
<style lang="scss">
    .policy{
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