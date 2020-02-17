<template>
    <div id="workBanck">
        <div id="mkDialog">
          <div id="mkBox">
            <span class="el-icon-close close" @click="closeMk"></span>
            <p class="mkTitle" style="width:100%;text-align:center;font-size:18px;">土桥</p>
            <table class="fgstb">
              <tr>
                <td rowspan="4" class="imgWrap"><img src="../assets/002.jpg" alt=""></td>
                <td class="right">简称：</td>
                <td class="left">铜旬分公司</td>
              </tr>
              <tr>
                <td class="right">起终点桩号：</td>
                <td class="left">K692.265～K742.326</td>
              </tr>
              <tr>
                <td class="right">经度：</td>
                <td class="left">108</td>
              </tr>
              <tr>
                <td class="right">纬度：</td>
                <td class="left">34</td>
              </tr>
            </table>
            <table class="baseTb">
              <tr>
                <td rowspan="7" class="imgWrap"><img src="../assets/002.jpg" alt=""></td>
                <td class="right">类别：</td>
                <td class="left">桥梁</td>
              </tr>
              <tr>
                <td class="right">起终点桩号：</td>
                <td class="left">K692.265～K742.326</td>
              </tr>
              <tr>
                <td class="right">归属年份：</td>
                <td class="left">2016年5月</td>
              </tr>
              <tr>
                <td class="right">管理公司：</td>
                <td class="left">铜旬分公司</td>
              </tr>
              <tr>
                <td class="right">养管单位：</td>
                <td class="left">吕村养护工区</td>
              </tr>
              <tr>
                <td class="right">责任人：</td>
                <td class="left">王伟民</td>
              </tr>
              <tr>
                <td class="right">联系电话：</td>
                <td class="left">13333333333</td>
              </tr>
            </table>
            <p style="text-indent:2rem;">土桥铜川市合凤高速南部塬区，建筑年代2015年，建设单位：*****建筑公司，属二类技术等级桥梁。</p>
            <table class="bdtable" id="techLevel">
              <thead>
                <tr>
                  <th>技术等级</th>
                  <th>检测公司</th>
                  <th>检测时间</th>
                  <th>详细</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>二类</td>
                  <td>陕西建大维固质量检测技术有限公司</td>
                  <td>2018-03-25</td>
                  <td><el-button type="primary" size="small">详细</el-button></td>
                </tr>
              </tbody>
            </table>
            <table class="bdtable" id="fgsCost">
              <thead>
                <tr>
                  <th>日常费用盈余（万元）</th>
                  <th>收入（万元）</th>
                  <th>支出（万元）</th>
                  <th>年份</th>
                  <th>详细</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>2018</td>
                  <td><el-button type="primary" size="small">详细</el-button></td>
                </tr>
              </tbody>
            </table>
            <table class="bdtable" id="dailyCost">
              <thead>
                <tr>
                  <th>日常费用（万元）</th>
                  <th>收入</th>
                  <th>支出</th>
                  <th>年份</th>
                  <th>详细</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>2018</td>
                  <td><el-button type="primary" size="small">详细</el-button></td>
                </tr>
              </tbody>
            </table>
            <table class="bdtable" id="yhCost">
              <thead>
                <tr>
                  <th>养护费用（万元）</th>
                  <th>年份</th>
                  <th>基本明细（万元）</th>
                  <th>详细</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>二类</td>
                  <td>2018</td>
                  <td>日常养护（80）小修保养（120）中修工程（120）大修工程（180）</td>
                  <td><el-button type="primary" size="small">详细</el-button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      <el-main id="topItems">
        <el-row :gutter="30">
          <el-col :span="4"><div class="topItem" style="background:rgb(114, 212, 223)" @click="toBaseData"><div class="ticon" style="font-size:50px;"><i class="el-icon-s-data"></i> </div><div class="ttile">公路基础数据</div></div></el-col>
          <el-col :span="4"><div class="topItem" style="background:rgb(143, 199, 64)" @click="toAssets"><div class="ticon" style="font-size:50px;"><i class="el-icon-s-data"></i> </div><div class="ttile">公路资产数据</div></div></el-col>
          <el-col :span="4"><div class="topItem" style="background:rgb(104, 204, 166)" @click="toTech"><div class="ticon" style="font-size:50px;"><i class="el-icon-s-data"></i> </div><div class="ttile">路产技术状况</div></div></el-col>
          <el-col :span="4"><div class="topItem" style="background:rgb(255, 204, 102)" @click="toDayliCost"><div class="ticon" style="font-size:50px;"><i class="el-icon-s-data"></i> </div><div class="ttile">日常费用收支</div></div></el-col>
          <el-col :span="4"><div class="topItem" style="background:rgb(114, 212, 223)" @click="toConsCost"><div class="ticon" style="font-size:50px;"><i class="el-icon-s-data"></i> </div><div class="ttile">养护费用管理</div></div></el-col>
        </el-row>
      </el-main>
      <el-main>
        <el-row style="margin-bottom:20px;">
          <el-col :span="24">
            资产类别
            <el-select v-model="condition.type" size="small">
              <el-option></el-option>
            </el-select>
            起点桩号
            <el-select v-model="condition.startZh" size="small">
              <el-option></el-option>
            </el-select>
            终点桩号
            <el-select v-model="condition.endZh" size="small">
              <el-option></el-option>
            </el-select>
            归属年份
            <el-select v-model="condition.year" size="small">
              <el-option></el-option>
            </el-select>
            <el-button type="primary" size="small" @click="changeMarkers">搜</el-button>
          </el-col>
        </el-row>
        <el-row>
          <div id="assetsMap">
            <div  id="astList">
              <table>
                <thead>
                  <tr><th colspan="2">图例</th></tr>
                </thead>
                <tbody>
                  <tr v-for="item in Assets" :key="item.id" @click="changeMarkers(item.id)"><td><img :src="item.src" alt=""></td><td>{{item.name}}</td></tr>
                </tbody>
              </table>
            </div>
            <div class="amap-wrapper">
              <el-amap class="amap-box" vid="astmap"
                :zoom="astZoom"
                :center="astCenter" v-if="assAmap">
                <el-amap-marker
                  :vid="marker.id"
                  v-for="marker in astMarkers"
                  :key="marker.id"
                  :icon="marker.icon"
                  :position="marker.location"
                  :label="marker.label"
                  :events="markerEvents"
                  >
                </el-amap-marker>
              </el-amap>
            </div>
          </div>
        </el-row>
      </el-main>
      <el-row>
        <el-col :span="12">
          <el-main>
            <el-row class="itemTh">
              公路资产
              <el-button type="info" class="more" size="mini" @click="toAssets">查看>></el-button>
            </el-row>
            <el-row>
              <template>
                <el-table
                  :data="zcTable"
                  border
                  style="width: 100%"
                  :header-cell-style="{background:'rgb(240,240,240)'}">
                  <el-table-column
                    label="序号"
                    type="index"
                    width="50"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    width="140"
                    label="资产名称"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="zh"
                    label="起终点桩号"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="num"
                    label="数量（个/座/片）"
                    width="140"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="图片"
                    width="70"
                    align="center">
                    <template slot-scope="scope">
                      <el-image
                        style="width: 27px; height: 27px"
                        :src="scope.row.pic"
                        :preview-src-list="srcList">
                      </el-image>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="year"
                    label="归属年份"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="位置"
                    align="center">
                    <template slot-scope="scope">
                      <i class="el-icon-location" @click="openDialog(scope.row.location,scope.row.name)"></i>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-row>
          </el-main>
        </el-col>
        <el-col :span="12">
          <el-main>
            <el-row class="itemTh">
              技术等级
              <el-button type="info" class="more" size="mini" @click="toTech">查看>></el-button>
            </el-row>
            <el-row>
              <template>
                <el-table
                  :data="techTable"
                  border

                  style="width: 100%"
                  :header-cell-style="{background:'rgb(240,240,240)'}">
                  <el-table-column
                    label="序号"
                    type="index"
                    width="50"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="资产名称"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="检查报告查看"
                    align="center">
                    <template slot-scope="scope">
                      <el-button type="primary" size="small" :btitle="scope.row.report" @click="imgDialog(scope.row.img)">报告查看</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="技术状况"
                    align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.tech}}</span>
                      <span class="dTech" v-if="scope.row.tech.indexOf('四')>-1">危</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="检查时间"
                    align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.date}}</span>
                      <!-- <span class="dTech" v-if="scope.row.tech.indexOf('四')>-1">检</span> -->
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="year"
                    label="归属年份"
                    align="center">
                  </el-table-column>
                </el-table>
              </template>
            </el-row>
          </el-main>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-main>
            <el-row class="itemTh">
              日常费用收支
              <el-button type="info" class="more" size="mini" @click="toDayliCost">查看>></el-button>
            </el-row>
            <el-row>
              <template>
                <el-table
                  :data="dayliTable"
                  border
                  style="width: 100%"
                  :header-cell-style="{background:'rgb(240,240,240)'}">
                  <el-table-column
                    label="序号"
                    type="index"
                    width="50"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="资产名称"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="income"
                    label="收入（元）"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="expenditure"
                    label="支出（元）"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="费用发生时间"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="票据查看"
                    align="center">
                    <template slot-scope="scope">
                      <el-button type="primary" size="small" :btitle="scope.row.bill" @click="imgDialog(scope.row.img)">票据查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-row>
          </el-main>
        </el-col>
        <el-col :span="12">
          <el-main>
            <el-row class="itemTh">
              养护费用管理
              <el-button type="info" class="more" size="mini" @click="toConsCost">查看>></el-button>
            </el-row>
            <el-row>
              <template>
                <el-table
                  :data="conservTable"
                  border

                  style="width: 100%"
                  :header-cell-style="{background:'rgb(240,240,240)'}">
                  <el-table-column
                    label="序号"
                    type="index"
                    width="50"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="资产名称"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="cost"
                    label="费用（万元）"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="engineering"
                    label="养护工程"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="费用发生时间"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="票据查看"
                    align="center">
                    <template slot-scope="scope">
                      <el-button type="primary" size="small" :btitle="scope.row.bill" @click="imgDialog(scope.row.img)">票据查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-row>
          </el-main>
        </el-col>
      </el-row>
      <el-row>
        <el-dialog  title="位置查看" :visible.sync="locationDialog" width="60%" :before-close="closeLoclDialog">
          <!-- <el-main> -->
            <el-row>
              <div id="localMap">
                <div class="amap-wrapper">
                  <el-amap class="amap-box" vid="loclmap"
                    :zoom="loclZoom"
                    :center="loclCenter">
                    <el-amap-marker vid="loclmarker"
                      :icon="loclicon"
                      :position="locMcenter"
                      :label="loclabel"
                      >
                    </el-amap-marker>
                  </el-amap>
                </div>
              </div>
            </el-row>
          <!-- </el-main> -->
        </el-dialog>
      </el-row>
      <el-row>
        <el-dialog  :title="portName" :visible.sync="portDialog" width="60%" :before-close="closeImgDialog">
          <!-- <el-main> -->
            <el-row>
              <div id="report">
                <img :src="imgUrl" alt="">
              </div>
            </el-row>
          <!-- </el-main> -->
        </el-dialog>
      </el-row>
    </div>
