<template>
    <div id="bigData">
      <el-main id="topItems">
        <el-row>
          <span style="display:inline-block;padding:10px;border-bottom:1px solid #efefef;width:100%;margin-bottom:20px;">数据统计分析</span>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="4">
            <div class="topItem" style="background:rgb(114, 212, 223)">
              <div class="ticon"></div>
              <div class="ttile">
                <p style="width:100%;text-align:left;">累计入驻养护工区</p>
                <p style="width:80%;text-align:right;"><span style="font-size:20px;display:inline-block;margin:0 10px;">5</span>家</p>
              </div>
            </div>
          </el-col>
          <el-col :span="4"><div class="topItem" style="background:rgb(143, 199, 64)"><div class="ticon"></div>
            <div class="ttile">
              <p style="width:100%;text-align:left;">累计使用用户</p>
              <p style="width:80%;text-align:right;"><span style="font-size:20px;display:inline-block;margin:0 10px;">58</span>名</p>
            </div>
            </div>
          </el-col>
          <el-col :span="4"><div class="topItem" style="background:rgb(104, 204, 166)"><div class="ticon"></div>
            <div class="ttile">
              <p style="width:100%;text-align:left;">公路资产总计</p>
              <p style="width:80%;text-align:right;"><span style="font-size:20px;display:inline-block;margin:0 10px;">256,368,266</span></p>
            </div>
            </div>
          </el-col>
          <el-col :span="4"><div class="topItem" style="background:rgb(255, 204, 102)"><div class="ticon"></div>
            <div class="ttile">
              <p style="width:100%;text-align:left;">日常费用详情<span style="font-size:14px;">（万元）</span></p>
              <p style="width:80%;text-align:right;">收<span style="font-size:20px;display:inline-block;margin:0 10px;">25630</span></p>
            </div>
            </div>
          </el-col>
          <el-col :span="4"><div class="topItem" style="background:rgb(114, 212, 223)"><div class="ticon"></div>
            <div class="ttile">
              <p style="width:100%;text-align:left;">养护费用详情<span style="font-size:14px;">（万元）</span></p>
              <p style="width:80%;text-align:right;">支<span style="font-size:20px;display:inline-block;margin:0 10px;">13250</span></p>
            </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
      <el-row>
        <el-col :span="18">
          <el-main>
            <el-row class="itemTh">
              公路资产数据统计
              <span style="background:#efefef;display:inline-block;padding:3px 15px;font-size:15px;margin:0 10px 0 30px;">检索范围</span>自
              <el-date-picker
                v-model="assetsRange"
                type="daterange"
                size="small"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="margin:0 10px;">
              </el-date-picker>
              <el-button type="primary" size="mini">搜</el-button>
              <el-button type="info" class="more" size="mini">查看>></el-button>
            </el-row>
            <el-row>
              <div id="roadChart" class="dataChart"></div>
            </el-row>
          </el-main>
        </el-col>
        <el-col :span="6">
          <el-main>
            <el-row class="itemTh">
              交通安全设施数据统计
              <el-button type="info" class="more" size="mini">查看>></el-button>
            </el-row>
            <el-row>
              <div id="safeChart" class="dataChart"></div>
            </el-row>
          </el-main>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><el-main>
            <el-row class="itemTh">
              日常费用收支情况
              <el-button type="info" class="more" size="mini">查看>></el-button>
            </el-row>
            <el-row>
              <div id="dailyChart" class="dataChart"></div>
            </el-row>
          </el-main></el-col>
        <el-col :span="8"><el-main>
            <el-row class="itemTh">
              历年养护费用统计
              <el-button type="info" class="more" size="mini">查看>></el-button>
            </el-row>
            <el-row>
              <div id="yearsChart" class="dataChart"></div>
            </el-row></el-main></el-col>
        <el-col :span="8"><el-main>
            <el-row class="itemTh">
              路面技术等级检测数据
               <el-date-picker
                size="small"
                v-model="levelRange"
                type="year"
                style="width:120px"
                placeholder="选择年">
              </el-date-picker>
              <el-button type="primary" size="mini">搜</el-button>
              <el-button type="info" class="more" size="mini">查看>></el-button>
            </el-row>
            <el-row>
              <div id="techChart" class="dataChart"></div>
            </el-row></el-main></el-col>
      </el-row>
      <el-main>
        <el-row type="flex" justify="space-between">
          <!-- <el-col :span="24"> -->
              <el-col :span="7">
                <el-row class="itemTh">
                  桥梁技术等级检测数据
                  <el-button type="info" class="more" size="mini">查看>></el-button>
                </el-row>
                <el-row>
                  <div id="bridgeChart" class="dataChart"></div>
                </el-row>
              </el-col>
              <el-col :span="7">
                <el-row class="itemTh">
                  隧道技术等级检测数据
                  <el-button type="info" class="more" size="mini">查看>></el-button>
                </el-row>
                <el-row>
                  <div id="tunnelChart" class="dataChart"></div>
                </el-row>
              </el-col>
              <el-col :span="7">
                <el-row class="itemTh">
                  涵洞技术等级检测数据
                  <el-button type="info" class="more" size="mini">查看>></el-button>
                </el-row>
                <el-row>
                  <div id="culvertChart" class="dataChart"></div>
                </el-row>
              </el-col>
          <!-- </el-col> -->
        </el-row>
      </el-main>
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
      srcList: [],
      assetsRange: '',
      levelRange: ''
    }
  },
  mounted () {
    this.setPicList()
    this.loadChart()
  },
  methods: {
    setPicList () {
      let tst = this
      this.zcTable.forEach(function (i, n) {
        tst.srcList.push(i.pic)
      })
      // console.log(tst.srcList)
    },
    openDialog (local, name) {
      this.locationDialog = true
      this.center = local
      this.label = {
        content: name,
        offset: [10, -20]
      }
    },
    loadChart () {
      let myChart1 = this.$echarts.init(document.getElementById('roadChart'))
      // 绘制图表
      myChart1.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          name: '数量/单位',
          nameLocation: 'start',
          axisLabel: {
            interval: 0,
            rotate: 40
          },
          nameTextStyle: {
            fontSize: 12
          },
          data: ['管理所', '桥梁', '隧道', '涵洞', '收费站', '服务区', '排水沟', '互通式立交', '标志牌', '绿化物', '停车区', '观景台', '养护设备', '沿线设施']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 200, 150, 80, 70, 110, 110, 110, 110],
          type: 'bar',
          barWidth: 20,
          barGap: 0,
          barCategoryGap: 0,
          itemStyle: {
            normal: {
              // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              color: function (params) {
                var colorList = ['rgb(164,205,238)', 'rgb(42,170,227)', 'rgb(25,46,94)', 'rgb(195,229,235)']
                return colorList[params.dataIndex]
              }
            }
          }
        }]
      })
      let myChart2 = this.$echarts.init(document.getElementById('safeChart'))
      // 绘制图表
      myChart2.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        dataset: {
          source: [
            ['amount', 'product'],
            [122, '导向标'],
            [313, '防抛网'],
            [214, '收费站护栏'],
            [425, '金属制品护栏'],
            [163, '方钢护栏'],
            [423, '预应力护栏'],
            [242, '隔音墙'],
            [216, '轮廓标'],
            [187, '防眩板'],
            [278, '波形梁护栏']
          ]
        },
        grid: {
          left: '25%',
          top: '0',
          right: '0',
          bottom: '0'
        },
        xAxis: { show: false },
        yAxis: { type: 'category' },
        series: [
          {
            type: 'bar',
            encode: {
              // Map the "amount" column to X axis.
              x: 'amount',
              // Map the "product" column to Y axis
              y: 'product'
            },
            label: {
              show: true,
              position: 'right'
            },
            barWidth: 10,
            barGap: 5,
            barCategoryGap: 0,
            itemStyle: {
              normal: {
                // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  var colorList = ['rgb(164,205,238)', 'rgb(42,170,227)', 'rgb(25,46,94)', 'rgb(195,229,235)']
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      })
      let myChart3 = this.$echarts.init(document.getElementById('dailyChart'))
      // 绘制图表
      myChart3.setOption({
        legend: {},
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '6%',
          top: '8%',
          right: '0',
          bottom: '8%'
        },
        dataset: {
          source: [
            ['product', '收入', '支出'],
            ['2016', 43.3, 85.8],
            ['2017', 83.1, 73.4],
            ['2018', 86.4, 65.2],
            ['2019', 72.4, 53.9]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: 'bar',
            barGap: '-50%',
            itemStyle: { color: 'rgb(164,205,238)' },
            barWidth: 30 },
          { type: 'bar',
            itemStyle: { color: 'rgb(25,46,94)' },
            barWidth: 30 }
        ]
      })
      let myChart4 = this.$echarts.init(document.getElementById('yearsChart'))
      // 绘制图表
      myChart4.setOption({
        legend: { data: ['支出', '收入'] },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'cross' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '6%',
          top: '8%',
          right: '0',
          bottom: '8%'
        },
        xAxis: {
          type: 'category',
          data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '支出',
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          itemStyle: {
            color: 'rgb(25,46,94)'
          }
        }, {
          name: '收入',
          data: [80, 93, 341, 1934, 1000, 1030, 1320],
          type: 'line',
          itemStyle: { color: 'rgb(164,205,238)' }
        }]
      })
      let myChart5 = this.$echarts.init(document.getElementById('techChart'))
      // 绘制图表
      myChart5.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'cross' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        angleAxis: {
          type: 'category',
          data: ['优', '良', '中', '次', '差']
        },
        radiusAxis: {
        },
        polar: {
        },
        series: [{
          type: 'bar',
          data: [ 1, 2, 3, 4, 3 ],
          coordinateSystem: 'polar',
          stack: 'a',
          itemStyle: {
            normal: {
              // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              color: function (params) {
                var colorList = ['rgb(164,205,238)', 'rgb(42,170,227)', 'rgb(25,46,94)', 'rgb(195,229,235)']
                return colorList[params.dataIndex]
              }
            }
          }
        }]
      })
      let myChart6 = this.$echarts.init(document.getElementById('bridgeChart'))
      // 绘制图表
      myChart6.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '桥梁技术等级',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '一类' },
              { value: 310, name: '二类' },
              { value: 234, name: '三类' },
              { value: 135, name: '四类' },
              { value: 1548, name: '五类' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            itemStyle: {
              normal: {
              // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  var colorList = ['rgb(164,205,238)', 'rgb(42,170,227)', 'rgb(25,46,94)', 'rgb(195,229,235)']
                  return colorList[params.dataIndex]
                }
              }
            },
            label: {
              normal: {
                formatter: '{b}{value|{c}}座',
                rich: {
                  value: {
                    fontSize: 20
                  }
                }
              }

            }
          }
        ]
      })
      let myChart7 = this.$echarts.init(document.getElementById('tunnelChart'))
      // 绘制图表
      myChart7.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '隧道技术等级',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            data: [
              { value: 335, name: '一级' },
              { value: 310, name: '二级' },
              { value: 234, name: '三级' }
            ],
            itemStyle: {
              normal: {
              // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  var colorList = ['rgb(164,205,238)', 'rgb(42,170,227)', 'rgb(25,46,94)']
                  return colorList[params.dataIndex]
                }
              }
            },
            label: {
              normal: {
                formatter: '{b}{value|{c}}座',
                rich: {
                  value: {
                    fontSize: 20
                  }
                }
              }

            }
          }
        ]
      })
      let myChart8 = this.$echarts.init(document.getElementById('culvertChart'))
      // 绘制图表
      myChart8.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}个'
        },
        series: [
          {
            name: '涵洞技术等级',
            type: 'funnel',
            top: 15,
            // x2: 80,
            bottom: 15,
            left: 0,
            width: '100%',
            // height: {totalHeight} - y - y2,
            minSize: '0%',
            maxSize: '80%',
            // height: {totalHeight} - y - y2,
            sort: 'descending',
            gap: 2,
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter: '{b}{value|{c}}个',
                rich: {
                  value: {
                    fontSize: 20,
                    color: '#fff'
                  }
                }
              }
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: 25, name: '好' },
              { value: 15, name: '较好' },
              { value: 8, name: '较差' },
              { value: 2, name: '差' },
              { value: 1, name: '危险' }
            ]
          }
        ]
      })
    }
  }
}
</script>
<style>
  #bigData .el-main{background: #fff;margin:15px 10px;}
  #bigData #topItems .el-col-4{width: 20%;}
  #bigData .topItem{width: 100%;height: 80px;background: #bbb;color: #fff;cursor: pointer;}
  #bigData .topItem .ttile{width: 60%;float: left;}
  #bigData .topItem .ttile p{line-height: 30px;margin:5px 0;font-size: 16px;}
  #bigData .topItem .ticon{width: 40%;text-align: center;height: 80px;float: left;}
  #bigData .more{float: right;}
  #bigData .itemTh{padding: 8px 0;border-bottom: 1px solid #eee;margin-bottom: 15px;}
  #bigData .el-icon-location{font-size: 20px;color: red;cursor: pointer;}
  #bigData .dTech{background:red;color: #fff;border-radius: 100%;width: 20px;height: 20px;display: inline-block;line-height: 20px;}
  #bigData .amap-wrapper{
    height: 500px;
  }
  #bigData .dataChart{height: 300px;}
</style>
