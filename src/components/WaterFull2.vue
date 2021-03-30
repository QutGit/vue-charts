<template>
  <div class="water-full">
    <div class="list" v-if="images.length > 0">
      <div class="item animate__animated animate__fadeIn" v-for="(item, index) in images" :key="index" @click="itemClick(item)">
        <!-- <zImage :src="item.imgUrl" class="img-item" :style="{width: isMobile ? '100%' : imgWidth }" /> -->
        <zImage :src="item.imgUrl" class="img-item" />
        <slot></slot>
      </div>
    </div>
    <div v-else class="no-data">
      ooh! 您的相机被黑洞吸走啦~~
    </div>
    <div class="no-data" v-if="isEnd">
      哎呀，被你看光啦~
    </div>
  </div>
</template>
<script>
  import { EventBus } from '../utils/eventbus'
  import zImage from '../components/Image'

  export default {
    name: "WaterFull",
    components: { zImage },
    props: {
      images: Array,
      more: Function,
      click: Function,
      // 每列之间的间隙
      pcgap: { type: Number, default: 10 },
      isEnd: { type: Boolean, default: false }
    },
    data: function() {
      return {
        imgsArr: [],
        box: null,
        items: [],
        isMobile: this.userAgent(),
        gap: this.pcgap // 定义每一列之间的间隙 为10像素
      };
    },
    mounted() {
      const isMobile = this.userAgent()
      this.gap = isMobile ? 0 : this.gap
      EventBus.$on('line_in_the_sand', () => {
        this.more()
      })
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
      itemClick (item) {
        this.click(item)
      }
    }
  };
</script>
<style lang="scss">
.water-full {
  // height: 100%;
  width: 100%;
  .list {
    column-count: 4;
    column-gap: 10px;
    .item {
      margin-top: 10px;
      cursor: pointer;
      > img {
        display: block;
        width: 100%;
        opacity: 1;
        transition: 1s;
      }
    }
  }
  .no-data {
    text-align: center;
    height: 100px;
    line-height: 100px;
    font-size: 14px;
    color: #a6aaad;

  }
  @media (max-width: 300px) {
    .list {
      column-count: 1;
    }
  }
  @media (max-width: 1920px) {
    .list {
      column-count: 3;
    }
  }
}
</style>
