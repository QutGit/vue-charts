<template>
  <div class="validate">
    <div class="content">
      <div class="title">
        <h1 class="text-m text-black">修改登录手机</h1>
        <a href="/" v-if="validateType != 2">返回首页</a>
      </div>
      <div class="operate" v-if="validateType == 1">
        <div class="progress">
          <div class="line">
            <div class="pros"></div>
            <div class="left">
              <img src="../../assets/success-b.png" alt />
              <p class="text-s text-blue">验证身份</p>
            </div>
            <div class="mid">
              <img src="../../assets/success-b.png" alt />
              <p class="text-s text-blue">修改账号</p>
            </div>
            <div class="rights">
              <img src="../../assets/completed.png" alt />
              <p class="text-s text-gray">验证成功</p>
            </div>
          </div>
        </div>
        <div class="form">
          <div class="tel">
            <span class="text-s text-remark">登录手机号</span>
            <input type="tel" v-model="mobile" placeholder="请输入手机号码（登录时的个人账号）" />
          </div>
          <div class="valid">
            <button class="text-s text-white pointer" v-if="isTimer" @click="sendMessage">免费获取验证码</button>
            <button class="text-s text-gray btn-count" v-if="!isTimer"><span>{{count}}S</span>后重新获取</button>
          </div>
          <div class="password">
            <span class="text-s text-remark">验证码</span>
            <input type="tel" v-model="code" placeholder="请输入短信验证码" />
          </div>
        </div>
        <div class="button">
          <button class="text-m text-white pointer" @click="completed()">确定</button>
          <ErrorMessage v-if="showError" class="error-toast" :message="errorTxt" />
        </div>
      </div>
      <div class="o-success" v-if="validateType == 2">
        <img src="../../assets/completed-b.png" alt />
        <span class="text-s text-remark">登录手机号修改成功，{{skipTime}}秒后将自动跳转到登录页面，请重新登录。</span>
      </div>
    </div>
  </div>
</template>
<script>

import ErrorMessage from "@/components/ErrorMessage.vue";
import { sendMessage, smsVerify, changeMobile } from "../../utils/apis";

export default {
  name: "Validate",
  components: { ErrorMessage },
  data: function() {
    return {
      currentPage: 1,
      total: 100,
      validateType: 1,
      errorTxt: "手机号格式有误，请输入正确手机号",
      showError: false,
      mobile: '',
      code: '',
      isTimer: true,
      timer: null,
      count: 0,
      skipTime: 3
    };
  },
  computed: {},
  methods: {
    // 发送短息 获取验证码
    async sendMessage(){
      let result = await sendMessage({mobile: this.mobile, isWrap: true, businessType: 1});
      if(result.status === 200){
        this.getCode();
        this.$message({ type: 'success', message: "发送成功" });
      } else {
        this.$message({ type: 'error', message: result.message });
      }
    },
    // 确定按钮 短信验证
    async completed() {
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
      if(!this.code){
        this.showError = true;
        this.errorTxt = "请输入验证码";
        return;
      }
      // 用户信息本地化
      localStorage.setItem('account',"");
      localStorage.setItem('pwsStr',"");
      localStorage.setItem("isRemember","");
      let result = await changeMobile({code: this.code, mobile: this.mobile, isWrap: true, businessType: 1});
      // 验证通过
      if(result.status === 200 && result.data){
        this.validateType = 2;
        let skipTime = this.skipTime;
        let time = setInterval(() =>{
          if (this.skipTime > 0 && this.skipTime <= 60) {
            this.skipTime--;
          } else {
            clearInterval(time);
            time = null;
            this.$router.replace('/login')
            localStorage.removeItem("userId");
          }
        },1000)
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
    }  
  }
};
</script>

<style lang="scss" scoped>
.validate {
  width: 800px;
  margin: 0 auto;
  margin-top: 72px;
  .content {
    background: $white;
    height: calc(100vh - 72px);
    .title {
      line-height: 50px;
      overflow: hidden;
      padding: 0 24px;
      border-bottom: 1px solid #e6e6e6;
      h1 {
        float: left;
        position: relative;
        font-weight: 600;
        &::after {
          content: " ";
          width: 85px;
          height: 2px;
          background: #6a7cf2;
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
    .operate {
      .progress {
        margin-top: 68px;
        .line {
          width: 404px;
          height: 4px;
          background: #e6e6e6;
          margin: 0 auto;
          position: relative;
          > div {
            text-align: center;
            img {
              width: 20px;
              height: 20px;
            }
            p {
              margin-top: 20px;
            }
          }
          .pros {
            width: 75%;
            height: 100%;
            background: #6a7cf2;
          }
          .left {
            position: absolute;
            transform: translateX(-50%);
            left: 0;
            top: -8px;
          }
          .mid {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -8px;
          }
          .rights {
            position: absolute;
            right: 0;
            transform: translateX(50%);
            top: -8px;
          }
        }
      }
      .form {
        margin-top: 116px;
        text-align: center;
        padding: 0 208px;
        .tel {
          text-align: left;
          input {
            margin-left: 24px;
            border: none;
            border-bottom: 1px solid #e6e6e6;
            width: 300px;
            height: 30px;
            font-size: 12px;
          }
        }
        .password {
          margin-top: 30px;
          text-align: right;
          input {
            margin-left: 24px;
            border: none;
            border-bottom: 1px solid #e6e6e6;
            width: 300px;
            height: 30px;
            font-size: 12px;
          }
        }
        .valid {
          text-align: left;
          padding-left: 84px;
          button {
            width: 100px;
            height: 30px;
            background: linear-gradient(152deg,rgba(136, 156, 255, 1) 0%,rgba(106, 124, 242, 1) 100%);
            border-radius: 2px;
            opacity: 0.6;
            border: none;
            margin-top: 8px;
          }
          .btn-count{
            background: #E6E6E6;
          }
        }
      }
      .button {
        text-align: right;
        margin-top: 40px;
        padding: 0 208px;
        button {
          width: 300px;
          line-height: 44px;
          background: linear-gradient(
            152deg,
            rgba(136, 156, 255, 1) 0%,
            rgba(106, 124, 242, 1) 100%
          );
          border-radius: 2px;
          font-weight: 500;
          border: none;
        }
      }
    }
    .o-success {
      text-align: center;
      margin-top: 96px;
      img {
        width: 24px;
        height: 24px;
      }
      span {
        text-align: left;
        display: inline-block;
        width: 226px;
        margin-left: 16px;
      }
    }
  }
}
</style>