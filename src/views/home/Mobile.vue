<template>
  <div class="mobile">
    <div class="content">
      <div class="title">
        <h1 class="text-m text-black">修改登录手机</h1>
        <a href="/">返回首页</a>
      </div>
      <div class="operate">
        <div class="progress">
          <div class="line">
            <div class="pros"></div>
            <div class="left">
              <img src="../../assets/success-b.png" alt="">
              <p class="text-s text-blue">验证身份</p>
            </div>
            <div class="mid">
              <img src="../../assets/success.png" alt="">
              <p class="text-s text-gray">修改账号</p>
            </div>
            <div class="rights">
              <img src="../../assets/completed.png" alt="">
              <p class="text-s text-gray">验证成功</p>
            </div>
          </div>
        </div>
        <div class="text text-s text-gray">为了保证账户安全，请先完成身份验证</div>
        <div class="form">
          <div class="tel">
            <span class="text-s text-remark">登录手机号</span>
            <strong class="text-m text-black">{{userInfo.mobile}}</strong>
          </div>
          <div class="password">
            <span class="text-s text-remark">登录密码</span>
            <input type="password" v-model="password" placeholder="请输入密码" />
          </div>
        </div>
        <div class="button">
          <button class="text-m text-white" @click="nextTip()">下一步</button>
          <ErrorMessage class="error-toast" v-if="showError" :message="errorText" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import ErrorMessage from "@/components/ErrorMessage.vue";
import { login } from "../../utils/apis";
import store from "../../store/index";
import { mapGetters } from "vuex";

export default {
  name: "Mobile",
  components: { ErrorMessage },
  data: function(){
    return {
      currentPage: 1,
      total: 100,
      password: '',
      errorText: "密码有误，请重新输入",
      showError: false
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    // 验证密码是否输入正确
    async userLogin(params){
      let result = await login(params);
      if(result.status === 200){
        // this.$message({ type: 'success', message: "登录成功" });
        this.$router.replace('/validate')
      }else{
        // this.$message({ type: 'error', message: result.message });
        this.showError = true;
        this.errorText = result.message;
      }
    },
    // 下一步
    nextTip() {
      if(!this.password){
        return this.$message({ type: 'error', message: "请输入密码" });
      }
      let userInfo = this.userInfo;
      this.userLogin({username: userInfo.mobile, password: this.password, isWrap: true});
    }
  }
};
</script>

<style lang="scss" scoped>
.mobile {
  width: 800px;
  margin: 0 auto;
  margin-top: 72px;
  .content{
    background: $white;
    height: calc(100vh - 72px);
    .title{
      line-height: 50px;
      overflow: hidden;
      padding: 0 24px;
      border-bottom: 1px solid #E6E6E6;
      h1{
        float: left;
        position: relative;
        font-weight: 600;
        &::after{
          content: ' ';
          width: 85px;
          height: 2px;
          background: #6A7CF2;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
      a{
        float: right;
        color: #7688F6;
        font-size: 12px;
        &:hover{
          text-decoration: none;
        }
      }
    }
    .operate{
      .progress{
        margin-top: 68px;
        .line{
          width: 404px;
          height: 4px;
          background: #E6E6E6;
          margin: 0 auto;
          position: relative;
          >div{
            text-align: center;
            img{
              width: 20px;
              height: 20px;
            }
            p{
              margin-top: 20px;
            }
          }
          .pros{
            width: 25%;
            height: 100%;
            background: #6A7CF2;
          }
          .left{
            position: absolute;
            transform: translateX(-50%);
            left: 0;
            top: -8px;
          }
          .mid{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -8px;
          }
          .rights{
            position: absolute;
            right: 0;
            transform: translateX(50%);
            top: -8px;
          }
        }
      }
      .text{
        margin-top: 66px;
        text-align: center;
        line-height: 44px;
      }
      .form{
        text-align: center;
        margin-top: 32px;
        padding: 0 208px;
        .tel{
          text-align: left;
          strong{
            margin-left: 20px;
          }
        }
        .password{
          margin-top: 30px;
          text-align: right;
          input{
            margin-left: 24px;
            border: none;
            border-bottom: 1px solid #E6E6E6;
            width: 300px;
            height: 30px;
            font-size: 12px;
          }
        }
      }
      .button{
        text-align: right;
        margin-top: 40px;
        padding: 0 208px;
        button{
          cursor: pointer;
          width:300px;
          line-height:44px;
          background:linear-gradient(152deg,rgba(136,156,255,1) 0%,rgba(106,124,242,1) 100%);
          border-radius:2px;
          font-weight: 500;
          border: none;
        }
      }
    }
  }
}
</style>