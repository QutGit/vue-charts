<template>
  <div class="changepwd">
    <div class="content">
      <div class="title">
        <h1 class="text-m text-black">修改登录密码</h1>
        <a href="/">返回首页</a>
      </div>
      <div class="operate">
        <div class="progress">
          <div class="line">
            <div class="pros"></div>
            <div class="left">
              <img src="../../assets/success-b.png" alt />
              <p class="text-s text-blue">验证身份</p>
            </div>
            <div class="mid">
              <img src="../../assets/success.png" alt />
              <p class="text-s text-gray">修改密码</p>
            </div>
            <div class="rights">
              <img src="../../assets/completed.png" alt />
              <p class="text-s text-gray">修改成功</p>
            </div>
          </div>
        </div>
        <div class="form">
          <div class="tel">
            <span class="text-s text-remark">登录手机号</span>
            <strong class="text-m text-black">{{userInfo.mobile}}</strong>
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
    </div>
  </div>
</template>
<script>

import ErrorMessage from "@/components/ErrorMessage.vue";
import { sendMessage, smsVerify } from "../../utils/apis";
import store from "../../store/index";
import { mapGetters } from "vuex";

export default {
  name: "Password",
  components: { ErrorMessage },
  data: function() {
    return {
      currentPage: 1,
      total: 100,
      errorTxt: "手机号格式有误，请输入正确手机号",
      showError: false,
      mobile: '',
      code: '',
      isTimer: true,
      timer: null,
      count: 0
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    // 发送短息 获取验证码
    async sendMessage(){
      let userInfo = this.userInfo;
      let result = await sendMessage({mobile: userInfo.mobile, isWrap: true, businessType: 2});
      if(result.status === 200){
        this.getCode();
        this.$message({ type: 'success', message: "发送成功" });
      } else {
        this.$message({ type: 'error', message: result.message });
      }
    },
    // 确定按钮 短信验证
    async completed() {
      if(!this.code){
        this.showError = true;
        this.errorTxt = "请输入验证码";
        return;
      }
      let userInfo = this.userInfo;
      let result = await smsVerify({code: this.code, mobile: userInfo.mobile, isWrap: true, businessType: 2});
      // 验证通过
      if(result.status === 200 && result.data.result){
        this.$router.replace('/inputpwd')
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
.changepwd {
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
            width: 25%;
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
          strong{
            margin-left: 20px;
          }
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