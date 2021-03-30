<template>
  <div class="home">
    <div class="wrap">
      <div class="menus">
        <!-- <div class="title">
          <h2 @click="skipHome">CAMERA</h2>
          <p>免费下载</p>
        </div> -->
        <div class="tags">
          <div class="item" v-for="(item, index) in categorys" :key="index" @click="skipFilter(item)">
            <img :src="item.iconUrl" />
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <!-- <water-full2 :images="imgsArr" :more="loadMore" :click="itemClick" :isEnd="isEnd">
        <div>this is title</div>
      </water-full2> -->
      <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="loadMore"></vue-waterfall-easy>
    </div>
    <Dialog :imgSrc="imgSrc" :display="dialogDisplay" @dialogClose="dialogClose" :downLoad="downLoadImage" />
  </div>
</template>

<script>
// import WaterFull from '../../components/WaterFull'
// import WaterFull2 from '../../components/WaterFull2'
import vueWaterfallEasy from 'vue-waterfall-easy'
import Dialog from '../../components/Dialog'
import axios from 'axios'
import { downloadFile } from '../../utils'
import { getCategorys, getArticles } from '../../utils/apis'


export default {
  name: "home",
  components: { vueWaterfallEasy, Dialog },
  data: function () {
    return {
      imgsArr: [],
      imgSrc: '',
      isEnd: false,
      dialogDisplay: false,
      categorys: [],
      params: {
        pageIndex: 1,
        termId: '',
        limit: 20,
        deleted: 0,
        offset: 0
      }
    };
  },
  computed: {

  },
  mounted() {
    const termId = this.$route.query.ats
    if (termId) {
      this.params.termId = termId
    }
    this.getCatetories()
    this.getList()
  },
  methods: {
    async loadMore () {
      const { limit } = this.params
      let pageIndex = this.params.pageIndex
      ++pageIndex
      const offset = (pageIndex - 1) * limit
      this.params.offset = offset
      if (!this.isEnd) {
        const res = await getArticles(this.params)
        if (res && res.list.length) {
          let list = res.list
          list.forEach((item) => {
            item.src = item.imgUrl
          })
          this.params.pageIndex = pageIndex
          this.imgsArr = this.imgsArr.concat(list)
        } else {
          this.isEnd = true
        }
      }
    },
    async getList() {
      const res = await getArticles(this.params)
      if (res && res.list) {
        let list = res.list
        list.forEach((item) => {
          item.src = item.imgUrl
        })
        this.imgsArr = list
      }
    },
    itemClick (item) {
      this.imgSrc = item.imgUrl
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
    },
    // 链接跳转
    skipFilter(item) {
      this.params = {
        pageIndex: 1,
        limit: 10,
        deleted: 0,
        offset: 0,
        termId: item.termId
      }
      window.location.href= `?ats=${item.termId}`
    },
    skipHome() {
      window.location.href= '/'
    }
  }
};
</script>
<style lang="scss">
.home {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  .wrap {
    width: 100%;
    // height: 100%;
    padding: 0 50px;
    .menus {
      // height: 200px;
      // margin-top: 60px;
      margin-bottom: 14px;
      text-align: center;
      .title {
        > h2 {
          cursor: pointer;
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
        width: 100%;
        overflow-x: auto;
        height: 40px;
        // justify-content: center;
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
      width: 2000px;
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
