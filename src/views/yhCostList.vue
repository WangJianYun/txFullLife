<template>
  <div id="yhCostMap">
    <p class="title-p">
      <span style="display:inline-block;margin-bottom:20px;">>> 历年费用收支详情</span>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addShowFun"
      >增加养护费用收支</el-button>
    </p>
    <div class="content">
      <el-row :gutter="20">
        <el-form
          label-position="right"
          label-width="70px"
          :model="cost"
        >
          <el-col :span="4">
            <el-form-item label="资产类别">
              <el-select
                v-model="cost.a"
                style="width:100%"
              >
                <el-option
                  v-for="item in assetList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="养护工程">
              <el-select
                v-model="cost.code"
                style="width:100%"
              >
                <el-option
                  v-for="item in projectList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="起点桩号">
              <el-select
                v-model="cost.code1"
                style="width:100%"
              >
                <el-option
                  v-for="item in stationList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="终点桩号">
              <el-select
                v-model="cost.code2"
                style="width:100%"
              >
                <el-option
                  v-for="item in stationList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="起止日期">
              <el-date-picker
                style="width:100%"
                v-model="cost.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
        <el-button
          type="primary"
          icon="el-icon-delete"
        >批量删除</el-button>
        <span class="serach-span"> 您的检索： <span> 无 </span> </span>
      </div>
      <div class="table-div">
        <el-table
          v-loading.body="loading"
          :data="tableData"
          border
          style="width: 100%"
          highlight-current-row
          @select="selectTable"
          @select-all="selectAll"
          :header-cell-style="{background:'#f0f0f0'}"
        >
          >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            label="序号"
            width="50"
            align="center"
          >
            <template scope="scope"><span>{{scope.$index + 1}}</span></template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="资产名称"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="资产类别"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="a"
            label="费用（万元）"
          >
          </el-table-column>
          <el-table-column
            prop="b"
            label="养护工程"
          >
          </el-table-column>
          <el-table-column
            prop="c"
            label="起点桩号"
          >
          </el-table-column>
          <el-table-column
            prop="d"
            label="终点桩号"
          >
          </el-table-column>
          <el-table-column
            prop="e"
            label="所属路段"
          >
          </el-table-column>
          <el-table-column
            prop="f"
            label="费用发生时间"
          >
          </el-table-column>
          <el-table-column
            prop="g"
            label="票据查看"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            width="175"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                type="info"
                size="mini"
                @click="handleInfo(scope.row)"
              >查看</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="handleEdit(scope.row)"
              >编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--  新增 -->
    <el-dialog
      title="养护费用收支录入"
      :visible.sync="addShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <el-row :gutter="20">
        <el-form
          label-position="right"
          label-width="100px"
          :model="cost"
        >
          <el-col :span="2">
            <el-form-item label="资产范围检索">
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="资产类别">
              <el-select
                v-model="cost.a"
                style="width:100%"
                size="small"
              >
                <el-option
                  v-for="item in assetList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="搜索关键词">
              <el-input
                v-model.trim="cost.words"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button
              type="primary"
              size="small"
            >搜索</el-button>
          </el-col>
        </el-form>
      </el-row>
      <el-row :gutter="20">
        <el-form
          label-position="right"
          label-width="100px"
          :model="cost"
        >
          <el-col :span="2">
            <el-form-item label="桩号范围检索">
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="起点桩号">
              <el-select
                v-model="cost.code1"
                style="width:100%"
                size="small"
              >
                <el-option
                  v-for="item in stationList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="终点桩号">
              <el-select
                v-model="cost.code2"
                style="width:100%"
                size="small"
              >
                <el-option
                  v-for="item in stationList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button
              type="primary"
              size="small"
            >搜索</el-button>
          </el-col>
        </el-form>
      </el-row>
      <p> 您的检索： </p>
      <table class="add-table">
        <tr>
          <td class="bg-td">请选择资产：</td>
          <td>
            <el-select
              v-model="cost.code1"
              style="width:100%"
              size="small"
            >
              <el-option
                v-for="item in stationList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </td>
          <td class="bg-td">金额（万元）： </td>
          <td>
            <el-input
              v-model.trim="cost.words"
              size="small"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">养护工程选择： </td>
          <td>
            <el-select
              v-model="cost.code1"
              style="width:100%"
              size="small"
            >
              <el-option
                v-for="item in stationList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </td>
          <td class="bg-td">工程时间区间：</td>
          <td>
            <el-date-picker
              size="small"
              style="width:100%"
              v-model="cost.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td class="bg-td">票据上传：</td>
          <td colspan="3"></td>
        </tr>
        <tr>
          <td class="bg-td">费用况详情（备注）：</td>
          <td colspan="3">
            <el-input
              type="textarea"
              v-model="cost.desc"
            ></el-input>
          </td>
        </tr>
      </table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addShow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog
      title="养护费用收支查看"
      :visible.sync="infoShow"
      custom-class="dialog-div"
    >
    <p>  查看 </p>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data () {
    return {
      addShow: false,
      infoShow: false,
      loading: false,
      selectList: [],
      addForm: {},
      rulesForm: {},
      cost: {
        a: '',
        code: '',
        code1: '',
        code2: '',
        time: []
      },
      assetList: [
        {
          code: '1',
          name: '一类'
        },
        {
          code: '2',
          name: '二类'
        },
        {
          code: '3',
          name: '三类'
        },
        {
          code: '4',
          name: '四类'
        }
      ],
      projectList: [
        {
          code: '1',
          name: '日常养护'
        },
        {
          code: '2',
          name: '小修保养'
        },
        {
          code: '3',
          name: '中修工程'
        },
        {
          code: '4',
          name: '大修工程'
        }
      ],
      stationList: [
        {
          code: '1',
          name: 'K692+265'
        },
        {
          code: '2',
          name: 'K692+300'
        },
        {
          code: '3',
          name: 'K692+400'
        },
        {
          code: '4',
          name: 'K692+500'
        }
      ],
      tableData: [
        {
          date: '2016-05-03',
          name: '一类',
          address: '收费站',
          a: '3.00',
          b: '日常维护',
          c: 'K692+265',
          d: 'K742+326',
          e: '铜旬段',
          f: '2016-05-03',
          g: '票据查看'
        },
        {
          date: '2016-05-02',
          name: '二类',
          address: '桥梁--特大桥',
          a: '3.00',
          b: '日常维护',
          c: 'K692+265',
          d: 'K742+326',
          e: '铜旬段',
          f: '2016-05-03',
          g: '票据查看'
        }
      ]
    }
  },
  created () {},
  methods: {
    // 点击新建
    addShowFun () {
      this.addShow = true
    },
    selectTable (selection) {
      this.selectList = selection
    },
    selectAll (selection) {
      this.selectList = selection
    },
    handleInfo (data) {
      this.infoShow = true
    },
    handleEdit (data) {},
    handleDelete (data) {}
  }
}
</script>
<style scoped lang="scss">
#yhCostMap {
  .title-p {
    button {
      float: right;
    }
  }
  .content {
    background: #fff;
    padding: 30px 20px;
  }
  .serach-span {
    margin-left: 10px;
  }
  .table-div {
    margin-top: 30px;
    .el-button--mini {
      padding: 4px 8px;
    }
  }
  .add-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #dcdfe6;
    tr {
      border: 1px solid #dcdfe6;
      td {
        border: 1px solid #dcdfe6;
        padding: 5px 10px;
      }
    }
    .bg-td {
      background: #f0f0f0;
      text-align: center;
    }
  }
}
</style >
<style lang="scss">
#yhCostMap {
  .dialog-div {
    width: 1000px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style >
