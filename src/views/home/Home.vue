<template>
  <div class="home">
    <div class="wrap">
      <div class="menus">
        <div class="title">
          <h2>CAMERA</h2>
          <p>免费下载</p>
        </div>
        <div class="tags">
          <div class="item" v-for="(item, index) in categorys" :key="index">
            <img :src="item.iconUrl" />
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <water-full :images="imgsArr" :more="loadMore" :click="itemClick" imgWidth="400px">
        <!-- <div>this is title</div> -->
      </water-full>
    </div>
    <Dialog :imgSrc="imgSrc" :display="dialogDisplay" @dialogClose="dialogClose" :downLoad="downLoadImage" />
  </div>
</template>

<script>
import WaterFull from '../../components/WaterFull'
import Dialog from '../../components/Dialog'
import axios from 'axios'
import { downloadFile } from '../../utils'
import { getCategorys } from '../../utils/apis'


export default {
  name: "home",
  components: { WaterFull, Dialog },
  data: function () {
    return {
      imgsArr: [],
      tags: [],
      imgSrc: '',
      dialogDisplay: false,
      categorys: []
    };
  },
  computed: {
    
  },
  mounted() {
    const href = 'http://chuanda.zuolinju.com'
    const info = '大摄影家'
    this.imgsArr = [
      {src: "https://qiniu.zuolinju.com/kama/pexels-taina%CC%81-bernard-3497525.jpg", href, info},
      {src: "https://qiniu.zuolinju.com/kama/pexels-emre-can-2110951.jpg", href, info},
      {src: "https://qiniu.zuolinju.com/kama/pexels-anna-shvets-4483103.jpg", href, info},
      {src: "https://qiniu.zuolinju.com/kama/pexels-evgeny-tchebotarev-2541310.jpg", href, info},
      {src: "https://qiniu.zuolinju.com/kama/pexels-wendy-wei-2020267.jpg", href, info},
      {src: "https://qiniu.zuolinju.com/kama/pexels-gustavo-fring-4241339.jpg", href, info},
      {src: "https://qiniu.zuolinju.com/kama/pexels-rfstudio-3817580%20%281%29.jpg", href, info},
      {src: "https://qiniu.zuolinju.com/kama/pexels-w-w-889839.jpg", href, info},
      {src: "https://qiniu.zuolinju.com/kama/pexels-ricardo-esquivel-1964471.jpg", href, info},
      {src: "https://qiniu.zuolinju.com/kama/pexels-motional-studio-1081685.jpg", href, info}
    ]

    let arr = []
    for (let i = 0; i < 20; i++) {
      arr.push({ id: i, title: `人像${i}`, url: 'http://qiniu.zuolinju.com/kama/kama.png' })
    }
    this.tags = arr
    this.getCatetories()
  },
  methods: {
    loadMore () {
      const imgages = this.imgsArr
      this.imgsArr = this.imgsArr.concat(imgages)
    },
    itemClick (item) {
      this.imgSrc = item.src
      this.dialogDisplay = true
      console.log(item)
    },
    dialogClose (flag) {
      this.dialogDisplay = flag
    },
    async downLoadImage (url) {
      const res = await axios.get(url, { responseType: 'blob' })
      downloadFile(res, 'kama', 'jpg')
    },
    async getCatetories () {
      const res = await getCategorys()
      if (res && res.code === 0) {
        this.categorys = res.list
      }
    }
  }
};
</script>
<style lang="scss">
.home {
  background: #f5f5f5;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  .wrap {
    width: 100%;
    padding: 0 50px;
    .menus {
      height: 200px;
      margin-top: 60px;
      margin-bottom: 14px;
      text-align: center;
      .title {
        > h2 {
          padding-top: 50px;
          font-weight: 600;
          font-size: 26px;
        }
        > p {
          color: #a6aaad;
          font-size: 14px;
          margin-top: 15px;
        }
      }
      .tags {
        margin-top: 30px;
        display: inline-flex;
        white-space: nowrap;
        width: 80%;
        overflow-x: auto;
        height: 40px;
        justify-content: center;
        &::-webkit-scrollbar {
          display: none;
        }
        .item {
          margin: 0 8px;
          border-radius: 20px;
          box-shadow: 0 3px 5px 0 rgb(0 0 0 / 8%);
          padding: 0 14px 0 4px;
          display: flex;
          align-items: center;
          height: 36px;
          cursor: pointer;
          &:hover {
            background: rgba($color: #000000, $alpha: 0.1);
          }
          > img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
          }
          > span {
            color: #5e5e5e;
            font-size: 14px;
            line-height: 23px;
            font-weight: 700;
          }
        }
      }
    }
  }
  @media (min-width: 1900px) {
    .wrap {
      width: 2300px;
    }
    .tags {
      width: 60%;
    } 
  }
  @media (max-width: 900px) {
    .wrap {
      width: 100%;
      padding: 0 20px;
      .menus {
        .tags {
          width: 100%;
        } 
      }
    }
  }
}
</style>
