<template>
  <div class="s-details">
    <Modal :title="title" @displayFn="displayModal" size="max">
      <div class="s-content">
        <div class="vender">
          <div class="input">
            <el-input class="search" placeholder="姓名/证件号码/城市" size="small" v-model="searchText" prefix-icon="el-icon-search" />
          </div>
          <button class="btn-search" @click="query">查 询</button>
          <div class="export" @click="exportExcel">
            <img src="../../assets/export.png" alt="">
            <span class="text-s text-black">导出</span>
          </div>
        </div>
        <div class="customer">
          <div class="vender">
            <p class="text-remark text-m">客户项目基本信息</p>
          </div>
          <div class="c-table">
            <el-table :data="list" stripe :header-cell-style="headStyle" :cell-style="cellStyle">
              <el-table-column prop="dlMc" label="项目类型"></el-table-column>
              <el-table-column prop="cpMc" label="项目名称"></el-table-column>
              <el-table-column label="金额（不含税）"><template slot-scope="scope">{{ scope.row.jjg | thounds }}</template></el-table-column>
              <el-table-column label="增值税"><template slot-scope="scope">{{ scope.row.zzs | thounds }}</template></el-table-column>
              <el-table-column label="金额（含税）"><template slot-scope="scope">{{ scope.row.je | thounds }}</template></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="stuff customer">
          <div class="vender">
            <p class="text-remark text-m">员工明细</p>
            <div class="setting">
              <span class="l-view test-remark text-s" :class="{'active': viewType == 1}" @click="changeViewType(1)">列表视图</span>
              <span class="t-view test-remark text-s" :class="{'active': viewType == 2}" @click="changeViewType(2)">缩略视图</span>
              <p class="f-screen" @click="fullScreen()">
                <img class="v-screen" alt="全屏显示" src="../../assets/f-screen.png" />
                <span class="test-remark text-s">全屏</span>
              </p>
            </div>
          </div>
          <div class="c-table" v-if="viewType == 1">
            <el-table align="center" max-height="500" :data="stuffList" stripe :header-cell-style="headStyle" :cell-style="cellStyle">
              <el-table-column align="center" prop="xm" fixed label="员工姓名" width="90"></el-table-column>
              <el-table-column align="center" prop="sfzHm" fixed label="证件号码" width="170px"></el-table-column>
              <el-table-column align="center" prop="fwny" fixed label="服务年月" width="90"></el-table-column>
              <el-table-column align="center" prop="cs" fixed label="城市"></el-table-column>
              <el-table-column align="center" label="社保" v-if="stuffHead['s1']">
                <el-table-column prop="sbQyje" label="单位合计" width="90"><template slot-scope="scope">{{ scope.row.sbQyje | thounds }}</template></el-table-column>
                <el-table-column prop="sbGrje" label="个人合计" width="90"><template slot-scope="scope">{{ scope.row.sbGrje | thounds }}</template></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="公积金" v-if="stuffHead['s2']">
                <el-table-column prop="gjjQyje" label="单位合计" width="90"><template slot-scope="scope">{{ scope.row.gjjQyje | thounds }}</template></el-table-column>
                <el-table-column prop="gjjbGrje" label="个人合计" width="90"><template slot-scope="scope">{{ scope.row.gjjbGrje | thounds }}</template></el-table-column>
              </el-table-column>
              <el-table-column align="center" prop="czjJe" label="残障金" v-if="stuffHead['s8']"></el-table-column>
              <el-table-column label="薪资" v-if="stuffHead['s5']">
                <el-table-column prop="sf" label="实发" width="90"><template slot-scope="scope">{{ scope.row.sf | thounds }}</template></el-table-column>
                <el-table-column prop="gs" label="个税" width="90"><template slot-scope="scope">{{ scope.row.gs | thounds }}</template></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="商业保险" v-if="stuffHead['s3']">
                <el-table-column prop="sbJeJjg" label="金额 ( 不含税 )" width="120"><template slot-scope="scope">{{ scope.row.sbJeJjg | thounds }}</template></el-table-column>
                <el-table-column prop="sbZzs" label="增值税"><template slot-scope="scope" width="90">{{ scope.row.sbZzs | thounds }}</template></el-table-column>
                <el-table-column prop="sbJe" label="金额"><template slot-scope="scope" width="90">{{ scope.row.sbJe | thounds }}</template></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="代收代付其它" v-if="stuffHead['s4']">
                <el-table-column prop="dsdfQyje" label="单位合计" width="90"><template slot-scope="scope">{{ scope.row.dsdfQyje | thounds }}</template></el-table-column>
                <el-table-column prop="dsdfGrje" label="个人合计" width="90"><template slot-scope="scope">{{ scope.row.dsdfGrje | thounds }}</template></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="服务费" v-if="stuffHead['s7']">
                <el-table-column prop="fwfJeJjg" label="金额 ( 不含税 )" width="120"><template slot-scope="scope">{{ scope.row.fwfJeJjg | thounds }}</template></el-table-column>
                <el-table-column prop="fwfZzs" label="增值税" width="90"><template slot-scope="scope" width="90px">{{ scope.row.fwfZzs | thounds }}</template></el-table-column>
                <el-table-column prop="fwfJe" label="金额" width="90"><template slot-scope="scope" width="90px">{{ scope.row.fwfJe | thounds }}</template></el-table-column>
              </el-table-column>
              <el-table-column prop="zje" align="center" width="100px" label="应收合计" ><template slot-scope="scope">{{ scope.row.zje | thounds }}</template></el-table-column>
            </el-table>
          </div>
          <div class="c-list" v-if="viewType == 2">
            <div class="list" v-for="(item, index) in stuffList" :key="index">
              <div class="item">
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">员工姓名</span>
                    <span class="value text-black text-s">{{item.xm}}</span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">证件号码</span>
                    <span class="value text-black text-s">{{item.sfzHm}}</span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">服务年月</span>
                    <span class="value text-black text-s">{{item.fwny}}</span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">城市</span>
                    <span class="value text-black text-s">{{item.cs}}</span>
                  </div>
                </div>
              </div>
              <div class="item" v-if="stuffHead['s1']">
                <div class="c-title">
                  <span class="text-s">社保</span>
                </div>
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">单位合计</span>
                    <span class="value text-black text-s">{{item.sbQyje | thounds}}</span>
                  </div>
                  <div class="c-t">
                    <span class="name text-remark text-s">个人合计</span>
                    <span class="value text-black text-s">{{item.sbGrje | thounds}}</span>
                  </div>
                </div>
              </div>
              <div class="item" v-if="stuffHead['s2']">
                <div class="c-title">
                  <span class="text-s">公积金</span>
                </div>
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">单位合计</span>
                    <span class="value text-black text-s">{{item.gjjQyje | thounds}}</span>
                  </div>
                  <div class="c-t">
                    <span class="name text-remark text-s">个人合计</span>
                    <span class="value text-black text-s">{{item.gjjbGrje | thounds}}</span>
                  </div>
                </div>
              </div>
              <div class="item" v-if="stuffHead['s8']">
                <div class="c-title">
                  <span class="text-s">残障金</span>
                </div>
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">金额</span>
                    <span class="value text-black text-s">{{item.czjJe | thounds}}</span>
                  </div>
                </div>
              </div>
              <div class="item" v-if="stuffHead['s5']">
                <div class="c-title">
                  <span class="text-s">薪资</span>
                </div>
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">实发</span>
                    <span class="value text-black text-s">{{item.sf | thounds}}</span>
                  </div>
                  <div class="c-t">
                    <span class="name text-remark text-s">个税</span>
                    <span class="value text-black text-s">{{item.gs | thounds}}</span>
                  </div>
                </div>
              </div>
              <div class="item" v-if="stuffHead['s3']">
                <div class="c-title">
                  <span class="text-s">商业保险</span>
                </div>
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">金额 ( 不含税 )</span>
                    <span class="value text-black text-s">{{item.sbJeJjg | thounds}}</span>
                  </div>
                  <div class="c-t">
                    <span class="name text-remark text-s">增值税</span>
                    <span class="value text-black text-s">{{item.sbZzs | thounds}}</span>
                  </div>
                  <div class="c-t">
                    <span class="name text-remark text-s">金额</span>
                    <span class="value text-black text-s">{{item.sbJe | thounds}}</span>
                  </div>
                </div>
              </div>
              <div class="item" v-if="stuffHead['s4']">
                <div class="c-title">
                  <span class="text-s">代收代付其它</span>
                </div>
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">单位合计</span>
                    <span class="value text-black text-s">{{item.dsdfQyje | thounds}}</span>
                  </div>
                  <div class="c-t">
                    <span class="name text-remark text-s">个人合计</span>
                    <span class="value text-black text-s">{{item.dsdfGrje | thounds}}</span>
                  </div>
                </div>
              </div>
              <div class="item" v-if="stuffHead['s7']">
                <div class="c-title">
                  <span class="text-s">服务费</span>
                </div>
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">金额 ( 不含税 )</span>
                    <span class="value text-black text-s">{{item.fwfJeJjg | thounds}}</span>
                  </div>
                  <div class="c-t">
                    <span class="name text-remark text-s">增值税</span>
                    <span class="value text-black text-s">{{item.fwfZzs | thounds}}</span>
                  </div>
                  <div class="c-t">
                    <span class="name text-remark text-s">金额</span>
                    <span class="value text-black text-s">{{item.fwfJe | thounds}}</span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="c-title">
                  <span class="text-s">应收合计</span>
                </div>
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">金额</span>
                    <span class="value text-black text-s">{{item.zje | thounds}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页组件 -->
          <div class="pagedevide">
            <el-pagination @current-change="handleCurrentChange" :current-page="pageNumber" :page-size="pageSize" :background="true"  layout="slot, prev, pager, next, jumper" :total="total" :hide-on-single-page="true">
              <div class="pagination-slot">
                <b>共</b>
                <span>{{totalSize}}</span>
                <b>页 /</b>
                <span>{{total}}</span>
                <b>条</b>
              </div>
            </el-pagination>
          </div>

        </div>
      </div>
    </Modal>
    <Fscreen title="员工明细" :viewType="viewType" v-if="isFscreen" @displayFscreen="dspFscreen">
      <div class="s-content">
        <div class="stuff customer c-fscreen">
          <div class="vender">
            <p class="text-remark text-m">员工明细</p>
            <div class="setting">
              <span class="l-view test-remark text-s" :class="{'active': viewType == 1}" @click="changeViewType(1)">列表视图</span>
              <span class="t-view test-remark text-s" :class="{'active': viewType == 2}" @click="changeViewType(2)">缩略视图</span>
              <p class="f-screen" @click="exitFullScreen()">
                <img class="v-screen" alt="全屏显示" src="../../assets/s-screen.png" />
                <span class="test-remark text-s">退出全屏</span>
              </p>
            </div>
          </div>
          <div class="c-table" v-if="viewType == 1">
            <el-table align="center" style="width: 100%" max-height="420" :data="stuffList" stripe :header-cell-style="headStyle" :cell-style="cellStyle">
              <el-table-column prop="xm" fixed label="员工姓名" width="90"></el-table-column>
              <el-table-column prop="sfzHm" fixed label="证件号码" width="170px"></el-table-column>
              <el-table-column prop="fwny" fixed label="服务年月" width="90"></el-table-column>
              <el-table-column prop="cs" fixed label="城市"></el-table-column>
              <el-table-column align="center" label="社保" v-if="stuffHead['s1']">
                <el-table-column prop="sbQyje" label="单位合计" width="90"><template slot-scope="scope">{{ scope.row.sbQyje | thounds }}</template></el-table-column>
                <el-table-column prop="sbGrje" label="个人合计" width="90"><template slot-scope="scope">{{ scope.row.sbGrje | thounds }}</template></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="公积金" v-if="stuffHead['s2']">
                <el-table-column prop="gjjQyje" label="单位合计" width="90"><template slot-scope="scope">{{ scope.row.gjjQyje | thounds }}</template></el-table-column>
                <el-table-column prop="gjjbGrje" label="个人合计" width="90"><template slot-scope="scope">{{ scope.row.gjjbGrje | thounds }}</template></el-table-column>
              </el-table-column>
              <el-table-column align="center" prop="czjJe" label="残障金" v-if="stuffHead['s8']"></el-table-column>
              <el-table-column label="薪资" v-if="stuffHead['s5']">
                <el-table-column prop="sf" label="实发" width="90"><template slot-scope="scope">{{ scope.row.sf | thounds }}</template></el-table-column>
                <el-table-column prop="gs" label="个税" width="90"><template slot-scope="scope">{{ scope.row.gs | thounds }}</template></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="商业保险" v-if="stuffHead['s3']">
                <el-table-column prop="sbJeJjg" label="金额 ( 不含税 )" width="120"><template slot-scope="scope">{{ scope.row.sbJeJjg | thounds }}</template></el-table-column>
                <el-table-column prop="sbZzs" label="增值税"><template slot-scope="scope" width="90">{{ scope.row.sbZzs | thounds }}</template></el-table-column>
                <el-table-column prop="sbJe" label="金额"><template slot-scope="scope" width="90">{{ scope.row.sbJe | thounds }}</template></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="代收代付其它" v-if="stuffHead['s4']">
                <el-table-column prop="dsdfQyje" label="单位合计" width="90"><template slot-scope="scope">{{ scope.row.dsdfQyje | thounds }}</template></el-table-column>
                <el-table-column prop="dsdfGrje" label="个人合计" width="90"><template slot-scope="scope">{{ scope.row.dsdfGrje | thounds }}</template></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="服务费" v-if="stuffHead['s7']">
                <el-table-column prop="fwfJeJjg" label="金额 ( 不含税 )" width="120"><template slot-scope="scope">{{ scope.row.fwfJeJjg | thounds }}</template></el-table-column>
                <el-table-column prop="fwfZzs" label="增值税" width="90"><template slot-scope="scope" width="90px">{{ scope.row.fwfZzs | thounds }}</template></el-table-column>
                <el-table-column prop="fwfJe" label="金额" width="90"><template slot-scope="scope" width="90px">{{ scope.row.fwfJe | thounds }}</template></el-table-column>
              </el-table-column>
              <el-table-column prop="zje" align="center" width="100px" label="应收合计" ><template slot-scope="scope">{{ scope.row.zje | thounds }}</template></el-table-column>
            </el-table>
          </div>
          <div class="c-list" v-if="viewType == 2">
            <div class="list" v-for="(item, index) in stuffList" :key="index">
              <div class="item">
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">员工姓名</span>
                    <span class="value text-black text-s">{{item.xm}}</span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">证件号码</span>
                    <span class="value text-black text-s">{{item.sfzHm}}</span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">服务年月</span>
                    <span class="value text-black text-s">{{item.fwny}}</span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">城市</span>
                    <span class="value text-black text-s">{{item.cs}}</span>
                  </div>
                </div>
              </div>
              <div class="item" v-if="stuffHead['s1']">
                <div class="c-title">
                  <span class="text-s">社保</span>
                </div>
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">单位合计</span>
                    <span class="value text-black text-s">{{item.sbQyje | thounds}}</span>
                  </div>
                  <div class="c-t">
                    <span class="name text-remark text-s">个人合计</span>
                    <span class="value text-black text-s">{{item.sbGrje | thounds}}</span>
                  </div>
                </div>
              </div>
              <div class="item" v-if="stuffHead['s2']">
                <div class="c-title">
                  <span class="text-s">公积金</span>
                </div>
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">单位合计</span>
                    <span class="value text-black text-s">{{item.gjjQyje | thounds}}</span>
                  </div>
                  <div class="c-t">
                    <span class="name text-remark text-s">个人合计</span>
                    <span class="value text-black text-s">{{item.gjjbGrje | thounds}}</span>
                  </div>
                </div>
              </div>
              <div class="item" v-if="stuffHead['s8']">
                <div class="c-title">
                  <span class="text-s">残障金</span>
                </div>
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">金额</span>
                    <span class="value text-black text-s">{{item.czjJe | thounds}}</span>
                  </div>
                </div>
              </div>
              <div class="item" v-if="stuffHead['s5']">
                <div class="c-title">
                  <span class="text-s">薪资</span>
                </div>
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">实发</span>
                    <span class="value text-black text-s">{{item.sf | thounds}}</span>
                  </div>
                  <div class="c-t">
                    <span class="name text-remark text-s">个税</span>
                    <span class="value text-black text-s">{{item.gs | thounds}}</span>
                  </div>
                </div>
              </div>
              <div class="item" v-if="stuffHead['s3']">
                <div class="c-title">
                  <span class="text-s">商业保险</span>
                </div>
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">金额 ( 不含税 )</span>
                    <span class="value text-black text-s">{{item.sbJeJjg | thounds}}</span>
                  </div>
                  <div class="c-t">
                    <span class="name text-remark text-s">增值税</span>
                    <span class="value text-black text-s">{{item.sbZzs | thounds}}</span>
                  </div>
                  <div class="c-t">
                    <span class="name text-remark text-s">金额</span>
                    <span class="value text-black text-s">{{item.sbJe | thounds}}</span>
                  </div>
                </div>
              </div>
              <div class="item" v-if="stuffHead['s4']">
                <div class="c-title">
                  <span class="text-s">代收代付其它</span>
                </div>
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">单位合计</span>
                    <span class="value text-black text-s">{{item.dsdfQyje | thounds}}</span>
                  </div>
                  <div class="c-t">
                    <span class="name text-remark text-s">个人合计</span>
                    <span class="value text-black text-s">{{item.dsdfGrje | thounds}}</span>
                  </div>
                </div>
              </div>
              <div class="item" v-if="stuffHead['s7']">
                <div class="c-title">
                  <span class="text-s">服务费</span>
                </div>
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">金额 ( 不含税 )</span>
                    <span class="value text-black text-s">{{item.fwfJeJjg | thounds}}</span>
                  </div>
                  <div class="c-t">
                    <span class="name text-remark text-s">增值税</span>
                    <span class="value text-black text-s">{{item.fwfZzs | thounds}}</span>
                  </div>
                  <div class="c-t">
                    <span class="name text-remark text-s">金额</span>
                    <span class="value text-black text-s">{{item.fwfJe | thounds}}</span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="c-title">
                  <span class="text-s">应收合计</span>
                </div>
                <div class="c-cell">
                  <div class="c-t">
                    <span class="name text-remark text-s">金额</span>
                    <span class="value text-black text-s">{{item.zje | thounds}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 分页组件 -->
          <div class="pagedevide">
            <el-pagination @current-change="handleCurrentChange" :current-page="pageNumber" :page-size="pageSize" :background="true"  layout="slot, prev, pager, next, jumper" :total="total" :hide-on-single-page="true">
              <div class="pagination-slot">
                <b>共</b>
                <span>{{totalSize}}</span>
                <b>页 /</b>
                <span>{{total}}</span>
                <b>条</b>
              </div>
            </el-pagination>
          </div>
        </div>
      </div>
    </Fscreen>
  </div>
</template>
<script>

import Modal from "../../components/Modal";
import Fscreen from "./Fscreen";
import { getYsYcx, getYsmx } from "../../utils/apis";

export default {
  name: 'sDetails',
  components: { Modal,Fscreen },
  props: {
    title: String,
    statementId: String
  },
  data: function(){
    return{
      headStyle: { height: '40px', background: '#F2F2F2', 'font-size': '12px', 'font-weight': '400', 'padding-left': '14px' },
      cellStyle: { height: '40px', 'font-size': '12px', 'padding-left': '14px', 'box-shadow': '0px -1px 0px 0px rgba(0,0,0,0.1);' },
      display: false,
      searchText: '',
      startTime: '',
      list: [],
      stuffList: [],
      stuffHead: {},
      total: 0,
      pageNumber: 1,
      totalSize: 0,
      pageSize: 20,
      isFscreen: false,
      viewType: 1,
    }
  },
  mounted() {
    // 客户基本信息
    this.getYsYcxList({ysId: this.statementId});
    // 员工信息
    this.query();
  },
  methods: {
    async getYsYcxList(params){
      let result = await getYsYcx(params);
      if(result.status == 1){
        this.list = result.data;
      }
    },
    async getYsmxList(params){
      let result = await getYsmx(params);
      if(result.status == 1){
        this.stuffList = result.data;
        this.stuffHead = result.head;
        this.total = result.total || 0;
        this.totalSize = Math.ceil(this.total / this.pageSize);
      }
    },
    query(){
      // 员工信息
      this.getYsmxList({ysId: this.statementId, qCon: this.searchText, pageSize: this.pageSize, pageNumber: this.pageNumber});
    },
    handleCurrentChange(page) {
      this.pageNumber = page;
      this.query();
    },
    // 隐藏显示modal 回调
    displayModal(visible){
      this.$emit('closeDetailsFn', visible);
    },
    // 导出按钮
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => {
        return filterVal.map(j => {
          return v[j] || 0;
        })
      })
    },
    arrSubtraction2(a, b) {
      if (Array.isArray(a) && Array.isArray(b)) {
        return a.filter(i => !b.includes(i))
      }
      throw new Error('arrSubtraction(): Wrong Param Type')
    },
    // 合并单元格导出
    exportExcel(){
       this.$message({ type: 'success', message: "正在导出excel" });
      getYsmx({ysId: this.statementId, qCon: this.searchText, pageSize: 20000, pageNumber: 1}).then((result) =>{
        if(result.status == 1){
          let list = result.data;
          let head = result.head || {};
          // 这一块是大鹏写的，如有疑问找他就行
          import('@/support/export2excel').then(excel => {
            // 多级表头数组
            let tHeader = [];
            // 表头
            let header = ['员工姓名','证件号码','服务年月','城市'];
            // 对应数据字段
            // let filterVal = ['xm','sfzHm','fwny','cs'];
            let filterVal = [];
            // 表格对应单元格
            // let merges = ['A1:A2','B1:B2','C1:C2','D1:D2'];

            // 将完整表头以树型结构组装成Json串
            let titleTree = {"xm":{"name":"姓名"},"sfzHm":{"name":"身份证号码"},"fwny":{"name":"服务年月"},"cs":{"name":"城市"},"sb":{"name":"社保","child":{"sbQyje":"单位合计","sbGrje":"个人合计"}},"gjj":{"name":"公积金","child":{"gjjQyje":"单位合计","gjjbGrje":"个人合计"}},"cbjJe":{"name":"残障金"},"sz":{"name":"薪资","child":{"sf":"实发","gs":"个税"}},"sybx":{"name":"商业保险","child":{"sbJeJjg":"金额（不含税）","sbZzs":"增值税","sbJe":"金额"}},"dsdf":{"name":"代收代付其它","child":{"dsdfQyje":"单位合计","dsdfGrje":"个人合计"}},"fwf":{"name":"服务费","child":{"fwfJeJjg":"金额（不含税）","fwfZzs":"增值税","fwfJe":"金额"}},"zje":{"name":"合计"}};
            // 将表头中明细数据行列出
            let titleList = ["xm","sfzHm","fwny","cs","sbQyje","sbGrje","gjjQyje","gjjbGrje","cbjJe","sf","gs","sbJeJjg","sbZzs","sbJe","dsdfQyje","dsdfGrje","fwfJeJjg","fwfZzs","fwfJe","zje"];

            // 找出含有数据的列
            let titleListShow = [];
            list.forEach(function (value) {
            	titleListShow = titleListShow.concat(Object.keys(value));
						});
            // titleListShow = Object.keys(list[0]);
            // @todo 上部分代码应遍历所有数据找出有数据列，但看接口中数据列一致，所有以每一个数据为准找有数据列

            // Excel列标
            let excelColKey = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT','AU','AV','AW','AX','AY','AZ'];

            // 表头第一行数据
            let titleRow1 = [];
            // 表头第二行数据
            let titleRow2 = [];
            // 表头列游标
            let colKey = 0;

						// 表格对应合并单元格
						let merges = [];
						let mergeStr = "";
						// 遍历表头Tree 第一层
            for(let key in titleTree){
            	// 判断是否有子项
            	if("child" in titleTree[key]){
            		let canShow = false;
            		// 遍历所有子项，看是否有需要显示项
            		for (let k in titleTree[key]["child"]){
            			// 如找到可显示项则跳出循环
            			if (titleListShow.includes(k)){
										canShow = true;
            				break;
                  }
                }
            		// 如有可显示项则进行添加表头处理，如没有则跳过
								if (canShow){
									mergeStr = excelColKey[colKey]+"1:";
									for (let k in titleTree[key]["child"]){
										titleRow1.push(titleTree[key]["name"]);
										titleRow2.push(titleTree[key]["child"][k]);
										filterVal.push(k);
										colKey += 1;
									}
									mergeStr += excelColKey[colKey-1]+"1";
									merges.push(mergeStr);
								}
              }else {
            		// 无子项表头纵向合并
            		if(titleListShow.includes(key)){
            			mergeStr = excelColKey[colKey]+"1:"+excelColKey[colKey]+"2";
            			merges.push(mergeStr);
            			filterVal.push(key);
            			titleRow1.push(titleTree[key]["name"]);
            			titleRow2.push(null);
            			colKey += 1
                }
              }

            }

            tHeader = [titleRow1, titleRow2];

            // 导出数据
            const data = this.formatJson(filterVal, list);
            const filename = '员工明细';
            
            // this.$message({ type: 'success', message: "导出成功" });
            excel.export_json_to_excel({
              multiHeader: [titleRow1],
              header: titleRow2,
              data,
              filename,
              merges: merges,
              autoWidth: true,
              bookType: 'xlsx'
            })
          })
        }
      });
    },
    // 全屏展示 按钮
    fullScreen(){
      this.isFscreen = true;
    },
    // 全屏显示监听
    dspFscreen(display){
      this.isFscreen = display;
    },
    // 退出全屏监听
    exitFullScreen(){
      this.isFscreen = false;
    },
    // 切换视图类型
    changeViewType(type){
      this.viewType = type;
    }
  }
}
</script>
<style lang="scss" scoped>
    .s-details{
      text-align: center;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      .s-content{
        >.vender{
          position: relative;
          height: 64px;
          background: #F2F2F2;
          padding: 16px 24px 0;
          display: flex;
          .input{
            margin-right: 10px;
            width: 300px;
          }
          .btn-search{
            width:70px;
            height:32px;
            background:#6E80F2;
            border-radius:2px;
            font-weight: 400;
            color: #fff;
            border: none;
          }
          .export{
            position: absolute;
            top: 22px;
            right: 24px;
            height: 100%;
            >img{
              width: 20px;
              height: 20px;
              vertical-align: middle;
              margin-right: 4px;
            }
            >span{
              vertical-align: middle;
            }
          }
        }
        .customer{
          padding: 10px 24px 0;
          .vender{
            text-align: left;
            padding: 10px 0;
          }
        }
        .stuff{
          .vender{
            overflow: hidden;
            >p{
              float: left;
              margin-top: 4px;
            }
            .setting{
              float: right;
              >span{
                padding: 6px 10px;
                background: #F5F5F5;
                border-radius:2px 0px 0px 2px;
                cursor: pointer;
              }
              .l-view{
                display: inline-block;
              }
              .t-view{
                display: inline-block;
              }
              .active{
                background: #6E80F2;
                color: #ffffff;
              }
              .f-screen{
                display: inline-block;
                margin-right: 24px;
                margin-left: 20px;
                cursor: pointer;
                >span{
                  margin-left: 6px;
                  vertical-align: middle;
                }
                >img{
                  width: 12px;
                  height: 12px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
        .c-list{
          background: #F5F5F5;
          padding: 20px 24px;
          >.list{
            overflow: auto;
            margin-bottom: 40px;
            .item{
              float: left;
              width: 25%;
              text-align: left;
              .c-title{
                margin: 14px 0 10px;
                >span{
                  color: #B3B3B3;
                }
              }
              .c-cell{
                .c-t{
                  .name{}
                  .value{
                    margin-left: 10px;
                  }
                }
              }
            }
          }
        }
        .c-fscreen{
          // height: calc(100vh - 60px);
        }
      }
    }
</style>