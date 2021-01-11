<template>
  <footer class="footer">
    <div class="f-content">
      <div class="f-logo">
        <img src="../../../assets/logo-w.png" alt="霖珑云科 -- 科技赋能管理" />
        <span class="text-s text-white">科技赋能管理</span>
      </div>
      <div class="f-info">
        <div class="f-contact text-s">
          <p>联系电话：0512-67903209</p>
          <p>商务合作：info@linlongyun.com</p>
          <p>苏ICP备19029986号</p>
        </div>
        <div class="f-address text-s">
          <p>集团总部：苏州市吴中区东方大道100号 </p>
          <p>研发中心：北京市海淀区学院路768号创业产业园b座5号门 </p>
          <p>运营中心：上海市普陀区新会路468号中环现代大厦9楼</p>
        </div>
        <div class="f-wechat">
          <div class="icon">
            <div class="qrcode">
              <img src="../../../assets/qrcode.png" alt="霖珑云科 -- 微信二维码" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "Footers",
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  margin: 0 auto;
  height: 210px;
  background:rgba(55,61,73,1);
  padding: 34px 0 22px;
  .f-content{
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    position: relative;
    .f-logo{
      img{
        width: 178px;
        height: 30px;
      }
      span{
        vertical-align: bottom;
        margin-left: 14px;
      }
    }
    .f-info{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      div{
        p{
          line-height:17px;
          color:rgba(255,255,255,0.6);
        }
      }
      .f-contact{
        float: left;
      }
      .f-address{
        float: left;
        margin-left: 50px;
      }
      .f-wechat{
        float: right;
        position: relative;
        .icon{
          margin-right: 32px;
          background: url(../../../assets/wechat.png) no-repeat;
          background-size: cover;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          .qrcode{
            display: none;
            position: absolute;
            width: 130px;
            top: -150px;
            z-index: 20;
            right: 0;
            img{
              width: 130px;
            }
          }
          &:hover{
            background: url(../../../assets/wechat-hover.png) no-repeat;
            background-size: cover;
          }
          &:hover .qrcode{
            display: block;
          }
        }
        
      }
    }
  }
}
</style>