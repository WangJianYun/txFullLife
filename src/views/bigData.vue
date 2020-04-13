<template>
  <div id="bigData">
    <el-main id="topItems">
      <el-row>
        <span
          style="display:inline-block;padding:10px;border-bottom:1px solid #efefef;width:100%;margin-bottom:20px;"
          >数据统计分析</span
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="topItem" style="background:rgb(114, 212, 223)">
            <div class="ticon" style="font-size:50px;">
              <i class="el-icon-user-solid"></i>
            </div>
            <div class="ttile">
              <p style="width:100%;text-align:left;">累计入驻养护工区</p>
              <p style="width:80%;text-align:right;">
                <span
                  style="font-size:20px;display:inline-block;margin:0 10px;"
                  >{{ rzyhgq }}</span
                >家
              </p>
            </div>
          </div>
        </el-col>
        <el-col :span="4"
          ><div class="topItem" style="background:rgb(143, 199, 64)">
            <div class="ticon" style="font-size:50px;">
              <i class="el-icon-user"></i>
            </div>
            <div class="ttile">
              <p style="width:100%;text-align:left;">累计使用用户</p>
              <p style="width:80%;text-align:right;">
                <span
                  style="font-size:20px;display:inline-block;margin:0 10px;"
                  >{{ ljyh }}</span
                >名
              </p>
            </div>
          </div>
        </el-col>
        <el-col :span="4"
          ><div class="topItem" style="background:rgb(104, 204, 166)">
            <div class="ticon" style="font-size:50px;">
              <i class="el-icon-s-data"></i>
            </div>
            <div class="ttile">
              <p style="width:100%;text-align:left;">公路资产总计</p>
              <p style="width:80%;text-align:right;">
                <span
                  style="font-size:20px;display:inline-block;margin:0 10px;"
                  >{{ glzc }}</span
                >
              </p>
            </div>
          </div>
        </el-col>
        <el-col :span="4"
          ><div class="topItem" style="background:rgb(255, 204, 102)">
            <div class="ticon" style="font-size:50px;">
              <i class="ri-money-dollar-circle-fill"></i>
            </div>
            <div class="ttile">
              <p style="width:100%;text-align:left;">
                日常费用详情<span style="font-size:13px;">（万元）</span>
              </p>
              <p style="width:80%;text-align:right;">
                收<span
                  style="font-size:20px;display:inline-block;margin:0 10px;"
                  >{{ rcfy }}</span
                >
              </p>
            </div>
          </div>
        </el-col>
        <el-col :span="4"
          ><div class="topItem" style="background:rgb(114, 212, 223)">
            <div class="ticon" style="font-size:50px;">
              <i class="ri-money-dollar-circle-fill"></i>
            </div>
            <div class="ttile">
              <p style="width:100%;text-align:left;">
                养护费用详情<span style="font-size:13px;">（万元）</span>
              </p>
              <p style="width:80%;text-align:right;">
                支<span
                  style="font-size:20px;display:inline-block;margin:0 10px;"
                  >{{ yhfy }}</span
                >
              </p>
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
            <span
              style="background:#efefef;display:inline-block;padding:3px 15px;font-size:15px;margin:0 10px 0 30px;"
              >检索范围</span
            >自
            <el-date-picker
              v-model="assetsRange"
              type="daterange"
              size="small"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="margin:0 10px;"
            >
            </el-date-picker>
            <el-button type="primary" size="mini" @click="getSerch"
              >搜索</el-button
            >
            <el-button type="info" class="more" size="mini" @click="checkRow"
              >查看<span style="padding-left:10px">>></span></el-button
            >
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
            <el-button type="info" class="more" size="mini" @click="checkSafe"
              >查看<span style="padding-left:10px">>></span></el-button
            >
          </el-row>
          <el-row>
            <div id="safeChart" class="dataChart"></div>
          </el-row>
        </el-main>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12"
        ><el-main>
          <el-row class="itemTh">
            日常费用收支情况
            <el-button
              type="info"
              class="more"
              size="mini"
              @click="checkDayCost"
              >查看<span style="padding-left:10px">>></span></el-button
            >
          </el-row>
          <el-row>
            <div id="dailyChart" class="dataChart"></div>
          </el-row> </el-main
      ></el-col>
      <el-col :span="12"
        ><el-main>
          <el-row class="itemTh">
            历年养护费用统计
            <el-button type="info" class="more" size="mini" @click="checkYhcost"
              >查看<span style="padding-left:10px">>></span></el-button
            >
          </el-row>
          <el-row>
            <div id="yearsChart" class="dataChart"></div> </el-row></el-main
      ></el-col>
      <!-- <el-col :span="8"><el-main>
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
            </el-row></el-main></el-col> -->
    </el-row>
    <el-main>
      <el-row type="flex" justify="space-between">
        <!-- <el-col :span="24"> -->
        <el-col :span="7">
          <el-row class="itemTh">
            桥梁技术等级检测数据
            <el-button type="info" class="more" size="mini" @click="checkBridge"
              >查看<span style="padding-left:10px">>></span></el-button
            >
          </el-row>
          <el-row>
            <div id="bridgeChart" class="dataChart"></div>
          </el-row>
        </el-col>
        <el-col :span="7">
          <el-row class="itemTh">
            隧道技术等级检测数据
            <el-button type="info" class="more" size="mini" @click="checkTunnel"
              >查看<span style="padding-left:10px">>></span></el-button
            >
          </el-row>
          <el-row>
            <div id="tunnelChart" class="dataChart"></div>
          </el-row>
        </el-col>
        <el-col :span="7">
          <el-row class="itemTh">
            涵洞技术等级检测数据
            <el-button type="info" class="more" size="mini" @click="checkHole"
              >查看<span style="padding-left:10px">>></span></el-button
            >
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
import 'remixicon/fonts/remixicon.css'
export default {
  data() {
    return {
      assetsRange: '',
      levelRange: '',
      rzyhgq: '',
      ljyh: '',
      glzc: '',
      rcfy: '',
      yhfy: ''
    }
  },
  mounted() {
    this.loadChart()
    this.loadSumData()
  },
  methods: {
    // 公路资产数据统计查看
    checkRow() {
      this.$router.push('/AssetsList')
    },
    // 交通安全设施数据统计查看
    checkSafe() {
      this.$router.push('/AssetsList')
    },
    // 日常费用查看
    checkDayCost() {
      this.$router.push('/dailyCostList')
    },
    // 养护费用查看
    checkYhcost() {
      this.$router.push('/yhCostList')
    },
    // 桥梁技术等级检测数据
    checkBridge() {
      this.$router.push('/techGradeList')
    },
    // 隧道技术等级检测数据
    checkTunnel() {
      this.$router.push('/techGradeList')
    },
    // 涵洞技术等级检测数据
    checkHole() {
      this.$router.push('/techGradeList')
    },
    getSerch() {
      // 公路资产接口里没有时间
      console.log(this.assetsRange)
      if (this.assetsRange.length > 0) {
        this.loadChart()
      }
    },
    loadSumData() {
      this.$api.post(
        '/cycle/bigData/getDataSum?M0018_ID=425428539089616896',
        {},
        null,
        r => {
          console.log(r)
          this.rzyhgq = r[0].YHGQ
          this.ljyh = r[0].RZYH
          this.glzc = r[0].GLZC
          this.rcfy = r[0].RCFY
          this.yhfy = r[0].YHFY
        }
      )
    },
    loadChart() {
      // let token = JSON.parse(sessionStorage.getItem('currentUser')).TokenId
      // 公路资产
      this.$api.post('/cycle/bigData/getAssetSumByType', {}, null, r => {
        let arr1 = []
        let arr2 = []
        console.log(r)
        r.forEach(element => {
          arr1.push(element.T0001_ASSETTYPE_NAME)
          arr2.push(element.ASSET_AMOUNT)
        })
        let myChart1 = this.$echarts.init(document.getElementById('roadChart'))
        // 绘制图表
        myChart1.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
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
            data: arr1
            // data: ['管理所', '桥梁', '隧道', '涵洞', '收费站', '服务区', '排水沟', '互通式立交', '标志牌', '绿化物', '停车区', '观景台', '养护设备', '沿线设施']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: arr2,
              type: 'bar',
              barWidth: 20,
              barGap: 0,
              barCategoryGap: 0,
              itemStyle: {
                normal: {
                  // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: function(params) {
                    var colorList = [
                      'rgb(164,205,238)',
                      'rgb(42,170,227)',
                      'rgb(25,46,94)',
                      'rgb(195,229,235)'
                    ]
                    return colorList[params.dataIndex]
                  }
                }
              }
            }
          ]
        })
      })
      // 交通安全
      // this.$api.post('/cycle/bigData/getAssetSumByType', {}, null, r => {
      this.$api.post('/cycle/bigData/getAmountSumByAqType', {}, null, r => {
        let arr2 = [['amount', 'product']]
        r.forEach(element => {
          let arr1 = [element.ASSET_AMOUNT, element.T0001_ASSETTYPE_NAME]
          arr2.push(arr1)
        })
        let myChart2 = this.$echarts.init(document.getElementById('safeChart'))
        // 绘制图表
        myChart2.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          dataset: {
            source: arr2
          },
          grid: {
            left: '32%',
            top: '0',
            right: '5%',
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
                  color: function(params) {
                    var colorList = [
                      'rgb(164,205,238)',
                      'rgb(42,170,227)',
                      'rgb(25,46,94)',
                      'rgb(195,229,235)'
                    ]
                    return colorList[params.dataIndex]
                  }
                }
              }
            }
          ]
        })
      })
      // 日常费用
      this.$api.post('/cycle/bigData/getMoneySumByCuring', {}, null, r => {
        let arr1 = [['product', '收入', '支出']]
        r.forEach(element => {
          let arr2 = [element.YEAR, element.INCOME_MONEY, element.TOCOME_MONEY]
          arr1.push(arr2)
        })
        let myChart3 = this.$echarts.init(document.getElementById('dailyChart'))
        // 绘制图表
        myChart3.setOption({
          legend: {},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '8%',
            top: '8%',
            right: '0',
            bottom: '8%'
          },
          dataset: {
            source: arr1
          },
          xAxis: { type: 'category' },
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [
            {
              type: 'bar',
              // barGap: '-50%',
              itemStyle: { color: 'rgb(164,205,238)' },
              barWidth: 30
            },
            { type: 'bar', itemStyle: { color: 'rgb(25,46,94)' }, barWidth: 30 }
          ]
        })
      })
      // 历年养护费用
      this.$api.post('/cycle/bigData/getMoneySumByCost', {}, null, r => {
        let arr1 = []
        let arr2 = []
        r.forEach(element => {
          arr1.push(element.YEAR)
          arr2.push(element.SUM_MOENY)
        })
        let myChart4 = this.$echarts.init(document.getElementById('yearsChart'))
        // 绘制图表
        myChart4.setOption({
          // legend: { data: ['支出', '收入'] },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'cross' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '8%',
            top: '8%',
            right: '0',
            bottom: '8%'
          },
          xAxis: {
            type: 'category',
            data: arr1
          },
          yAxis: {
            type: 'value',
            // 解决历年养护费用统计“Y轴”数字显示不全
            axisLabel: {
              margin: 2,
              formatter: function(value, index) {
                if (value >= 10000 && value < 10000000) {
                  value = value / 10000 + '万'
                } else if (value >= 10000000) {
                  value = value / 10000000 + '千万'
                }
                return value
              }
            }
          },
          series: [
            {
              name: '养护费用',
              data: arr2,
              type: 'line',
              itemStyle: {
                color: 'rgb(25,46,94)'
              }
            }
          ]
        })
      })
      // 桥梁数据
      this.$api.post(
        '/cycle/bigData/getCountByTech',
        { TYPE: 'QL' },
        null,
        r => {
          let arr1 = []
          r.forEach(element => {
            arr1.push({
              value: element.COUNT,
              name: element.T0006_TECHTYPE_NAME
            })
          })
          let myChart6 = this.$echarts.init(
            document.getElementById('bridgeChart')
          )
          // 绘制图表
          myChart6.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} 个'
            },
            series: [
              {
                name: '桥梁技术等级',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: arr1,
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
                    color: function(params) {
                      var colorList = [
                        'rgb(46,150,179)',
                        'rgb(255,202,93)',
                        'rgb(223,42,54)',
                        'rgb(254,145,46)',
                        'rgb(231,70,87)'
                      ]
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
        }
      )
      // 隧道数据
      this.$api.post(
        '/cycle/bigData/getCountByTech',
        { TYPE: 'SD' },
        null,
        r => {
          let arr1 = []
          // console.log(r)
          r.forEach(element => {
            arr1.push({
              value: element.COUNT,
              name: element.T0006_TECHTYPE_NAME
            })
          })
          let myChart7 = this.$echarts.init(
            document.getElementById('tunnelChart')
          )
          // 绘制图表
          myChart7.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} 个'
            },
            series: [
              {
                name: '隧道技术等级',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                data: arr1,
                itemStyle: {
                  normal: {
                    // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function(params) {
                      var colorList = [
                        'rgb(255,202,93)',
                        'rgb(100,208,220)',
                        'rgb(277,72,86)',
                        'rgb(254,145,46)',
                        'rgb(231,70,87)'
                      ]
                      return colorList[params.dataIndex]
                    }
                  }
                },
                label: {
                  normal: {
                    formatter: '{b}{value|{c}}个',
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
        }
      )
      // 涵洞数据
      this.$api.post(
        '/cycle/bigData/getCountByTech',
        { TYPE: 'HD' },
        null,
        r => {
          let arr1 = []
          // console.log(r)
          r.forEach(element => {
            arr1.push({
              value: element.COUNT,
              name: element.T0006_TECHTYPE_NAME
            })
          })
          let myChart8 = this.$echarts.init(
            document.getElementById('culvertChart')
          )
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
                sort: 'ascending',
                gap: 2,
                height: '240px',
                label: {
                  normal: {
                    show: true,
                    position: 'inside',
                    formatter: '{b} {value|{c}}个',
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
                data: arr1
              }
            ]
          })
        }
      )
    }
  }
}
</script>
<style>
#bigData .el-main {
  background: #fff;
  margin: 15px 10px;
}
#bigData #topItems .el-col-4 {
  width: 20%;
}
#bigData .topItem {
  width: 100%;
  height: 80px;
  background: #bbb;
  color: #fff;
  cursor: pointer;
}
#bigData .topItem .ttile {
  width: 65%;
  float: left;
}
#bigData .topItem .ttile p {
  line-height: 30px;
  margin: 5px 0;
  font-size: 16px;
}
@media screen and (max-width: 1600px) {
  #bigData .topItem .ttile p {
    font-size: 15px;
  }
}
#bigData .topItem .ticon {
  width: 35%;
  text-align: center;
  height: 80px;
  float: left;
}
@media screen and (max-width: 1400px) {
  #bigData .topItem .ttile {
    width: 70%;
    float: left;
  }
  #bigData .topItem .ticon {
    width: 30%;
  }
  #bigData .topItem .ttile p {
    font-size: 12px;
  }
}
#bigData .more {
  float: right;
}
#bigData .itemTh {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
}
#bigData .el-icon-location {
  font-size: 20px;
  color: red;
  cursor: pointer;
}
#bigData .dTech {
  background: red;
  color: #fff;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  display: inline-block;
  line-height: 20px;
}
#bigData .amap-wrapper {
  height: 500px;
}
#bigData .dataChart {
  height: 300px;
}
.el-range-separator {
  width: 25px !important;
}
</style>
