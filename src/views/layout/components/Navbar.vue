<template>
  <div class="n-wrap">
    <div class="navbar" :class="{'white-bg': menu_type == 2}">
      <div class="menu clearfix">
        <div class="logo">
          <a href="/">
            <img src="../../../assets/logo.png" alt="新社汇" />
          </a>
        </div>
        <ul>
          <li v-for="(item, index) in menus" :key="index">
            <router-link
              class="text-m"
              active-class="active"
              :to="{ path: item.url }"
              exact
              v-on:click.native="skipRefresh"
            >{{item.name}}</router-link>
          </li>
        </ul>
        <div class="center">
          <div class="about">
            <span class="text-s text-remark">您好！{{userInfo.tenantName}}</span>
          </div>
          <div class="about">
            <img src="../../../assets/icon-about.png" class="icon-about" alt="about" />
            <a class="text-blue text-13" target="_blank" href="https://xinshehui.linlongyun.com/">关于我们</a>
          </div>
          <div class="user" :class="{'focus': showUserOperate}">
            <div class="u-select" @click="userOperate()">
              <img class="head" src="../../../assets/user.png" alt="新社汇" />
              <span>{{userInfo.userName}}</span>
              <img class="down" src="../../../assets/down.png" alt="新社汇" />
            </div>
            <div class="user-select" :class="{'display': showUserOperate}">
              <div class="u-option text-s text-black">
                <router-link to="/mobile">修改登录手机号</router-link>
              </div>
              <div class="u-option text-s text-black">
                <router-link to="/changepwd">修改登录密码</router-link>
              </div>
            </div>
          </div>

          <!-- <div class="tips" :class="{'focus': showTips}">
            <div class="t-operate" @click="displayTips()">
              <img src="../../../assets/tips.png" alt="新社汇" />
              <span>2</span>
            </div>
            <div class="t-content" :class="{'display': showTips}">
              <img class="close" @click="showTips=false;" src="../../../assets/close.png" alt="新社汇" />
              <div class="title">
                <h1 class="text-m text-black">服务通知</h1>
              </div>
              <div class="t-list">
                <div class="t-item">
                  <span class="circle"></span>
                  <h3 class="text-s">您本月应收账单已生成，请确认。</h3>
                  <p class="text-s text-gray">2019-06-05 17:45:05</p>
                </div>
                <div class="t-item">
                  <span class="circle"></span>
                  <h3 class="text-s">您在上海地区的参保截止时间为每月7号，如有参保需求，请尽快提交。</h3>
                  <p class="text-s text-gray">2019-06-05 17:45:05</p>
                </div>
              </div>
              <div class="t-btm">
                <span class="text-s text-remark">全部标为已读</span>
                <router-link class="text-s text-mark1" to="/messages">查看全部</router-link>
              </div>
            </div>
          </div>-->
          <div class="quit" @click="quitBtn()">
            <img src="../../../assets/quit.png" alt="新社汇" />
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="提示" top="30vh" width="30%" :visible.sync="dialogTableVisible" style="z-index: 1000;">
      <p class="d-tips">您确定要退出薪社汇吗？</p>
      <el-checkbox class="n-check" label="不再提醒" name="type" @change="changeTips()" v-model="isTips"></el-checkbox>
      <div class="d-footer">
        <el-button size="small" @click="dialogTableVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="quit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "../../../store/index";
import { logout } from "../../../utils/apis";

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
      logout().then((res) =>{
        if(res.status == 200){
          this.$message({ type: "success", message: "退出成功!" });
          localStorage.removeItem("userId");
          localStorage.removeItem("access_token");
          this.$router.push("/login");
        }
      })
    },
    changeTips(){
      let userId = localStorage.getItem('userId');
      console.log('***',`${this.isTips}${userId}`)
      if(this.isTips){
        localStorage.setItem('isTips',`${this.isTips}${userId}`)
      }else{
        localStorage.setItem('isTips',"");
      }
      
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
    position: fixed;
    box-shadow: 0px 2px 4px 0px rgba(230, 230, 230, 0.5);
    background: rgba(255, 255, 255, 0.97);
    top: 0;
    left: 0;
    right: 0;
    z-index: 1999;
    min-width: 1200px;
    .menu {
      width: 100%;
      padding: 0 24px;
      display: flex;
      height: 100%;
      // overflow: hidden;
      justify-content: center;
      align-items: center;
      .logo {
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
          &:hover {
            text-decoration: none;
          }
          img {
            width: 102px;
            height: 33px;
          }
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
      .center {
        float: right;
        height: 100%;
        display: flex;
        text-align: center;
        position: relative;
        > div {
          display: flex;
          justify-content: center;
          align-items: center;
          border-left: 1px solid #e6e6e6;
        }
        .about {
          padding-right: 30px;
          border-left: none;
          .icon-about {
            width: 16px;
            height: 16px;
            margin-right: 6px;
          }
          > a {
            text-decoration: none;
          }
        }
        .user {
          height: 100%;
          width: 140px;
          position: relative;
          cursor: pointer;
          .user-select {
            display: none;
            width: 160px;
            text-align: left;
            background: $white;
            padding-top: 4px;
            position: absolute;
            z-index: 999;
            bottom: 0;
            transform: translateY(100%);
            right: 0;
            box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.07);
            .u-option {
              padding-left: 30px;
              line-height: 36px;
              a {
                text-decoration: none;
                display: inline-block;
                width: 100%;
                height: 100%;
              }
              &:hover {
                background: #f2f2f2;
              }
            }
          }
          .u-select {
            width: 100%;
            height: 100%;
            line-height: 60px;
            .head {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              vertical-align: middle;
            }
            > span {
              margin: 0 6px;
              font-size: 14px;
              color: #b3b3b3;
              font-weight: 600;
              vertical-align: middle;
            }
            .down {
              width: 16px;
              height: 16px;
              vertical-align: middle;
            }
          }
        }
        .display {
          display: block !important;
        }
        .focus {
          background: #f5f5f5;
        }
        .tips {
          height: 100%;
          width: 64px;
          position: relative;
          .t-operate {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            > span {
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background: #ff5757;
              font-size: 12px;
              color: $white;
              position: absolute;
              top: 16px;
              right: 14px;
            }
            img {
              width: 24px;
              height: 24px;
            }
          }
          .t-content {
            display: none;
            width: 300px;
            background: $white;
            position: absolute;
            right: 0;
            bottom: 0;
            transform: translateY(100%);
            z-index: 999;
            box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.07);
            .close {
              position: absolute;
              top: 14px;
              right: 14px;
              width: 20px;
              height: 20px;
            }
            .title {
              line-height: 44px;
              text-align: center;
              border-bottom: 1px solid #e6e6e6;
            }
            .t-list {
              .t-item {
                padding: 15px 30px;
                text-align: left;
                position: relative;
                .circle {
                  display: inline-block;
                  position: absolute;
                  width: 6px;
                  height: 6px;
                  background: #6f80f3;
                  border-radius: 50%;
                  top: 20px;
                  left: 15px;
                }
                h3 {
                  margin-bottom: 4px;
                }
              }
            }
            .t-btm {
              line-height: 36px;
              padding: 0 15px;
              background: #f2f2f2;
              overflow: hidden;
              span {
                float: left;
              }
              a {
                float: right;
              }
            }
          }
        }
        .quit {
          height: 100%;
          width: 64px;
          img {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }
}
</style>
