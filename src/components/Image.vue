<template>
  <img v-if="isImg" :src="fileSrc" />
  <video v-else :src="fileSrc" autoplay loop>
    <img v-if="isImg" src="http://qiniu.zuolinju.com/kama/pexels-emre-can-2110951.jpg?imageView2/0/h/800" />
  </video>
</template>
<script>
  import { getExt, supportWebp } from '../utils'
  export default {
    name: "zImage",
    props: {
      src: { type: String, default: 'http://qiniu.zuolinju.com/kama/pexels-emre-can-2110951.jpg?imageView2/0/h/800' },
    },
    data: function() {
      return {
        fileExt: '',
        fileSrc: '',
        isImg: true
      };
    },
    mounted() {
      const fileExt = getExt(this.src)
      const isWebp = supportWebp()
      const imgExts = ['jpg', 'jpeg', 'png', 'webp', 'ico', 'bmp', 'gif', 'svg', 'raw', 'apng', 'tif']
      const isImage = imgExts.includes(fileExt) ? true : false
      // 七牛压缩格式
      const imgSuffix = isImage ? `?imageView2/0/h/500` : ''
      const webpStuffix = isImage ? `?imageView2/0/h/500/format/webp` : ''
      this.fileSrc = isWebp ? `${this.src}${webpStuffix}` : `${this.src}${imgSuffix}`
      this.isImg = isImage
    },
    methods: {

    }
  };
</script>
<style lang="scss">

</style>
