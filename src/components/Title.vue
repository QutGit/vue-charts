<template>
  <div class="cephalosome">
    <div class="content">
      <h1>{{bgText}}</h1>
      <h2 class="text-xxxl text-gray">{{title}}</h2>
      <p class="text-s text-remark" :class="{'has-remark': !remark}">{{remark}}</p>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Title',
  props: {
    title: String,
    remark: String,
    bgText: {
      default: 'PRODUCTS',
      type:String,
      required: true,
    }
  },
  data: function(){
    return{
      
    }
  },
  mounted() {
    
  },
  computed: {
    
  },
}
</script>
<style lang="scss" scoped>
    .cephalosome{
      text-align: center;
      width: 100%;
      .content{
        padding: 24px 0;
        width: 100%;
        height: 100%;
        position: relative;
        h1{
          line-height: 120px;
          font-size: 120px;
          color: rgba($remark, .1);
          width: auto;
          height: auto;
        }
        h2{
          font-weight:400;
          line-height: 44px;
          position: absolute;
          bottom: 44px;
          left: 0;
          right: 0;
        }
        p{
          font-weight: 400;
          line-height: 18px;
          position: absolute;
          bottom: 24px;
          left: 0;
          right: 0;
        }
        .has-remark{
          position: relative;
          &::after{
            content: " ";
            width: 80px;
            height: 4px;
            background-color: $blue;
            position: absolute;
            bottom: -12px;
            left: 50;
            transform: translateX(-50%);
          }
        }
      }
    }
</style>