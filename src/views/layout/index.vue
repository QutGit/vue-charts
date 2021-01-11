<template>
  <div class="app-wrap">
    <navbar v-if="isMenu" />
    <app-main/>
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
import AppMain from "./components/AppMain";

export default {
  name: "Layout",
  components: { Navbar, AppMain },
  data: function(){
    return {
      menuType: 1,
      isMenu: true
    }
  },
  watch: {
    $route(to, from) {
      // 路由变化监听 显示隐藏菜单
      if(to.meta.expetc){
        this.isMenu = false;
      }else{
        this.isMenu = true;
      }
    }
  },
  mounted(){
    // 初始化判断是否隐藏菜单
    if(this.$route.meta.expetc){
      this.isMenu = false;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.app-wrap {
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
</style>