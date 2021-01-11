<template>
  <div class="o-contract">
    <Modal :title="title" @displayFn="displayModal">
      <div class="d-content">
        <div class="stuff" v-for="(item, index) in contractList" :key="index">
          <div class="vender">
            <p class="text-remark text-m">{{item.qsRq}}-劳动合同</p>
          </div>
          <div class="s-infos">
            <div class="s-item">
              <ul>
                <li>
                  <span class="text-gray text-s">员工姓名</span>
                  <p class="text-black text-s">{{stuffName}}</p>
                </li>
                <li>
                  <span class="text-gray text-s">合同签署日期</span>
                  <p class="text-black text-s">{{item.qsRq}}</p>
                </li>
                <li>
                  <span class="text-gray text-s">合同起止日期</span>
                  <p class="text-black text-s">{{item.htSt}}至{{item.htEt}}</p>
                </li>
                <li>
                  <span class="text-gray text-s">合同工资</span>
                  <p class="text-black text-s">{{item.zzgz|thounds}}</p>
                </li>
                <li>
                  <span class="text-gray text-s">备注</span>
                  <p class="text-black text-s">{{item.bz}}</p>
                </li>
              </ul>
            </div>
            <div class="s-item">
              <ul>
                <li>
                  <span class="text-gray text-s">职务</span>
                  <p class="text-black text-s">{{item.zw}}</p>
                </li>
                <li>
                  <span class="text-gray text-s">试用期月数</span>
                  <p class="text-black text-s">{{item.syqx}}</p>
                </li>
                <li>
                  <span class="text-gray text-s">合同试用期日期</span>
                  <p class="text-black text-s">{{item.sySt}}至{{item.syEt}}</p>
                </li>
                <li>
                  <span class="text-gray text-s">试用期工资</span>
                  <p class="text-black text-s">{{item.sygz|thounds}}</p>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
        <div class="not-data text-m text-black" v-if="contractList.length == 0">暂无数据</div>
      </div>
    </Modal>
  </div>
</template>
<script>

import Modal from "../../components/Modal";
import { getLdht } from "../../utils/apis";

export default {
  name: 'oContract',
  components: { Modal },
  props: {
    title: String,
    sxgId: String,
    stuffName: String
  },
  data: function(){
    return{
      contractList: []
    }
  },
  mounted() {
    // 劳动合同列表
    this.getLdhtList({sxgId: this.sxgId});
  },
  methods: {
    // 劳动合同详情列表
    async getLdhtList(params){
      let result = await getLdht(params);
      if(result.status == 1){
        this.contractList = result.data;
      }
    },
    // 隐藏显示modal 回调
    displayModal(visible){
      this.$emit('closeContractFn', visible);
    }
  }
}
</script>
<style lang="scss" scoped>
    .o-contract{
      text-align: center;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      .d-content{
        padding: 20px 24px 0;
        .stuff{
          text-align: left;
          border-bottom: 1px solid #DBDBDB;
          &:not(:first-child){
            margin-top: 20px;
          }
          &:last-child{
            border-bottom: none;
          }
          .s-infos{
            display: flex;
            padding: 10px 16px;
            .s-item{
              &:last-child{
                margin-left: 60px;
              }
              ul{
                li{
                  line-height: 30px;
                  span{
                    text-align: right;
                    display: inline-block;
                    width: 84px;
                    margin-right: 10px;
                  }
                  p{
                    display: inline-block;
                  }
                }
              }
            }
          }
          .not-data{
            text-align: center;
          }
        }
      }
    }
</style>