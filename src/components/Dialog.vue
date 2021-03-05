<template>
  <div class="dialog" v-if="display">
    <div class="dialog-content">
      <img src="../assets/close2.png" class="close" @click="close" />
      <img :src="imgSrc" class="img-item" />
      <div class="opeartion">
        <img src="../assets/download.svg" @click="downImage" />
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Dialog",
    props: {
      imgSrc: { type: String, default: 'http://qiniu.zuolinju.com/kama/pexels-emre-can-2110951.jpg?imageView2/0/h/800' },
      display: { type: Boolean, default: false },
      downLoad: { type: Function }
    },
    data: function() {
      return {
        isMobile: this.userAgent()
      };
    },
    mounted() {
      const isMobile = this.userAgent()
    },
    methods: {
      userAgent () {
        let info = navigator.userAgent;
        let agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod", "iPad"];
        for(let i = 0; i < agents.length; i++){
          if(info.indexOf(agents[i]) >= 0) return true;
        }
        return false;
      },
      close () {
        this.$emit('dialogClose', false)
      },
      itemClick (item) {
        this.click(item)
      },
      async downImage () {
        this.downLoad(this.imgSrc)
      }
    }
  };
</script>
<style lang="scss">
.dialog {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 9900;
  background-color: rgba($color: #000000, $alpha: 0.9);
  
  .dialog-content {
    position: absolute;
    top: 30px;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    min-height: 200px;
    background: #fff;
    text-align: center;
    .opeartion {
      color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      visibility: hidden;
      height: 40px;
      background: rgba($color: #fff, $alpha: 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      > img {
        width: 30px;
        height: 30px;
        display: block;
      }
    }
    &:hover .opeartion {
      visibility: visible;
    }
    .close {
      width: 30px;
      height: 30px;
      position: absolute;
      top: -15px;
      left: -40px;
    }
    .img-item {
      height: 100%;
      display: block;
    }
  }
  @media (max-width: 600px) {
    .dialog-content {
      top: 20%;
      bottom: auto;
      width: 90%;
      max-height: 60%;
      .img-item {
        width: 100%;
      }
      .close {
        top: -40px;
        left: -15px;
      }
      .opeartion {
        visibility: hidden;
      }
    }
  }
}
</style>
