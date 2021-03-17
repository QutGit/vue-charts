<template>
  <div class="n-wrap">
    <div class="navbar" :class="{'white-bg': menu_type == 2}">
      <div class="menu clearfix">
        <div class="logo">
          <a href="/">
            <img src="../../../assets/kama.png" alt="穿搭" />
          </a>
          <h2>CAMERA</h2>
        </div>
        <!-- <ul>
          <li v-for="(item, index) in menus" :key="index">
            <router-link
              class="text-m"
              active-class="active"
              :to="{ path: item.url }"
              exact
              v-on:click.native="skipRefresh"
            >{{item.name}}</router-link>
          </li>
        </ul> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "../../../store/index";
// import { logout } from "../../../utils/apis";

export default {
  name: "Menu",
  props: ["menuType"],
  data: function() {
    return {
      menus: [],
      showUserOperate: false,
      showTips: false,
      dialogTableVisible: false,
      isTips: false
    };
  },
  computed: {
    // vuex状态
    ...mapGetters(["permission_routes", "menu_type", "userInfo"])
  },
  watch: {
    $route(to) {
      this.showUserOperate = false;
      this.showTips = false;
      if (to.fullPath != "/") {
        store.dispatch("permission/getMenuType", 2);
      }
    }
  },
  mounted() {
    let menus = this.getMenus(this.permission_routes);
    this.menus = menus;
    console.log("menu_type", this.menu_type);
  },
  methods: {
    // 根据路由列表，动态生成链接并展示
    getMenus(routes) {
      let menus = [];
      routes.forEach(item => {
        if (item.children) {
          item.children.forEach(c => {
            if (c.meta && !c.meta.expetc) {
              menus.push({ url: c.path ? c.path : "/", name: c.meta.title });
            }
          });
        }
      });
      return menus;
    },
    // 用户操作
    userOperate() {
      this.showUserOperate = !this.showUserOperate;
    },
    // 通知
    displayTips() {
      this.showTips = !this.showTips;
    },
    // 退出按钮
    quitBtn(){
      let userId = localStorage.getItem('userId');
      let isTips = localStorage.getItem('isTips');
      console.log('===',isTips)
      if(isTips != `true${userId}`) {
        this.dialogTableVisible = true;
      }else{
        this.quit();
      }
    },
    // 退出登录
    async quit() {
      // logout().then((res) =>{
      //   if(res.status == 200){
      //     this.$message({ type: "success", message: "退出成功!" });
      //     localStorage.removeItem("userId");
      //     localStorage.removeItem("access_token");
      //     this.$router.push("/login");
      //   }
      // })
    },
    // 路由监听事件
    skipRefresh(){
      store.dispatch("common/setDtType", "");
      store.dispatch("common/setQtype", "");
      store.dispatch("common/setMonth", "");
      store.dispatch("common/setMonthS", "");
    }
  }
};
</script>

<style lang="scss" scoped>
.white-bg {
  width: 100%;
  background: $white !important;
  box-shadow: 0 3px 5px 1px rgba(100, 100, 100, 0.1);
}
.n-wrap{
  .d-tips{
    margin-bottom: 20px;
  }
  .d-footer{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    line-height: 54px;
    text-align: right;
    margin-top: 60px;
    padding-right: 30px;
    background:rgba(0,0,0,0.03);
  }
  .n-check{
    position: absolute;
    bottom: 18px;
    left: 20px;
  }
  .navbar {
    background: none;
    width: 100%;
    height: 60px;
    // position: fixed;
    top: 0;
    left: 0;
    right: 0;
    // z-index: 1999;
    // min-width: 1200px;
    .menu {
      background: #232a34;
      width: 100%;
      padding: 0 24px;
      display: flex;
      height: 100%;
      align-items: center;
      .logo {
        display: flex;
        align-items: center;
        a {
          display: inline-block;
          height: 100%;
          &:hover {
            text-decoration: none;
          }
          img {
            width: 40px;
          }
        }
        > h2 {
          margin-left: 10px;
          color: #fff;
          width: 60px;
          font-weight: 600;
          font-size: 20px;
        }
      }
      ul {
        flex: 1;
        overflow: hidden;
        display: inline-block;
        margin-left: 154px;
        li {
          float: left;
          padding: 0 20px;
          line-height: 60px;
          a {
            display: inline-block;
            width: 100%;
            height: 100%;
            &:hover {
              text-decoration: none;
              color: $blue !important;
            }
          }
          .link {
            &:hover {
              text-decoration: none;
              font-weight: 500;
              color: $white !important;
            }
          }

          &:last-child {
            padding-right: 0;
          }
          &:first-child {
            padding-left: 0;
          }
        }
      }
      .active {
        color: $blue !important;
        position: relative;
        &::after {
          content: " ";
          position: absolute;
          width: 100%;
          height: 2px;
          background: #6a7cf2;
          left: 0;
          right: 0;
          bottom: 10px;
        }
      }
    }
  }
}
</style>
