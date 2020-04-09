<template>
  <div id="workBanck">
    <div id="mkDialog">
      <div id="mkBox">
        <span class="el-icon-close close" @click="closeMk"></span>
        <p class="mkTitle" style="width:100%;text-align:center;font-size:18px;margin-bottom:20px;background:#f5f5f5;line-height:40px;height:40px;">
          土桥
        </p>
        <table class="fgstb">
          <tr>
            <td rowspan="4" class="imgWrap">
              <img src="../assets/002.jpg" alt="" />
            </td>
            <td class="right">简称：</td>
            <td class="left jc">铜旬分公司</td>
          </tr>
          <tr>
            <td class="right">起终点桩号：</td>
            <td class="left fgszh">K692.265～K742.326</td>
          </tr>
          <tr>
            <td class="right">经度：</td>
            <td class="left fgslg">108</td>
          </tr>
          <tr>
            <td class="right">纬度：</td>
            <td class="left fgslat">34</td>
          </tr>
        </table>

        <table class="baseTb">
          <tr>
            <td rowspan="7" class="imgWrap">
              <img src="../assets/002.jpg" alt="" />
            </td>
            <td class="right">类别：</td>
            <td class="left type">桥梁</td>
          </tr>
          <tr>
            <td class="right">起终点桩号：</td>
            <td class="left seZh">K692.265～K742.326</td>
          </tr>
          <tr>
            <td class="right">归属年份：</td>
            <td class="left year">2016年5月</td>
          </tr>
          <tr>
            <td class="right">管理公司：</td>
            <td class="left glgs">铜旬分公司</td>
          </tr>
          <tr>
            <td class="right">养管单位：</td>
            <td class="left ygdw">吕村养护工区</td>
          </tr>
          <tr>
            <td class="right">责任人：</td>
            <td class="left zrr">王伟民</td>
          </tr>
          <tr>
            <td class="right">联系电话：</td>
            <td class="left phone">13333333333</td>
          </tr>
        </table>

        <p style="text-indent:2rem;margin:20px auto;font-size:14px;line-height:26px;width:96%;" class="remark">
          土桥铜川市合凤高速南部塬区，建筑年代2015年，建设单位：*****建筑公司，属二类技术等级桥梁。
        </p>
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
              <td class="techlevel">二类</td>
              <td class="techcomp">陕西建大维固质量检测技术有限公司</td>
              <td class="techtime">2018-03-25</td>
              <td><el-button type="primary" size="small">详细</el-button></td>
            </tr>
          </tbody>
        </table>
        <table class="bdtable" id="fgsCost">
          <thead>
            <tr>
              <th style="min-width:160px;">日常费用盈余（万元）</th>
              <th>收入（万元）</th>
              <th>支出（万元）</th>
              <th>年份</th>
              <th>详细</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="fgsyy">1</td>
              <td class="fgssr">1</td>
              <td class="fgszc">1</td>
              <td class="fgsnf">2018</td>
              <td><el-button type="primary" size="small">详细</el-button></td>
            </tr>
          </tbody>
        </table>
        <table class="bdtable" id="dailyCost">
          <thead>
            <tr>
              <th style="min-width:130px;">日常费用（万元）</th>
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
              <th style="min-width:130px;">养护费用（万元）</th>
              <th>年份</th>
              <th>基本明细（万元）</th>
              <th>详细</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>二类</td>
              <td>2018</td>
              <td>
                日常养护（80）小修保养（120）中修工程（120）大修工程（180）
              </td>
              <td><el-button type="primary" size="small">详细</el-button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <el-main id="topItems">
      <el-row :gutter="30">
        <el-col :span="4">
          <div
            class="topItem"
            style="background:rgb(114, 212, 223)"
            @click="toBaseData"
          >
            <div class="ticon" style="font-size:50px;">
              <i class="ri-align-justify"></i>
            </div>
            <div class="ttile">公路基础数据</div>
          </div>
        </el-col>
        <el-col :span="4"
          ><div
            class="topItem"
            style="background:rgb(143, 199, 64)"
            @click="toAssets"
          >
            <div class="ticon" style="font-size:50px;">
              <i class="el-icon-s-data"></i>
            </div>
            <div class="ttile">公路资产数据</div>
          </div></el-col
        >
        <el-col :span="4">
          <div
            class="topItem"
            style="background:rgb(104, 204, 166)"
            @click="toTech"
          >
            <div class="ticon" style="font-size:50px;">
              <i class="el-icon-s-operation"></i>
            </div>
            <div class="ttile">路产技术状况</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div
            class="topItem"
            style="background:rgb(255, 204, 102)"
            @click="toDayliCost"
          >
            <div class="ticon" style="font-size:50px;">
              <i class="ri-money-dollar-circle-fill"></i>
            </div>
            <div class="ttile">日常费用收支</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div
            class="topItem"
            style="background:rgb(114, 212, 223)"
            @click="toConsCost"
          >
            <div class="ticon" style="font-size:50px;">
              <i class="ri-money-dollar-circle-fill"></i>
            </div>
            <div class="ttile">养护费用管理</div>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-main>
      <el-row style="margin-bottom:20px;" :gutter="10">
        <el-col :span="4">
          <span class="mapSercLabel">资产类别 </span>
          <el-select
            v-model="condition.ASSET_TYPE_ID"
            size="small"
            style="width:70%"
          >
            <el-option
              v-for="item in zctypeArr"
              :key="item.T0001_ID"
              :value="item.T0001_ID"
              :label="item.T0001_ASSETTYPE_NAME"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <span class="mapSercLabel">起点桩号 </span>
          <el-select
            v-model="condition.START_PILE"
            size="small"
            style="width:70%"
          >
            <el-option
              v-for="item in startzhArr"
              :key="item.$index"
              :value="item"
              :label="item"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <span class="mapSercLabel">终点桩号 </span>
          <el-select
            v-model="condition.END_PILE"
            size="small"
            style="width:70%"
          >
            <el-option
              v-for="item in endzhArr"
              :key="item.$index"
              :value="item"
              :label="item"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <span class="mapSercLabel">归属年份 </span>
          <el-select v-model="condition.YEAR" size="small" style="width:70%">
            <el-option
              v-for="item in yearArr"
              :key="item.$index"
              :value="item"
              :label="item"
            ></el-option>
          </el-select>
        </el-col>
        
        <el-col :span="2">
          
          <el-button type="primary" size="small" @click="changeMarkers"
            >搜</el-button
          >
        </el-col>
      </el-row>
      <el-row>
        <div id="assetsMap">
          <div id="astList">
            <table style="border-collapse: collapse;">
              <thead>
                <tr>
                  <th colspan="2" style="background:#f0f0f0;">图例</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in Assets"
                  :key="item.id"
                  @click="changeMarkers(item.id)"
                >
                  <td><img :src="item.src" alt="" /></td>
                  <td>{{ item.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="amap-wrapper">
            <el-amap
              class="amap-box"
              vid="astmap"
              :zoom="astZoom"
              :center="astCenter"
              v-if="assAmap"
            >
              <el-amap-marker
                :vid="marker.vid"
                v-for="marker in astMarkers"
                :key="marker.T0002_ID"
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
    <el-row id="assetsWrap">
      <el-col :span="12">
        <el-main>
          <el-row class="itemTh">
            公路资产
            <el-button type="info" class="more" size="mini" @click="toAssets"
              >查看 >></el-button
            >
          </el-row>
          <el-row>
            <template>
              <el-table
                :data="zcTable"
                border
                style="width: 100%"
                :header-cell-style="{ background: 'rgb(240,240,240)' }"
              >
                <el-table-column
                  label="序号"
                  type="index"
                  width="50"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  width="140"
                  label="资产名称"
                  align="center"
                >
                </el-table-column>
                <el-table-column prop="zh" label="起终点桩号" align="center">
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="数量（个/座/片）"
                  width="140"
                  align="center"
                >
                </el-table-column>
                <el-table-column label="图片" width="70" align="center">
                  <template slot-scope="scope">
                    <el-image
                      v-if="scope.row.pic.length > 0"
                      style="width: 27px; height: 27px"
                      :src="scope.row.pic"
                      :preview-src-list="srcList"
                    >
                    </el-image>
                  </template>
                </el-table-column>
                <el-table-column prop="year" label="归属年份" align="center">
                </el-table-column>
                <el-table-column label="位置" align="center">
                  <template slot-scope="scope">
                    <i
                      class="el-icon-location"
                      @click="openDialog(scope.row)"
                    ></i>
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
            <el-button type="info" class="more" size="mini" @click="toTech"
              >查看 >></el-button
            >
          </el-row>
          <el-row>
            <template>
              <el-table
                :data="techTable"
                border
                style="width: 100%"
                :header-cell-style="{ background: 'rgb(240,240,240)' }"
              >
                <el-table-column
                  label="序号"
                  type="index"
                  width="50"
                  align="center"
                >
                </el-table-column>
                <el-table-column prop="name" label="资产名称" align="center">
                </el-table-column>
                <el-table-column label="检查报告查看" align="center">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      size="small"
                      :btitle="scope.row.report"
                      @click="imgDialog(scope.row.report,scope.row,'1')"
                      >报告查看</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column label="技术状况" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.tech }}</span>
                    <span class="dTech" v-if="scope.row.tech.indexOf('四') > -1"
                      >危</span
                    >
                  </template>
                </el-table-column>
                <el-table-column label="检查时间" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.date }}</span>
                    <!-- <span class="dTech" v-if="scope.row.tech.indexOf('四')>-1">检</span> -->
                  </template>
                </el-table-column>
                <el-table-column prop="year" label="归属年份" align="center">
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
            <el-button type="info" class="more" size="mini" @click="toDayliCost"
              >查看 >></el-button
            >
          </el-row>
          <el-row>
            <template>
              <el-table
                :data="dayliTable"
                border
                style="width: 100%"
                :header-cell-style="{ background: 'rgb(240,240,240)' }"
              >
                <el-table-column
                  label="序号"
                  type="index"
                  width="50"
                  align="center"
                >
                </el-table-column>
                <el-table-column prop="name" label="资产名称" align="center">
                </el-table-column>
                <el-table-column
                  prop="income"
                  label="收入（元）"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="expenditure"
                  label="支出（元）"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="费用发生时间"
                  align="center"
                >
                </el-table-column>
                <el-table-column label="票据查看" align="center">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      size="small"
                      :btitle="scope.row.bill"
                      @click="imgDialog(scope.row.bill,scope.row,'2')"
                      >票据查看</el-button
                    >
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
            <el-button type="info" class="more" size="mini" @click="toConsCost"
              >查看 >></el-button
            >
          </el-row>
          <el-row>
            <template>
              <el-table
                :data="conservTable"
                border
                style="width: 100%"
                :header-cell-style="{ background: 'rgb(240,240,240)' }"
              >
                <el-table-column
                  label="序号"
                  type="index"
                  width="50"
                  align="center"
                >
                </el-table-column>
                <el-table-column prop="name" label="资产名称" align="center">
                </el-table-column>
                <el-table-column
                  prop="cost"
                  label="费用（万元）"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="engineering"
                  label="养护工程"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="费用发生时间"
                  align="center"
                >
                </el-table-column>
                <el-table-column label="票据查看" align="center">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      size="small"
                      :btitle="scope.row.bill"
                      @click="imgDialog(scope.row.bill,scope.row,'3')"
                      >票据查看</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-row>
        </el-main>
      </el-col>
    </el-row>
    <el-row>
      <!-- <el-dialog  title="位置查看" :visible.sync="locationDialog" width="60%" :before-close="closeLoclDialog">
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
        </el-dialog> -->
      <el-dialog
        :visible.sync="mapShow"
        custom-class="dialog-div"
        title="地图位置"
      >
        <div style="height: 400px;">
          <el-amap
            vid="amapDiv"
            :center="mapData.position"
            :zoom="mapData.zoom"
            class="amap-demo"
          >
            <el-amap-marker
              vid="component-marker"
              :position="mapData.position"
              :content-render="mapData.contentRender"
            ></el-amap-marker>
          </el-amap>
        </div>
      </el-dialog>
    </el-row>
    <el-row>
      <el-dialog
        :title="portName"
        :visible.sync="portDialog"
        width="60%"
        :before-close="closeImgDialog"
      >
        <!-- <el-main> -->
        <el-row>
          <div id="report" style="text-align:center;">
            <img :src="imgUrl" alt="" style="height:300px;" />
          </div>
        </el-row>
        <!-- </el-main> -->
      </el-dialog>
    </el-row>
  </div>
