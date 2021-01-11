<template>
  <div class="login">
    <div class="content">
      <div class="avader">
        <img src="../../assets/login.png" alt />
      </div>
      <div class="text">
        <img class="icon" src="../../assets/icon.png" alt />
        <h1 class="text-24 text-black">欢迎登录薪社汇</h1>
        <div class="account">
          <img class="inputv" src="../../assets/account.png" alt />
          <input v-model="username" type="text" placeholder="请输入账号（手机号码）" />
        </div>
        <div class="account">
          <img class="inputv" src="../../assets/password.png" alt />
          <input v-model="password" :type="pwdType" placeholder="请输入密码" />
          <img class="pwdtype" v-if="pwdType=='password'" @click="passwordType()" src="../../assets/pwd-s.png" alt />
          <img class="pwdtype" v-if="pwdType=='text'" @click="passwordType()" src="../../assets/pwd-h.png" alt />
        </div>
        <div class="button">
          <button @click="login()">登 录</button>
          <ErrorMessage v-if="showError" class="error-toast" :message="errorTxt" />
        </div>
        <div class="operate">
          <el-checkbox label="记住密码" v-model="isRemember"></el-checkbox>
          <router-link to="/forgot" class="text-s text-blue">忘记密码?</router-link>
        </div>
        <div class="about">
          <a target="_blank" href="https://xinshehui.linlongyun.com/" class="about-item1">关于我们</a>
          <span class="about-item2">|</span>
          <span class="about-item3">热线电话 021-31055926-880</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import ErrorMessage from "@/components/ErrorMessage.vue";
import { login } from "../../utils/apis";
import store from "../../store/index";
import { Base64 } from 'js-base64';

export default {
  name: "Login",
  components: { ErrorMessage },
  data: function() {
    return {
      password: '',
      username: '',
      showError: false,
      errorTxt: "",
      pwdType: 'password',
      isRemember: false,
      pwdStr: ''
    };
  },
  mounted(){
    let isRemember = localStorage.getItem("isRemember");
    this.isRemember = isRemember === "true" ? true : false ;
    // 将用户id做base64本地化
    this.username = localStorage.getItem("account");
    this.password = Base64.decode(localStorage.getItem("pwsStr"));
  },
  methods: {
    // 登录接口
    async userLogin(params){
      let result = await login(params);
      if(result.status === 200){
        this.$message({ type: 'success', message: "登录成功" });
        store.dispatch("user/loginInfo", result.data.userInfo);
        localStorage.setItem("userId", result.data.userInfo.id);
        localStorage.setItem("access_token",result.data.access_token);
        this.$router.push("/");
      }else{
        this.$message({ type: 'error', message: result.message });
      }
    },
    // 登录按钮
    login() {
      if(!this.username){
        // this.showError = true;
        this.errorTxt = "请输入账号";
        return this.$message({ type: 'error', message: this.errorTxt });
      }
      if(!this.password){
        // this.showError = true;
        this.errorTxt = "请输入密码";
        return this.$message({ type: 'error', message: this.errorTxt });
      }
      localStorage.setItem("isRemember",this.isRemember);
      if(this.isRemember){
        this.pwdStr = Base64.encode(this.password);
      }else{
        this.pwdStr = '';
      }
      localStorage.setItem("account",this.username);
      localStorage.setItem("pwsStr",this.pwdStr);
      this.userLogin({username: this.username, password: this.password, isWrap: true});
    },
    // 是否显示密码
    passwordType(){
      let pwdType = this.pwdType;
      if(pwdType == 'password'){
        this.pwdType = 'text';
      }else{
        this.pwdType = 'password';
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 800px;
  margin: 0 auto;
  margin-top: 72px;
  width: 100%;
  height: calc(100vh - 72px);
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    background: $white;
    width: 900px;
    height: 550px;
    display: flex;
    .avader {
      width: 400px;
      img {
        width: 100%;
      }
    }
    .text {
      padding: 80px 100px 0;
      text-align: center;
      position: relative;
      .icon {
        width: 50px;
      }
      h1 {
        margin-top: 20px;
        margin-bottom: 36px;
        font-weight: 600;
      }
      .account {
        width: 100%;
        line-height: 34px;
        border-bottom: 1px solid #e6e6e6;
        text-align: left;
        position: relative;
        &:not(:first-child) {
          margin-top: 20px;
        }
        .inputv {
          position: absolute;
          top: 6px;
          left: 0;
          width: 24px;
          height: 24px;
        }
        .pwdtype{
          position: absolute;
          top: 6px;
          right: 0;
          width: 24px;
          height: 24px;
        }
        input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {
          -webkit-text-fill-color: #333 !important;
          background-color:transparent;
          background-image: none;
          font-size: 12px!important;
          transition: background-color 50000s ease-in-out 0s;
        }
        input {
          width: 100%;
          padding-left: 34px;
          height: 32px;
          border: none;
          font-size: 12px;
          background: none;
        }
      }
      .button {
        margin-top: 40px;
        button {
          cursor: pointer;
          width: 300px;
          line-height: 44px;
          background: linear-gradient(
            152deg,
            rgba(136, 156, 255, 1) 0%,
            rgba(106, 124, 242, 1) 100%
          );
          border-radius: 2px;
          font-size: 14px;
          color: $white;
          font-weight: 500;
          border: none;
        }
      }
      .operate {
        text-align: left;
        margin-top: 15px;
        overflow: hidden;
        a {
          float: right;
        }
      }
      .about {
        color: #999999;
        font-size: 14px;
        position: absolute;
        bottom: 25px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        .about-item1 {
          text-decoration: none;
          color: #999999;
          &:hover {
            color: #6a7cf2;
            cursor: pointer;
          }
        }
        .about-item2 {
          padding: 0 23px;
        }
      }
    }
  }
}
</style>