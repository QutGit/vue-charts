<template>
  <div class="modal">
    <div class="content">
      <div class="laywer">
        <!-- <img class="close" :class="{'close-max' : size == 'max'}" @click="close()" src="../assets/close.png" alt=""> -->
        <div class="m-wapper" :class="{'m-wapper-max' : size == 'max'}">
          <div class="title">
            <h1 class="text-black text-18">{{title}}</h1>
            <a class="text-s" @click="close()">{{"< 返回"}}</a>
          </div>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Modal',
  props: {
    title: String,
    display: Boolean,
    size: String,
  },
  methods: {
    // 关闭弹窗
    close(){
      this.$emit('displayFn', false);
    }
  }
}
</script>
<style lang="scss" scoped>
    .modal{
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
          z-index: 2000;
          background: #EDEDED;
          padding-top: 50px;
          .close{
            width: 40px;
            height: 40px;
            position: fixed;
            top: 50px;
            right: calc((100vw - 800px)/2 - 60px);
            z-index: 2002;
          }
          .m-wapper{
            width: 800px;
            min-height: calc(100vh - 50px);
            margin: 0 auto;
            background: $white;
            padding-bottom: 20px;
            .title{
              text-align: left;
              line-height: 60px;
              border-bottom: 1px solid #DBDBDB;
              padding: 0 24px;
              h1{
                display: inline-block;
                font-weight: 600;
              }
              a{
                float: right;
                color: #6E80F2;
                cursor: pointer;
                &:hover{
                  text-decoration: none;
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