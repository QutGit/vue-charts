<template>
  <div class="forgot">
    <div class="content">
      <div class="avader">
        <img src="../../assets/login.png" alt="">
      </div>
      <div class="text">
        <h1 class="text-24 text-black">找回密码</h1>
        <div class="input-content" v-if="isValidate">
          <div class="account">
            <input type="text" v-model.number="mobile" placeholder="请输入手机号">
          </div>
          <!-- <div class="validate">
            <div class="v-c">
              <input type="text" placeholder="图片验证码">
              <div class="v-icon">
                <img src="../../assets/v-icon.png" alt="">
              </div>
            </div>
            <a href="" class="text-s text-mark1">看不清，换一张</a>
          </div> -->
          <div class="validate">
            <div class="v-c">
              <input type="text" v-model.number="code" placeholder="请输入验证码">
              <div class="v-icon">
                <button class="btn-code" v-if="isTimer" @click="btnSendMessage">点击获取</button>
                <button class="btn-count text-gray text-s" v-if="!isTimer"><span>{{count}}S</span>后重新获取</button>
              </div>
            </div>
          </div>
          <div class="button">
            <button @click="nextStep()">下一步</button>
            <ErrorMessage v-if="showError" class="error-toast" :message="errorTxt" />
          </div>
        </div>
        <div class="reset" v-if="!isValidate">
          <div class="password">
            <input type="password" v-model.trim="newPassword" placeholder="新密码" />
          </div>
          <div class="password">
            <input type="password" v-model.trim="confirmPassword" placeholder="再次输入密码" />
          </div>
          <div class="button">
            <button @click="changePassword()">完 成</button>
            <ErrorMessage v-if="showError" class="error-toast" :message="errorTxt" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import ErrorMessage from "@/components/ErrorMessage.vue";
import { sendMessage, smsVerify, changePwd } from "../../utils/apis";

export default {
  name: "Forgot",
  components: { ErrorMessage },
  data: function(){
    return {
      mobile: "",
      count: 0,
      code: "",
      isTimer: true,
      isValidate: true,
      showError: false,
      errorTxt: "请输入正确验证码",
      newPassword: '',
      confirmPassword: ''
    }
  },
  computed: {},
  methods: {
    // 发送短息 获取验证码
    async btnSendMessage(){
      if(!this.mobile){
        this.showError = true;
        this.errorTxt = "手机号码不能为空";
        return;
      }
      // 手机号验证
      let patt = new RegExp(/^1[0-9]{10}$/);
      let res = patt.test(this.mobile);
      if(!res){
        this.showError = true;
        this.errorTxt = "请输入正确手机号";
        return;
      }
      try {
        let result = await sendMessage({mobile: this.mobile, businessType: 2});
        if(result.status === 200){
          if(result.data.result){
            this.getCode();
            this.$message({ type: 'success', message: "发送成功" });
          }else{
            this.$message({ type: 'error', message: "短信发送失败" });
          }
        } else {
          this.$message({ type: 'error', message: result.message });
        }
      } catch (error) {
        this.$message({ type: 'error', message: "短信发送失败" });
      }
    },
    // 确定按钮 短信验证
    async nextStep() {
      if(!this.mobile){
        this.showError = true;
        this.errorTxt = "手机号码不能为空";
        return;
      }
      let patt = new RegExp(/^1[0-9]{10}$/);
      let res = patt.test(this.mobile);
      if(!res){
        this.showError = true;
        this.errorTxt = "请输入正确手机号";
        return;
      }
      if(!this.code){
        this.showError = true;
        this.errorTxt = "请输入验证码";
        return;
      }
      // 短信验证码验证
      let result = await smsVerify({code: this.code, mobile: this.mobile, isWrap: true, businessType: 2});
      // 验证通过
      if(result.status === 200 && result.data.result){
        this.isValidate = false;
      }else{
        this.showError = true;
        this.errorTxt = result.message || "验证码错误";
      }
    },
    // 验证码倒计时
    getCode(){
      if (!this.timer) {
        this.count = 60;
        this.isTimer = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= 60) {
            this.count--;
          } else {
            this.isTimer = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000)
      }
    },
    async changePassword(){
      if(!this.confirmPassword || !this.newPassword){
        this.showError = true;
        this.errorTxt = "请输入密码";
        return;
      }
      if(this.confirmPassword !== this.newPassword){
        this.showError = true;
        this.errorTxt = "两次密码输入不一致，请再次确认";
        return;
      }
      // 必须是6-20个英文字母、数字或符号的组合
      let patt = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/);
      let res = patt.test(this.newPassword);
      if(!res){
        this.showError = true;
        this.errorTxt = "必须是6-20个英文字母、数字或符号的组合";
        return;
      }
      let result = await changePwd({mobile: this.mobile, password: this.newPassword, isWrap: true});
      // 验证通过
      if(result.status === 200){
        this.$router.replace('/login')
      }else{
        this.showError = true;
        this.errorTxt = result.message;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.forgot {
  width: 800px;
  margin: 0 auto;
  margin-top: 72px;
  width: 100%;
  height: calc(100vh - 72px);
  display: flex;
  justify-content: center;
  align-items: center;
  .content{
    background: $white;
    width: 900px;
    height: 550px;
    display: flex;
    .avader{
      width: 400px;
      img{
        width: 100%;
      }
    }
    .text{
      width: 500px;
      padding: 80px 100px 0;
      text-align: center;
      .icon{
        width: 50px;
      }
      h1{
        margin-top: 20px;
        margin-bottom: 36px;
        font-weight: 600;
      }
      .input-content{
        .account{
          width: 300px;
          line-height: 34px;
          border-bottom: 1px solid #E6E6E6;
          text-align: left;
          &:not(:first-child){
            margin-top: 20px;
          }
          input{
            vertical-align: middle;
            border: none;
            font-size: 12px;
          }
        }
        .validate{
          display: flex;
          margin-top: 12px;
          line-height: 34px;
          position: relative;
          .v-c{
            width: 300px;
            border-bottom: 1px solid #E6E6E6;
            display: flex;
            input{
              width: 100%;
              padding-right: 10px;
              border: none;
              font-size: 12px;
            }
            .v-icon{
              width: 76px;
              height: 40px;
              margin-right: 14px
              img{
                height: 100%;
              }
              button{
                width:90px;
                height:100%;
                background:linear-gradient(152deg,rgba(136,156,255,1) 0%,rgba(106,124,242,1) 100%);
                border-radius:2px;
                border: none;
                color: $white;
                font-size: 14px;
              }
              .btn-count{
                background: #E6E6E6;
              }
              .btn-code{
                cursor: pointer;
              }
            }
          }
          a{
            position: absolute;
            right: -4px;
            top: 50%;
            transform: translate3d(100%, -50%, 0);
          }
        }
        >.button{
          >button{
            cursor: pointer;
          }
        }
      }
      .reset{
        text-align: center;
        width: 100%;
        .password{
          width: 100%;
          line-height: 34px;
          border-bottom: 1px solid #E6E6E6;
          text-align: left;
          &:not(:first-child){
            margin-top: 20px;
          }
          input{
            width: 100%;
            height: 100%;
            border: none;
            font-size: 12px;
          }
        }
        >.button{
          >button{
            cursor: pointer;
          }
        }
      }
      .button{
        margin-top: 40px;
        button{
          width:300px;
          line-height:44px;
          background:linear-gradient(152deg,rgba(136,156,255,1) 0%,rgba(106,124,242,1) 100%);
          border-radius:2px;
          font-size: 14px;
          color: $white;
          font-weight: 500;
          border: none;
        }
      }
    }
  }
}
</style>