</template>
<script>
export default {
  data () {
    return {
      astZoom: 12,
      astCenter: [108.860159, 34.978],
      locationDialog: false,
      loclZoom: 10,
      loclCenter: [108.860159, 34.978],
      loclicon: '',
      locMcenter: [108.860159, 34.978],
      loclabel: {
        content: '',
        offset: [10, -20]
      },
      assAmap: false,
      portName: '',
      portDialog: false,
      imgUrl: '',
      Assets: [
        { id: '1', name: '加油站', src: require('../assets/addoil.png') },
        { id: '2', name: '桥梁', src: require('../assets/bridge.png') },
        { id: '3', name: '互通立交', src: require('../assets/htlj.png') },
        { id: '4', name: '收费站', src: require('../assets/sfz.png') },
        { id: '5', name: '隧道', src: require('../assets/tenant.png') },
        { id: '6', name: '涵洞', src: require('../assets/tunnel.png') }
      ],
      astMarkers: [
        { id: 'fgs123', icon: require('../assets/addoil.png'), location: [108.860159, 34.978], label: { content: '加油站', offset: [10, -20] } },
        { id: 'ql1', icon: require('../assets/bridge.png'), location: [108.850159, 34.978], label: { content: '桥梁', offset: [10, -20] } },
        { id: 'ql12', icon: require('../assets/htlj.png'), location: [108.840159, 34.978], label: { content: '互通立交', offset: [10, -20] } },
        { id: 'ql123', icon: require('../assets/sfz.png'), location: [108.830159, 34.978], label: { content: '收费站', offset: [10, -20] } },
        { id: 'ql23', icon: require('../assets/tenant.png'), location: [108.820159, 34.978], label: { content: '隧道', offset: [10, -20] } },
        { id: 'ql3', icon: require('../assets/tunnel.png'), location: [108.810159, 34.978], label: { content: '涵洞', offset: [10, -20] } }
      ],
      zcTable: [
        { zh: 'K111', name: '吕村收费站', num: '1', pic: require('../assets/logo.png'), year: '2016-05-02', location: [108.860159, 34.978] },
        { zh: 'K111', name: '薛家咀大桥', num: '1', pic: require('../assets/logo.png'), year: '2016-05-02', location: [108.850159, 34.878] },
        { zh: 'K111', name: '吕村河1号大桥', num: '1', pic: require('../assets/logo.png'), year: '2016-05-02', location: [108.840159, 34.778] },
        { zh: 'K111', name: '架子山隧道', num: '1', pic: require('../assets/logo.png'), year: '2016-05-02', location: [108.830159, 34.678] },
        { zh: 'K111', name: 'ABV', num: '1', pic: '', year: '2016-05-02', location: [108.820159, 34.478] }
      ],
      techTable: [
        { name: '吕村收费站', report: '', tech: '二级', date: '2018-9-20', year: '2018' },
        { name: '吕村收费站', report: '', tech: '二级', date: '2018-9-20', year: '2018' },
        { name: '吕村收费站', report: '', tech: '二级', date: '2018-9-20', year: '2018' },
        { name: '吕村收费站', report: '', tech: '四级', date: '2018-9-20', year: '2018' },
        { name: '吕村收费站', report: '', tech: '二级', date: '2018-9-20', year: '2018' }
      ],
      dayliTable: [
        { name: '吕村收费站', income: '200.00', expenditure: '100.00', date: '2019-1-1', bill: '' },
        { name: '吕村收费站', income: '200.00', expenditure: '100.00', date: '2019-1-1', bill: '' },
        { name: '吕村收费站', income: '200.00', expenditure: '100.00', date: '2019-1-1', bill: '' },
        { name: '吕村收费站', income: '200.00', expenditure: '100.00', date: '2019-1-1', bill: '' },
        { name: '吕村收费站', income: '200.00', expenditure: '100.00', date: '2019-1-1', bill: '' }
      ],
      conservTable: [
        { name: '吕村收费站', cost: '200.00', engineering: '100.00', date: '2019-1-1', bill: '' },
        { name: '吕村收费站', income: '200.00', engineering: '100.00', date: '2019-1-1', bill: '' },
        { name: '吕村收费站', income: '200.00', engineering: '100.00', date: '2019-1-1', bill: '' },
        { name: '吕村收费站', income: '200.00', engineering: '100.00', date: '2019-1-1', bill: '' },
        { name: '吕村收费站', income: '200.00', engineering: '100.00', date: '2019-1-1', bill: '' }
      ],
      srcList: [],
      markerEvents: {
        click (e) {
          // console.log(e)
          // console.log(e.target.B)
          let data = e.target.B
          document.getElementById('mkDialog').style.display = 'block'
          document.getElementById('mkDialog').title = '土桥'
          if (data.vid.indexOf('fgs') > -1) {
            document.getElementById('mkBox').getElementsByClassName('baseTb')[0].style.display = 'none'
            document.getElementById('techLevel').style.display = 'none'
            document.getElementById('dailyCost').style.display = 'none'
            document.getElementById('yhCost').style.display = 'none'
            document.getElementById('mkBox').getElementsByClassName('fgstb')[0].style.display = 'block'
            document.getElementById('fgsCost').style.display = 'block'
            document.getElementById('mkBox').getElementsByClassName('mkTitle')[0].innerText = '分公司'
          } else {
            document.getElementById('mkBox').getElementsByClassName('baseTb')[0].style.display = 'block'
            document.getElementById('techLevel').style.display = 'block'
            document.getElementById('dailyCost').style.display = 'block'
            document.getElementById('yhCost').style.display = 'block'
            document.getElementById('mkBox').getElementsByClassName('fgstb')[0].style.display = 'none'
            document.getElementById('fgsCost').style.display = 'none'
            document.getElementById('mkBox').getElementsByClassName('mkTitle')[0].innerText = '土桥'
          }
        }
      },
      condition: {
        type: '',
        startZh: '',
        endZh: '',
        year: ''
      }
    }
  },
  mounted () {
    this.setPicList()
    this.assAmap = true
  },
  methods: {
    setPicList () {
      let tst = this
      this.zcTable.forEach(function (i, n) {
        tst.srcList.push(i.pic)
      })
      // console.log(tst.srcList)
    },
    toBaseData () {
      this.$bus.$emit('changeActMenu', '/metersPile')
      this.$router.push('/metersPile')
    },
    toAssets () {
      this.$bus.$emit('changeActMenu', '/Assets')
      this.$router.push('/Assets')
    },
    toTech () {
      this.$bus.$emit('changeActMenu', '/techGrade')
      this.$router.push('/techGrade')
    },
    toDayliCost () {
      this.$bus.$emit('changeActMenu', '/dailyCost')
      this.$router.push('/dailyCost')
    },
    toConsCost () {
      this.$bus.$emit('changeActMenu', '/yhCostList')
      this.$router.push('/yhCostList')
    },
    openDialog (local, name) {
      this.locationDialog = true
      this.loclCenter = local
      this.loclabel = {
        content: name,
        offset: [10, -20]
      }
    },
    changeMarkers (id) {
      // switch (id) {
      //   case '1':
      //     this.astMarkers = [
      //       { id: '1', icon: require('../assets/addoil.png'), location: [108.760159, 34.978], label: { content: '11', offset: [10, -20] } },
      //       { id: '2', icon: require('../assets/addoil.png'), location: [108.800159, 34.978], label: { content: '12', offset: [10, -20] } }
      //     ]
      //     break
      //   case '2':
      //     this.astMarkers = [
      //       { id: '1', icon: require('../assets/bridge.png'), location: [108.760159, 34.978], label: { content: '21', offset: [10, -20] } },
      //       { id: '2', icon: require('../assets/bridge.png'), location: [108.800159, 34.978], label: { content: '22', offset: [10, -20] } }
      //     ]
      //     break
      //   case '3':
      //     this.astMarkers = [
      //       { id: '1', icon: require('../assets/htlj.png'), location: [108.760159, 34.978], label: { content: '31', offset: [10, -20] } },
      //       { id: '2', icon: require('../assets/htlj.png'), location: [108.800159, 34.978], label: { content: '32', offset: [10, -20] } }
      //     ]
      //     break
      //   case '4':
      //     this.astMarkers = [
      //       { id: '1', icon: require('../assets/sfz.png'), location: [108.760159, 34.978], label: { content: '41', offset: [10, -20] } },
      //       { id: '2', icon: require('../assets/sfz.png'), location: [108.800159, 34.978], label: { content: '42', offset: [10, -20] } }
      //     ]
      //     break
      //   case '5':
      //     this.astMarkers = [
      //       { id: '1', icon: require('../assets/tenant.png'), location: [108.760159, 34.978], label: { content: '51', offset: [10, -20] } },
      //       { id: '2', icon: require('../assets/tenant.png'), location: [108.800159, 34.978], label: { content: '52', offset: [10, -20] } }
      //     ]
      //     break
      // }
    },
    closeMk () {
      document.getElementById('mkDialog').style.display = 'none'
    },
    imgDialog (img) {
      this.portDialog = true
      this.imgUrl = img
    },
    closeLoclDialog () {
      this.locationDialog = false
      this.loclZoom = 10
      this.loclCenter = [108.860159, 34.978]
      this.loclicon = ''
      this.locMcenter = [108.860159, 34.978]
      this.loclabel = {
        content: '',
        offset: [10, -20]
      }
    },
    closeImgDialog () {
      this.portDialog = false
      this.imgUrl = ''
    }
  }
}
</script>
<style>
  #workBanck{position: relative;}
  #workBanck .el-main{background: #fff;margin:15px 10px;}
  #workBanck #topItems .el-col-4{width: 20%;}
  #workBanck .topItem{width: 100%;height: 80px;background: #bbb;color: #fff;line-height: 80px;cursor: pointer;}
  #workBanck .topItem .ttile{width: 60%;text-align: left;font-size: 18px;float: left;}
  #workBanck .topItem .ticon{width: 40%;text-align: center;height: 80px;float: left;}
  #workBanck .more{float: right;}
  #workBanck .itemTh{padding: 8px 0;border-bottom: 1px solid #eee;margin-bottom: 15px;}
  #workBanck .el-icon-location{font-size: 20px;color: red;cursor: pointer;}
  #workBanck .dTech{background:red;color: #fff;border-radius: 100%;width: 20px;height: 20px;display: inline-block;line-height: 20px;}
  #workBanck .amap-wrapper{
    height: 500px;
  }
  #workBanck #assetsMap{position: relative;}
  #workBanck #assetsMap #astList{position: absolute;top: 0px;right: 0px;z-index: 999;text-align: center;background: #fff;border-right: 1px solid #bbb;border-bottom: 1px solid #bbb;border-collapse:collapse;height: 400px;overflow-y: auto;min-width: 100px;}
  #workBanck #assetsMap #astList::-webkit-scrollbar {
    width: 5px;
  }
  #workBanck #assetsMap #astList::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0,0,0,0.2);
  }
  #workBanck #assetsMap #astList::-webkit-scrollbar-track {
      border-radius: 0;
      background: rgba(0,0,0,0.1);
  }
  #workBanck #assetsMap #astList tr{cursor: pointer;}
  #workBanck #assetsMap #astList td,#workBanck #assetsMap #astList th{text-align: center;border-left: 1px solid #bbb;font-size: 14px;vertical-align: middle;border-top: 1px solid #bbb;padding:3px 10px;}
  #workBanck #assetsMap #astList td img{height: 20px;}
  #workBanck #mkDialog{width:100%;height:100%;background:rgba(0,0,0,0);position:absolute;left:0;top:0;z-index:999;transition: all 1s;display: none;}
  #workBanck #mkDialog #mkBox{width:38%;background:#fff;position:absolute;left:25%;top:80px;box-shadow: 0 0 5px #bbb;padding: 8px;}
  #workBanck #mkDialog #mkBox .close{position:absolute;right:5px;top:5px;cursor:pointer;}
  #workBanck #mkDialog #mkBox table{width: 100%;}
  #workBanck #mkDialog #mkBox table td.left{text-align: left;}
  #workBanck #mkDialog #mkBox table td.right{text-align: right;}
  #workBanck #mkDialog #mkBox table td.imgWrap{width: 55%;text-align: center;}
  #workBanck #mkDialog #mkBox .baseTb td.imgWrap img{height: 170px;}
  #workBanck #mkDialog #mkBox .fgstb td.imgWrap img{height: 100px;}
  #workBanck #mkDialog #mkBox .bdtable{width: 100%;border-top: 1px solid #bbb;border-left: 1px solid #bbb;border-collapse: collapse;margin-bottom: 20px;}
  #workBanck #mkDialog #mkBox .bdtable th, #workBanck #mkDialog #mkBox .bdtable td{text-align: center;min-width: 100px;border-right: 1px solid #bbb;border-bottom: 1px solid #bbb;padding:5px 8px;font-size: 14px;}
</style>
