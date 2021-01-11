<template>
  <div class="search">
    <div class="content">
      <slot><img src="../assets/search.png" alt="" /></slot>
      <input type="text" v-model="sValue" :placeholder="placeholder" />
    </div>
  </div>
</template>
<script>

export default {
  name: 'Search',
  props: {
    placeholder: {
      type: String,
      default: "请输入内容"
    }
  },
  data: function(){
    return {
      sValue: ""
    }
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
    .search{
      text-align: left;
      width: 100%;
      .content{
        width: 100%;
        height: 100%;
        border: 1px solid #E6E6E6;
        padding: 6px 10px;
        background:rgba(247,247,247,1);
        border-radius:2px;
        opacity:0.97;
        border-radius: 2px;
        >img{
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
        >input{
          vertical-align: middle;
          border: none;
          margin-left: 4px;
          font-size: 12px;
          line-height: 20px;
          background:rgba(247,247,247,1);
          width: calc(100% - 24px);
        }
      }
    }
</style>