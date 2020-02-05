<template>
    <div id="workBanck">
      <el-main id="topItems">
        <el-row :gutter="30">
          <el-col :span="4"><div class="topItem" style="background:rgb(114, 212, 223)" @click="toBaseData"><div class="ticon"></div><div class="ttile">公路基础数据</div></div></el-col>
          <el-col :span="4"><div class="topItem" style="background:rgb(143, 199, 64)" @click="toAssets"><div class="ticon"></div><div class="ttile">公路资产数据</div></div></el-col>
          <el-col :span="4"><div class="topItem" style="background:rgb(104, 204, 166)" @click="toTech"><div class="ticon"></div><div class="ttile">路产技术状况</div></div></el-col>
          <el-col :span="4"><div class="topItem" style="background:rgb(255, 204, 102)" @click="toDayliCost"><div class="ticon"></div><div class="ttile">日常费用收支</div></div></el-col>
          <el-col :span="4"><div class="topItem" style="background:rgb(114, 212, 223)" @click="toConsCost"><div class="ticon"></div><div class="ttile">养护费用管理</div></div></el-col>
        </el-row>
      </el-main>
      <el-row>
        <el-col :span="12">
          <el-main>
            <el-row class="itemTh">
              公路资产
              <el-button type="info" class="more" size="mini">查看>></el-button>
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
              <el-button type="info" class="more" size="mini">查看>></el-button>
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
                      <el-button type="primary" size="small" :btitle="scope.row.report">报告查看</el-button>
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
              <el-button type="info" class="more" size="mini">查看>></el-button>
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
                      <el-button type="primary" size="small" :btitle="scope.row.bill">票据查看</el-button>
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
              <el-button type="info" class="more" size="mini">查看>></el-button>
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
                      <el-button type="primary" size="small" :btitle="scope.row.bill">票据查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-row>
          </el-main>
        </el-col>
      </el-row>
      <el-row>
        <el-dialog  title="位置查看" :visible.sync="locationDialog" width="60%">
          <!-- <el-main> -->
            <el-row>
              <div id="markerMap">
                <div class="amap-wrapper">
                  <el-amap class="amap-box" vid="map"
                    :zoom="zoom"
                    :center="center">
                    <el-amap-marker vid="marker"
                      :icon="icon"
                      :position="center"
                      :label="label"
                      >
                    </el-amap-marker>
                  </el-amap>
                </div>
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
      locationDialog: false,
      zoom: 10,
      center: [108.860159, 34.978],
      icon: '',
      label: {
        content: '',
        offset: [10, -20]
      },
      zcTable: [
        { zh: 'K111', name: '吕村收费站', num: '1', pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578919218447&di=88173d153222fa2a4a93340176956f20&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F53%2F76%2F16pic_5376776_b.jpg', year: '2016-05-02', location: [108.860159, 34.978] },
        { zh: 'K111', name: '薛家咀大桥', num: '1', pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578919218447&di=88173d153222fa2a4a93340176956f20&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F53%2F76%2F16pic_5376776_b.jpg', year: '2016-05-02', location: [108.850159, 34.878] },
        { zh: 'K111', name: '吕村河1号大桥', num: '1', pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578919218447&di=88173d153222fa2a4a93340176956f20&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F53%2F76%2F16pic_5376776_b.jpg', year: '2016-05-02', location: [108.840159, 34.778] },
        { zh: 'K111', name: '架子山隧道', num: '1', pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578919218447&di=88173d153222fa2a4a93340176956f20&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F53%2F76%2F16pic_5376776_b.jpg', year: '2016-05-02', location: [108.830159, 34.678] },
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
      srcList: []
    }
  },
  mounted () {
    this.setPicList()
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
      this.center = local
      this.label = {
        content: name,
        offset: [10, -20]
      }
    }
  }
}
</script>
<style>
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
</style>
