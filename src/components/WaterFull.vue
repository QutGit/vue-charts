<template>
  <div class="water-full">
    <div class="list" id="box" ref="waterFull">
      <div class="item" v-for="(item, index) in images" :key="index" @click="itemClick(item)">
        <!-- <img :src="item.src" :style="{width: isMobile ? '100%' : imgWidth }" /> -->
        <zImage :src="item.src" class="img-item" :style="{width: isMobile ? '100%' : imgWidth }" />
        <slot></slot>
      </div>
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
      imgWidth: { type: String, default: '300px' }
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
      window.onload = () => {
        const box = this.$refs.waterFull
        box.style.visibility = 'hidden'
        var items = box.children;
        this.box = box
        this.items = items
        // 一进来就调用一次
        this.waterFall()
      }
      window.onresize = () => {
        this.onReaize()
      }
      EventBus.$on('line_in_the_sand', () => {
        this.more()
        this.$nextTick(() => {
          this.waterFall()
        })
      })
    },
    methods: {
      waterFall () {
        const items = this.items
        if (!items.length) return
        // 1- 确定列数  = 页面的宽度 / 图片的宽度
        var pageWidth = this.getClient().width;
        var itemWidth = items[0].offsetWidth;
        var columns = parseInt(pageWidth / (itemWidth + this.gap));
        const residue = parseInt(pageWidth % (itemWidth + this.gap))
        const offsetR = (residue/2).toFixed(0)
        var arr = [];
        for (var i = 0; i < items.length; i++) {
          if (i < columns) {
            // 2- 确定第一行
            items[i].style.top = 0;
            items[i].style.left = (itemWidth + this.gap) * i + Number(offsetR) + 'px';
            arr.push(items[i].offsetHeight);
          } else {
            // 其他行
            // 3- 找到数组中最小高度  和 它的索引
            var minHeight = arr[0];
            var index = 0;
            for (var j = 0; j < arr.length; j++) {
              if (minHeight > arr[j]) {
                minHeight = arr[j];
                index = j;
              }
            }
            // 4- 设置下一行的第一个盒子位置
            // top值就是最小列的高度 + gap
            items[i].style.top = arr[index] + this.gap + 'px';
            // left值就是最小列距离左边的距离
            items[i].style.left = items[index].offsetLeft + 'px';

            // 5- 修改最小列的高度 
            // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
            arr[index] = arr[index] + items[i].offsetHeight + this.gap;
          }
        }
        box.style.visibility = 'visible'
      },
      onReaize () {
        this.waterFall()
      },
      getClient () {
        return {
          width: this.box.offsetWidth,
          height: this.box.offsetHeight
        }
      },
      getScrollTop () {
        return window.pageYOffset || document.documentElement.scrollTop;
      },
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
  height: 100%;
  width: 100%;
  .list {
    height: 100%;
    position: relative;
    margin: 0 auto;
    visibility: hidden;
    .item {
      position: absolute;
      cursor: pointer;
    }
  }
}
</style>
