<template>
  <div class="messages">
    <div class="breadcase text-s">
      <router-link to="/">返回</router-link>
    </div>
    <div class="content">
      <div class="title">
        <h1 class="text-m text-black">消息中心<span>3</span></h1>
        <span class="text-remark text-s">全部标为已读</span>
      </div>
      <div class="list">
        <div class="item">
          <div class="tips"><span></span></div>
          <div class="text">
            <h3 class="text-s">您本月应收账单已生成，请确认。</h3>
            <p class="text-s text-gray">2019-06-05 17:45:05</p>
          </div>
        </div>
        <div class="item">
          <div class="tips"><span></span></div>
          <div class="text">
            <h3 class="text-s">您在上海地区的参保截止时间为每月7号，如有参保需求，请尽快提交。</h3>
            <p class="text-s text-gray">2019-06-05 17:45:05</p>
          </div>
        </div>
        <div class="item">
          <div class="text">
            <h3 class="text-s">您在上海地区的参保截止时间为每月7号，如有参保需求，请尽快提交。</h3>
            <p class="text-s text-gray">2019-06-05 17:45:05</p>
          </div>
        </div>
        <div class="item">
          <div class="text">
            <h3 class="text-s">您在上海地区的参保截止时间为每月7号，如有参保需求，请尽快提交。</h3>
            <p class="text-s text-gray">2019-06-05 17:45:05</p>
          </div>
        </div>
        <div class="item">
          <div class="text">
            <h3 class="text-s">您在上海地区的参保截止时间为每月7号，如有参保需求，请尽快提交。</h3>
            <p class="text-s text-gray">2019-06-05 17:45:05</p>
          </div>
        </div>
      </div>
    </div>
    <div class="pagedevide">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" :background="true"  layout="total, sizes, prev, pager, next, jumper" :total="total" :hide-on-single-page="true"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "Messages",
  data: function(){
    return {
      currentPage: 1,
      total: 100,
      headStyle: { height: '40px', background: '#F2F2F2', 'font-size': '12px', 'font-weight': '400', 'padding-left': '14px' },
      cellStyle: { height: '40px', 'font-size': '12px', 'padding-left': '14px', 'box-shadow': '0px -1px 0px 0px rgba(0,0,0,0.1);' },
    }
  },
  computed: {},
  methods: {
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(page) {
      console.log(`当前页: ${page}`);
      this.list = this.allList.slice(page, page+10);
    }
  }
};
</script>

<style lang="scss" scoped>
.messages {
  width: 800px;
  margin: 0 auto;
  margin-top: 60px;
  .breadcase{
    line-height: 42px;
    a{
      color: #6E80F2;
    }
  }
  .content{
    background: $white;
    .title{
      line-height: 50px;
      overflow: hidden;
      padding: 0 24px;
      border-bottom: 1px solid #E6E6E6;
      h1{
        float: left;
        position: relative;
        font-weight: 600;
        span{
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #FF5757;
          color: $white;
          font-size: 12px;
          text-align: center;
          line-height: 14px;
          top: 8px;
          right: -10px;
        }
        &::after{
          content: ' ';
          width: 56px;
          height: 2px;
          background: #6A7CF2;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
      span{
        float: right;
      }
    }
    .list{
      padding: 14px 0;
      .item{
        padding: 10px 24px;
        display: flex;
        .tips{
          width: 14px;
          position: relative;
          text-align: left;
          span{
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #6F80F3;
            top: 6px;
          }
        }
        .text{
          h3{
            margin-bottom: 4px;
          }
          p{
            line-height: 18px;
          }
        }
      }
    }
  }
  .pagedevide{
    text-align: center;
  }
}
</style>