<template>
  <div class="fscreen">
    <div class="content">
      <div class="laywer">
        <div class="m-wapper">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Fscreen',
  props: {
    title: String,
    display: Boolean,
    viewType: Number,
  },
  data(){
    return {
      vType: 1
    }
  },
  mounted: function(){
    this.vType = this.viewType;
  },
  methods: {
    // 关闭弹窗
    close(){
      this.$emit('displayFscreen', false);
    },
    // 切换视图
    changeViewType(type){
      this.vType = type;
    }
  }
}
</script>
<style lang="scss" scoped>
    .fscreen{
      text-align: center;
      width: 100%;
      height: 100%;
      .content{
        width: 100%;
        height: 100%;
        position: relative;
        .laywer{
          overflow-y: auto;
          width: 100%;
          height: 100%;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 2010;
          background: #EDEDED;
          padding: 20px;
          .m-wapper{
            width: 100%;
            min-height: calc(100vh - 50px);
            margin: 0 auto;
            background: $white;
            padding-bottom: 20px;
            position: relative;
            .m-title{
              text-align: left;
              line-height: 60px;
              border-bottom: 1px solid #DBDBDB;
              padding: 0 24px;
              overflow: hidden;
              h1{
                font-weight: 600;
                display: inline-block;
              }
              .setting{
                float: right;
                >span{
                  padding: 6px 10px;
                  background: #F5F5F5;
                  border-radius:2px 0px 0px 2px;
                  cursor: pointer;
                  line-height: 1.2;
                }
                .l-view{
                  display: inline-block;
                }
                .t-view{
                  display: inline-block;
                }
                .active{
                  background: #6E80F2;
                  color: #ffffff;
                }
                .f-screen{
                  display: inline-block;
                  margin-right: 24px;
                  margin-left: 20px;
                  cursor: pointer;
                  >span{
                    margin-left: 6px;
                    vertical-align: middle;
                  }
                  >img{
                    width: 12px;
                    height: 12px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
          .m-wapper-max{
            width: 90%!important;
          }
          .close-max{
            right: calc((100vw - 90%)/2 - 60px);
          }
        }
      }
    }
</style>