</template>
<script>
import 'remixicon/fonts/remixicon.css'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      mapShow: false, // 地图是否显示
      mapData: {
        zoom: 10, // 当前地图缩放比列
        position: [],
        title: [],
        contentRender: (h, instance) => {
          return h(
            'div',
            {
              style: { background: '#80cbc4', whiteSpace: 'nowrap' }
            },
            this.mapData.title
          )
        }
      },
      astZoom: 10,
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
        { id: '1', name: '分公司', src: require('../assets/fgs.jpg') },
        { id: '2', name: '加油站', src: require('../assets/addoil.png') },
        { id: '3', name: '桥梁', src: require('../assets/bridge.png') },
        { id: '4', name: '互通立交', src: require('../assets/htlj.png') },
        { id: '5', name: '收费站', src: require('../assets/sfz.png') },
        { id: '6', name: '隧道', src: require('../assets/tenant.png') },
        { id: '7', name: '涵洞', src: require('../assets/tunnel.png') }
      ],
      astMarkers: [],
      zctypeArr: [],
      startzhArr: [],
      endzhArr: [],
      ZHS: [],
      yearArr: ['2017', '2018', '2019', '2020', '2021'],
      zcTable: [],
      techTable: [],
      dayliTable: [],
      conservTable: [],
      srcList: [],
      markerEvents: {
        click(e) {
          // console.log(e)
          let data = e.target.w
          if (data.label.content.indexOf('分公司') > -1) {
            document
              .getElementById('mkBox')
              .getElementsByClassName('baseTb')[0].style.display = 'none'
            document.getElementById('techLevel').style.display = 'none'
            document.getElementById('dailyCost').style.display = 'none'
            document.getElementById('yhCost').style.display = 'none'
            document
              .getElementById('mkBox')
              .getElementsByClassName('fgstb')[0].style.display = 'block'
            document.getElementById('fgsCost').style.display = 'block'
            document
              .getElementById('mkBox')
              .getElementsByClassName('mkTitle')[0].innerText = '分公司'
            let token = JSON.parse(sessionStorage.getItem('currentUser'))
              .TokenId
            let id = data.vid
            // 1.创建ajax对象(此处兼容性的创建)
            let xhr = new XMLHttpRequest()
            // 2.调用open方法（true----异步）
            xhr.open(
              'post',
              'http://94.191.93.96:8800/cycle/desktopData/getInfoByCompany',
              true
            )
            // 3.发送数据
            xhr.setRequestHeader('content-type', 'application/json')
            xhr.setRequestHeader('TokenId', token)
            xhr.send(id)
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  let mkdt = JSON.parse(xhr.responseText)
                  document.getElementById('mkDialog').style.display = 'block'
                  console.log(mkdt)
                  if (!mkdt.COMPANY_INFO[0].M0018_SIMPLE_NAME)
                    mkdt.COMPANY_INFO[0].M0018_SIMPLE_NAME = ''
                  if (!mkdt.COMPANY_INFO[0].M0008_START_PILE)
                    mkdt.COMPANY_INFO[0].M0008_START_PILE = ''
                  if (!mkdt.COMPANY_INFO[0].M0008_END_PILE)
                    mkdt.COMPANY_INFO[0].M0008_END_PILE = ''
                  if (!mkdt.COMPANY_INFO[0].M0018_COMPANY_PRECI)
                    mkdt.COMPANY_INFO[0].M0018_COMPANY_PRECI = ''
                  if (!mkdt.COMPANY_INFO[0].M0018_COMPANY_LATI)
                    mkdt.COMPANY_INFO[0].M0018_COMPANY_LATI = ''
                  if (!mkdt.COMPANY_INFO[0].M0018_COMPANY_REMARK)
                    mkdt.COMPANY_INFO[0].M0018_COMPANY_REMARK = ''
                  if (mkdt.COMPANY_INFO[0].files.length > 0) {
                    document
                      .getElementsByClassName('fgstb')[0]
                      .getElementsByTagName('img')[0]
                      .setAttribute(
                        'src',
                        mkdt.COMPANY_INFO[0].files[0].FILE_URL
                      )
                  } else {
                    document
                      .getElementsByClassName('fgstb')[0]
                      .getElementsByTagName('img')[0]
                      .setAttribute('src', '')
                  }
                  document
                    .getElementById('mkBox')
                    .getElementsByClassName('jc')[0].innerText =
                    mkdt.COMPANY_INFO[0].M0018_SIMPLE_NAME
                  document
                    .getElementById('mkBox')
                    .getElementsByClassName('fgszh')[0].innerText =
                    mkdt.COMPANY_INFO[0].M0008_START_PILE +
                    '~' +
                    mkdt.COMPANY_INFO[0].M0008_END_PILE
                  document
                    .getElementById('mkBox')
                    .getElementsByClassName('fgslg')[0].innerText =
                    mkdt.COMPANY_INFO[0].M0018_COMPANY_PRECI
                  document
                    .getElementById('mkBox')
                    .getElementsByClassName('fgslat')[0].innerText =
                    mkdt.COMPANY_INFO[0].M0018_COMPANY_LATI
                  document
                    .getElementById('mkBox')
                    .getElementsByClassName('remark')[0].innerText =
                    mkdt.COMPANY_INFO[0].M0018_COMPANY_REMARK
                  let trs = ''
                  mkdt.CURING_COST.forEach(element => {
                    trs +=
                      '<tr><td>' +
                      (element.INCOME_MONEY - element.TOCOME_MONEY) +
                      '</td><td>' +
                      element.INCOME_MONEY +
                      '</td><td>' +
                      element.TOCOME_MONEY +
                      '</td><td>' +
                      element.YEAR +
                      '</td><td><button type="primary" class="el-button el-button--primary el-button--small">详细</button></td></tr>'
                  })
                  document
                    .getElementById('fgsCost')
                    .getElementsByTagName('tbody')[0].innerHTML = trs
                }
              }
            }
          } else {
            document
              .getElementById('mkBox')
              .getElementsByClassName('baseTb')[0].style.display = 'block'
            document.getElementById('techLevel').style.display = 'block'
            document.getElementById('dailyCost').style.display = 'block'
            document.getElementById('yhCost').style.display = 'block'
            document
              .getElementById('mkBox')
              .getElementsByClassName('fgstb')[0].style.display = 'none'
            document.getElementById('fgsCost').style.display = 'none'
            // getInfoByCompany
            let token = JSON.parse(sessionStorage.getItem('currentUser'))
              .TokenId
            let id = data.vid
            // 1.创建ajax对象(此处兼容性的创建)
            let xhr = new XMLHttpRequest()
            // 2.调用open方法（true----异步）
            xhr.open(
              'post',
              'http://94.191.93.96:8800/cycle/desktopData/getInfoByAsset',
              true
            )
            // 3.发送数据
            xhr.setRequestHeader('content-type', 'application/json')
            xhr.setRequestHeader('TokenId', token)
            xhr.send(id)
            // 4.请求状态改变事件
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  let mkdt = JSON.parse(xhr.responseText)
                  console.log(mkdt)
                  document.getElementById('mkDialog').style.display = 'block'
                  if (mkdt.ASSET_INFO.length === 0) mkdt.ASSET_INFO[0] = {}
                  if (mkdt.TECH_DATA.length === 0) mkdt.TECH_DATA[0] = {}
                  if (mkdt.CURING_COST.length === 0) mkdt.CURING_COST[0] = {}
                  if (mkdt.COST_BUDGET.length === 0) mkdt.COST_BUDGET[0] = {}
                  if (!mkdt.ASSET_INFO) mkdt.ASSET_INFO = []
                  if (!mkdt.ASSET_INFO[0].T0002_ASSET_NAME)
                    mkdt.ASSET_INFO[0].T0002_ASSET_NAME = ''
                  if (!mkdt.ASSET_INFO[0].T0002_START_PILE)
                    mkdt.ASSET_INFO[0].T0002_START_PILE = ''
                  if (!mkdt.ASSET_INFO[0].T0002_ASSET_DATE)
                    mkdt.ASSET_INFO[0].T0002_ASSET_DATE = ''
                  if (!mkdt.ASSET_INFO[0].T0002_LOAD_NAME)
                    mkdt.ASSET_INFO[0].T0002_LOAD_NAME = ''
                  if (!mkdt.ASSET_INFO[0].T0002_CURING_UNIT)
                    mkdt.ASSET_INFO[0].T0002_CURING_UNIT = ''
                  if (!mkdt.ASSET_INFO[0].T0002_DUTY_PERSON)
                    mkdt.ASSET_INFO[0].T0002_DUTY_PERSON = ''
                  if (!mkdt.ASSET_INFO[0].T0002_TOUCH_TEL)
                    mkdt.ASSET_INFO[0].T0002_TOUCH_TEL = ''
                  if (!mkdt.ASSET_INFO[0].T0002_ASSET_REAMRK)
                    mkdt.ASSET_INFO[0].T0002_ASSET_REAMRK = ''
                  if (!mkdt.TECH_DATA[0].T0006_TECHTYPE_NAME)
                    mkdt.TECH_DATA[0].T0006_TECHTYPE_NAME = ''
                  if (!mkdt.TECH_DATA[0].T0003_CHECK_UNIT)
                    mkdt.TECH_DATA[0].T0003_CHECK_UNIT = ''
                  if (!mkdt.TECH_DATA[0].T0003_CHECK_TIME)
                    mkdt.TECH_DATA[0].T0003_CHECK_TIME = ''
                  document
                    .getElementById('mkBox')
                    .getElementsByClassName('mkTitle')[0].innerText =
                    mkdt.ASSET_INFO[0].T0002_ASSET_NAME
                  document
                    .getElementById('mkBox')
                    .getElementsByClassName('type')[0].innerText =
                    mkdt.ASSET_INFO[0].T0002_ASSET_NAME
                  document
                    .getElementById('mkBox')
                    .getElementsByClassName('seZh')[0].innerText =
                    mkdt.ASSET_INFO[0].T0002_START_PILE
                  document
                    .getElementById('mkBox')
                    .getElementsByClassName('year')[0].innerText =
                    mkdt.ASSET_INFO[0].T0002_ASSET_DATE
                  document
                    .getElementById('mkBox')
                    .getElementsByClassName('glgs')[0].innerText =
                    mkdt.ASSET_INFO[0].T0002_LOAD_NAME
                  document
                    .getElementById('mkBox')
                    .getElementsByClassName('ygdw')[0].innerText =
                    mkdt.ASSET_INFO[0].T0002_CURING_UNIT
                  document
                    .getElementById('mkBox')
                    .getElementsByClassName('zrr')[0].innerText =
                    mkdt.ASSET_INFO[0].T0002_DUTY_PERSON
                  document
                    .getElementById('mkBox')
                    .getElementsByClassName('phone')[0].innerText =
                    mkdt.ASSET_INFO[0].T0002_TOUCH_TEL
                  document
                    .getElementById('mkBox')
                    .getElementsByClassName('remark')[0].innerText =
                    mkdt.ASSET_INFO[0].T0002_ASSET_REAMRK
                  document
                    .getElementById('techLevel')
                    .getElementsByClassName('techlevel')[0].innerText =
                    mkdt.TECH_DATA[0].T0006_TECHTYPE_NAME
                  document
                    .getElementById('techLevel')
                    .getElementsByClassName('techcomp')[0].innerText =
                    mkdt.TECH_DATA[0].T0003_CHECK_UNIT
                  document
                    .getElementById('techLevel')
                    .getElementsByClassName('techtime')[0].innerText =
                    mkdt.TECH_DATA[0].T0003_CHECK_TIME
                  // if (mkdt.ASSET_INFO[0].files.length > 0) {
                  //   document.getElementsByClassName('baseTb')[0].getElementsByTagName('img')[0].setAttribute('src', mkdt.ASSET_INFO[0].files[0].FILE_URL)
                  // } else {
                  //   document.getElementsByClassName('baseTb')[0].getElementsByTagName('img')[0].setAttribute('src', '')
                  // }
                } else {
                  alert('错误' + xhr.status)
                }
              }
            }
          }
        }
      },
      condition: {
        ASSET_TYPE_ID: '',
        START_PILE: '',
        END_PILE: '',
        YEAR: ''
      }
    }
  },
  mounted() {
    this.assAmap = true
    this.loadMarkers()
    this.loadSelect()
    this.loadTableData()
  },
  methods: {
    loadMarkers() {
      // let token = JSON.parse(sessionStorage.getItem('currentUser')).TokenId
      this.$api.post('/cycle/desktopData/getListAll', {}, null, r => {
        // console.log(r)
        let marks = []
        r.ASSET_List.forEach(function(item, index) {
          // console.log(item)
          if (item.T0002_ASSET_NAME.indexOf('加油站') > -1) {
            item.icon = require('../assets/addoil.png')
          } else if (item.T0002_ASSET_NAME.indexOf('桥') > -1) {
            item.icon = require('../assets/bridge.png')
          } else if (item.T0002_ASSET_NAME.indexOf('互通立交') > -1) {
            item.icon = require('../assets/htlj.png')
          } else if (item.T0002_ASSET_NAME.indexOf('收费站') > -1) {
            item.icon = require('../assets/sfz.png')
          } else if (item.T0002_ASSET_NAME.indexOf('隧道') > -1) {
            item.icon = require('../assets/tenant.png')
          } else if (item.T0002_ASSET_NAME.indexOf('涵洞') > -1) {
            item.icon = require('../assets/tunnel.png')
          } else {
          }
          item.location = [item.T0002_ASSET_PRECI, item.T0002_ASSET_LATI]
          item.label = { content: item.T0002_ASSET_NAME, offset: [10, -20] }
          item.vid = item.T0002_ID
          marks.push(item)
        })
        r.COMPANY_List.forEach(function(item, index) {
          // console.log(item)
          item.icon = require('../assets/fgs.jpg')
          item.location = [item.M0018_COMPANY_PRECI, item.M0018_COMPANY_LATI]
          item.label = { content: item.M0018_SIMPLE_NAME, offset: [10, -20] }
          item.vid = item.M0018_ID
          item.T0002_ASSET_NAME = item.M0018_SIMPLE_NAME
          marks.push(item)
        })
        this.astMarkers = marks
      })
    },
    toBaseData() {
      this.$bus.$emit('changeActMenu', '/metersPile')
      this.$router.push('/metersPileList')
    },
    toAssets() {
      this.$bus.$emit('changeActMenu', '/Assets')
      this.$router.push('/AssetsList')
    },
    toTech() {
      this.$bus.$emit('changeActMenu', '/techGrade')
      this.$router.push('/techGradeList')
    },
    toDayliCost() {
      this.$bus.$emit('changeActMenu', '/dailyCost')
      this.$router.push('/dailyCostList')
    },
    toConsCost() {
      this.$bus.$emit('changeActMenu', '/yhCostList')
      this.$router.push('/yhCostList')
    },
    // 位置信息
    openDialog(data) {
      // this.locationDialog = true
      // this.loclCenter = local
      // this.loclicon = icon
      // this.loclabel = {
      //   content: name,
      //   offset: [10, -20]
      // }
      this.mapData.title = []
      this.mapShow = true
      this.mapData.position = [data.T0002_ASSET_PRECI, data.T0002_ASSET_LATI]
      this.mapData.title.push(data.T0002_ASSET_NAME)
    },
    changeMarkers() {
      // console.log(this.condition)
      // let token = JSON.parse(sessionStorage.getItem('currentUser')).TokenId
      // this.condition.TokenId = token
      this.$api.post(
        '/cycle/desktopData/getListAll',
        this.condition,
        null,
        r => {
          // console.log(r.ASSET_List)
          r.ASSET_List.forEach(function(item, index) {
            // console.log(item)
            if (item.T0002_ASSET_NAME.indexOf('加油站') > -1) {
              item.icon = require('../assets/addoil.png')
            } else if (item.T0002_ASSET_NAME.indexOf('桥') > -1) {
              item.icon = require('../assets/bridge.png')
            } else if (item.T0002_ASSET_NAME.indexOf('互通立交') > -1) {
              item.icon = require('../assets/htlj.png')
            } else if (item.T0002_ASSET_NAME.indexOf('收费站') > -1) {
              item.icon = require('../assets/sfz.png')
            } else if (item.T0002_ASSET_NAME.indexOf('隧道') > -1) {
              item.icon = require('../assets/tenant.png')
            } else if (item.T0002_ASSET_NAME.indexOf('涵洞') > -1) {
              item.icon = require('../assets/tunnel.png')
            } else {
            }
            item.location = [item.T0002_ASSET_PRECI, item.T0002_ASSET_LATI]
            item.label = { content: item.T0002_ASSET_NAME, offset: [10, -20] }
          })
          this.astMarkers = r.ASSET_List
        }
      )
    },
    closeMk() {
      document.getElementById('mkDialog').style.display = 'none'
    },
    imgDialog(img,row,type) {
      console.log(img)
      if (img) {
        this.portDialog = true
        this.imgUrl = img
        if(type==='1'){
          this.portName = row.name+'--报告查看'
        }else if(type==='2'){
          this.portName = row.name+'--票据查看'
        }else{
          this.portName = row.name+'--票据查看'
        }
      } else {
        Message({
          showClose: true,
          message: '无票据报告信息!!!',
          type: 'warning'
        })
      }
    },
    closeLoclDialog() {
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
    closeImgDialog() {
      this.portDialog = false
      this.imgUrl = ''
    },
    loadSelect() {
      // let token = JSON.parse(sessionStorage.getItem('currentUser')).TokenId
      this.$api.post('/cycle/assetData/listAll', {}, null, r => {
        console.log(r)
        let arr1 = []
        let arr2 = []
        r.data.forEach((item, index) => {
          if (arr1.indexOf(item.T0002_START_PILE) < 0)
            arr1.push(item.T0002_START_PILE)
          if (arr2.indexOf(item.T0002_END_PILE) < 0)
            arr2.push(item.T0002_END_PILE)
        })
        this.startzhArr = arr1
        this.endzhArr = arr2
      })
      this.$api.post('/cycle/assetType/listAll', {}, null, r => {
        this.zctypeArr = r.data
        console.log(this.zctypeArr)
        r.data.forEach((item, index) => {
          if (item.T0001_PID !== '0') {
            item.T0001_ASSETTYPE_NAME = '-- ' + item.T0001_ASSETTYPE_NAME
          }
        })
      })
    },
    loadTableData() {
      // let token = JSON.parse(sessionStorage.getItem('currentUser')).TokenId
      // console.log(token)
      this.$api.post('/cycle/assetData/listPage', {}, null, r => {
        console.log(r.data.returnParam)
        r.data.returnParam.forEach((item, index) => {
          // if (item.T0002_ASSET_NAME.indexOf('加油站') > -1) {
          //   item.pic = require('../assets/addoil.png')
          // } else if (item.T0002_ASSET_NAME.indexOf('桥') > -1) {
          //   item.pic = require('../assets/bridge.png')
          // } else if (item.T0002_ASSET_NAME.indexOf('互通立交') > -1) {
          //   item.pic = require('../assets/htlj.png')
          // } else if (item.T0002_ASSET_NAME.indexOf('收费站') > -1) {
          //   item.pic = require('../assets/sfz.png')
          // } else if (item.T0002_ASSET_NAME.indexOf('隧道') > -1) {
          //   item.pic = require('../assets/tenant.png')
          // } else if (item.T0002_ASSET_NAME.indexOf('涵洞') > -1) {
          // item.pic = item.files[0].FILE_URL
          // } else {

          // }
          if (!item.T0002_START_PILE) item.T0002_START_PILE = ''
          if (!item.T0002_ASSET_NAME) item.T0002_ASSET_NAME = ''
          if (!item.T0002_ASSET_AMOUNT) item.T0002_ASSET_AMOUNT = ''
          if (!item.T0002_ASSET_DATE) item.T0002_ASSET_DATE = ''
          if (!item.T0002_ASSET_PRECI) item.T0002_ASSET_PRECI = ''
          if (!item.T0002_ASSET_LATI) item.T0002_ASSET_LATI = ''
          if (item.files.length > 0) {
            item.pic = item.files[0].FILE_URL
            this.srcList.push(item.pic)
          } else {
            item.pic = ''
          }
          item.zh = item.T0002_START_PILE
          item.name = item.T0002_ASSET_NAME
          item.num = item.T0002_ASSET_AMOUNT
          item.year = item.T0002_ASSET_DATE
          item.location = [item.T0002_ASSET_PRECI, item.T0002_ASSET_LATI]
        })
        this.zcTable = r.data.returnParam.slice(0, 5)
      })
      this.$api.post('/cycle/techData/listPage', {}, null, r => {
        // console.log(r)
        r.data.returnParam.forEach((item, index) => {
          if (!item.T0002_ASSET_NAME) item.T0002_ASSET_NAME = ''
          if (!item.T0006_TECHTYPE_NAME) item.T0006_TECHTYPE_NAME = ''
          if (!item.T0003_CHECK_TIME) item.T0003_CHECK_TIME = ''
          // item.report = require('../assets/logo.png')
          item.name = item.T0002_ASSET_NAME
          item.tech = item.T0006_TECHTYPE_NAME
          item.date = item.T0003_CHECK_TIME
          item.year = item.T0003_CHECK_TIME.split('-')[0]
          if (item.files.length > 0) {
            item.report = item.files[0].FILE_URL
          } else {
            item.report = ''
          }
        })
        this.techTable = r.data.returnParam.slice(0, 5)
      })
      this.$api.post('/cycle/curingCost/listPage', {}, null, r => {
        // console.log(r)
        r.data.returnParam.forEach((item, index) => {
          if (!item.T0002_ASSET_NAME) item.T0002_ASSET_NAME = ''
          if (!item.T0006_TECHTYPE_NAME) item.T0006_TECHTYPE_NAME = ''
          if (!item.T0004_CURINGCOST_MONEY) item.T0004_CURINGCOST_MONEY = '0.00'
          if (!item.T0003_CHECK_TIME) item.T0003_CHECK_TIME = ''
          item.name = item.T0002_ASSET_NAME
          if (item.T0004_CURINGCOST_TYPE === 1) {
            item.income = item.T0004_CURINGCOST_MONEY
            item.expenditure = '--'
          } else {
            item.income = '--'
            item.expenditure = item.T0004_CURINGCOST_MONEY
          }
          item.date = item.T0004_CURINGCOST_TIME
          // item.bill = require('../assets/002.jpg')
          if (item.files.length > 0) {
            item.bill = item.files[0].FILE_URL
          } else {
            item.bill = ''
          }
        })
        this.dayliTable = r.data.returnParam.slice(0, 5)
      })
      this.$api.post('/cycle/costBudget/listPage', {}, null, r => {
        // console.log(r)
        r.data.returnParam.forEach((item, index) => {
          if (!item.T0002_ASSET_NAME) item.T0002_ASSET_NAME = ''
          if (!item.T0001_ASSETTYPE_NAME) item.T0001_ASSETTYPE_NAME = ''
          if (!item.T0005_COSTBUDGET_MONEY) item.T0005_COSTBUDGET_MONEY = '0.00'
          if (!item.T0003_CHECK_TIME) item.T0003_CHECK_TIME = ''
          item.name = item.T0002_ASSET_NAME
          item.cost = item.T0005_COSTBUDGET_MONEY
          switch (item.T0005_ENGIN_MAINT) {
            case 1:
              item.engineering = '日常养护'
              break
            case 2:
              item.engineering = '小修保养'
              break
            case 3:
              item.engineering = '中修工程'
              break
            case 4:
              item.engineering = '大修工程'
              break
          }
          item.date = item.T0005_COSTBUDGET_TIME
          // item.bill = require('../assets/logo.png')
          if (item.files.length > 0) {
            item.bill = item.files[0].FILE_URL
          } else {
            item.bill = ''
          }
        })
        this.conservTable = r.data.returnParam.slice(0, 5)
      })
    }
  }
}
</script>
<style lang="scss">
#workBanck{
  position: relative;
  .el-dialog__header{background: #f5f5f5;}
  // .el-dialog__title{color:#FFF;}
  // .el-dialog__headerbtn .el-dialog__close{color: #fff;}
  .el-select-dropdown__wrap {
    margin-bottom: 0 !important;
  }
  .el-scrollbar__wrap {
    margin-bottom: 0 !important;
  }
  .el-main {
    background: #fff;
    margin: 15px 10px;
    
  }
  #assetsWrap .el-main{height: 391px;}
  .el-table th, .el-table td{padding: 8px 0;}
  #topItems .el-col-4 {
    width: 20%;
  }
  .topItem {
    width: 100%;
    height: 80px;
    background: #bbb;
    color: #fff;
    line-height: 80px;
    cursor: pointer;
  }
  .topItem .ttile {
    width: 60%;
    text-align: left;
    font-size: 18px;
    float: left;
  }
  @media screen and (max-width: 1600px) {
    .topItem .ttile {
      width: 60%;
      text-align: left;
      font-size: 14px;
      float: left;
    }
    .mapSercLabel {
      font-size: 14px;
    }
  }
  .topItem .ticon {
    width: 40%;
    text-align: center;
    height: 80px;
    float: left;
  }
  .more {
    float: right;
  }
  .itemTh {
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    margin-bottom: 15px;
  }
  .el-icon-location {
    font-size: 20px;
    color: red;
    cursor: pointer;
  }
  .dTech {
    background: red;
    color: #fff;
    border-radius: 100%;
    width: 20px;
    height: 20px;
    display: inline-block;
    line-height: 20px;
  }
  .amap-wrapper {
    height: 500px;
  }
  #assetsMap {
    position: relative;
  }
  #assetsMap #astList {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 999;
    text-align: center;
    background: #fff;
    border-right: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
    border-collapse: collapse;
    height: 244px;
    overflow-y: auto;
    min-width: 100px;
  }
  #assetsMap #astList::-webkit-scrollbar {
    width: 5px;
  }
  #assetsMap #astList::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }
  #assetsMap #astList::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
  #assetsMap #astList tr {
    cursor: pointer;
  }
  #assetsMap #astList td,
  #assetsMap #astList th {
    text-align: center;
    border-left: 1px solid #bbb;
    font-size: 14px;
    vertical-align: middle;
    border-top: 1px solid #bbb;
    padding: 3px 10px;
  }
  #assetsMap #astList td img {
    height: 20px;
  }
  #mkDialog {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    transition: all 1s;
    display: none;
  }
  #mkDialog #mkBox {
    width: 600px;
    background: #fff;
    position: absolute;
    left: 25%;
    top: 80px;
    box-shadow: 0 0 5px #bbb;
    // padding: 8px;
  }
  @media screen and (max-width: 1400px) {
    #mkDialog #mkBox {
      width: 58%;
      left: 10%;
    }
  }
  #mkDialog #mkBox .close {
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
  }
  #mkDialog #mkBox table {
    width: 100%;
  }
  #mkDialog #mkBox table td.left {
    text-align: left;
  }
  #mkDialog #mkBox table td.right {
    text-align: right;
    min-width:100px;
  }
  #mkDialog #mkBox table td.imgWrap {
    width: 55%;
    text-align: center;
  }
  #mkDialog #mkBox .baseTb td.imgWrap img {
    height: 170px;
    width: 80%;
  }
  #mkDialog #mkBox .fgstb td.imgWrap img {
    height: 100px;
    width: 80%;
  }
  #mkDialog #mkBox .bdtable {
    width: 584px;
    border-top: 1px solid #bbb;
    border-left: 1px solid #bbb;
    border-collapse: collapse;
    margin:0 auto 20px auto;
  }
  #mkDialog #mkBox .bdtable th,
  #mkDialog #mkBox .bdtable td {
    text-align: center;
    border-right: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
    padding: 5px 8px;
    font-size: 14px;
  }
  table thead th{background: #f5f5f5;}
  #techLevel th,
  #techLevel td {
    min-width: 146px;
  }
  #dailyCost th,
  #dailyCost td {
    min-width: 113px;
  }
  #yhCost th,
  #yhCost td {
    min-width: 100px;
  }
  #fgsCost th,
  #fgsCost td {
    min-width: 106px;
  }
  .el-table .cell {
    text-overflow: clip !important;
  }
}

</style>
