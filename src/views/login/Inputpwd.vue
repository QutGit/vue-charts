<template>
  <div class="inputpwd">
    <div class="content">
      <div class="title">
        <h1 class="text-m text-black">修改登录密码</h1>
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
              <p class="text-s text-gray">修改密码</p>
            </div>
            <div class="rights">
              <img src="../../assets/completed.png" alt />
              <p class="text-s text-gray">修改成功</p>
            </div>
          </div>
        </div>
        <div class="form">
          <!-- <div class="tips text-s">温馨提示：假如您有本公司其它相关平台账号，密码将同步修改！</div> -->
          <div class="tel">
            <span class="text-s text-remark">登录手机号</span>
            <strong class="text-m text-black">{{userInfo.mobile}}</strong>
          </div>
          <div class="tel">
            <span class="text-s text-remark">新密码</span>
            <input type="password" v-model.trim="newPassword" placeholder="请输入新密码" />
            <p class="text-remark text-s">必须是6-20个英文字母、数字或符号的组合</p>
          </div>
          <div class="tel">
            <span class="text-s text-remark">确认新密码</span>
            <input type="password" v-model.trim="confirmPassword" placeholder="请再次输入新密码" />
          </div>
        </div>
        <div class="button">
          <button class="text-m text-white pointer" @click="completed()">确定</button>
          <ErrorMessage v-if="showError" class="error-toast" :message="errorTxt" />
        </div>
      </div>
      <div class="o-success" v-if="validateType == 2">
        <img src="../../assets/completed-b.png" alt />
        <span class="text-s text-remark">登录密码修改成功，{{skipTime}}秒后将自动跳转到登录页面，请重新登录。</span>
      </div>
    </div>
  </div>
</template>
<script>

import ErrorMessage from "@/components/ErrorMessage.vue";
import { changePwd } from "../../utils/apis";
import store from "../../store/index";
import { mapGetters } from "vuex";

export default {
  name: "Inputpwd",
  components: { ErrorMessage },
  data: function() {
    return {
      currentPage: 1,
      total: 100,
      validateType: 1,
      errorTxt: "手机号格式有误，请输入正确手机号",
      showError: false,
      skipTime: 3,
      newPassword: '',
      confirmPassword: ''
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    // 确定按钮 短信验证
    async completed() {
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
      let patt = new RegExp(/^(?=.*\d).{6,20}$/);
      let res = patt.test(this.newPassword);
      if(!res){
        this.showError = true;
        this.errorTxt = "必须是6-20个英文字母、数字或符号的组合";
        return;
      }
      localStorage.setItem('account',this.userInfo.mobile);
      localStorage.setItem('pwsStr',"");
      localStorage.setItem("isRemember","");
      let result = await changePwd({mobile: this.userInfo.mobile, password: this.newPassword, isWrap: true});
      // 验证通过
      if(result.status === 200){
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
        this.errorTxt = result.message;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.inputpwd {
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
            width: 50%;
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
      .tips{
        color: #ED2626;
      }
      .form {
        margin-top: 116px;
        text-align: center;
        padding: 0 208px;
        .tel {
          text-align: left;
          margin-top: 32px;
          >strong{
            margin-left: 20px;
          }
          >p{
            padding-left: 84px;
            margin-top: 10px;
          }
          >span{
            display: inline-block;
            width: 60px;
            text-align: right;
          }
          >input {
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