/*
 * @Author: liuhaosheng
 * @Description：日常费用收支列表
 */
<template>
  <div class="dailycost-wrap">
    <p class="title-p">
      <span style="display:inline-block;margin-bottom:20px;"> >> 日常费用收支列表 </span>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addFun"
      >增加日常费用收支
      </el-button>
    </p>
    <div class="content">
      <el-row :gutter="10">
        <el-form
          label-position="right"
          label-width="70px"
          :model="cost"
        >
          <el-col :span="4">
            <el-form-item label="资产类别">
              <el-select
                v-model="dailycost.a"
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
            <el-form-item label="费用收支">
              <el-select
                v-model="dailycost.code"
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
            <el-form-item label="起点桩号">
              <el-select
                v-model="dailycost.code1"
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
            <el-form-item label="终点桩号">
              <el-select
                v-model="dailycost.code2"
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
          <el-col :span="8">
            <el-form-item label="起止日期">
              <el-date-picker
                style="width:100%"
                v-model="dailycost.time"
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
          @click="delListFun"
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
            width="40"
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
            prop="T0002_ASSET_NAME"
            label="资产名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="T0001_ID"
            label="资产类别"
          >
          </el-table-column>
          <el-table-column
            prop="T0004_CURINGCOST_NAME"
            label="费用名称"
          >
          </el-table-column>
          <el-table-column
            prop="T0002_END_PILE"
            label="收入（元）"
          >
          </el-table-column>
          <el-table-column
            prop="T0002_ASSET_AMOUNT"
            label="支出（元）"
          >
          </el-table-column>
          <el-table-column
            prop="M0010_ID"
            label="起点桩号"
          >
          </el-table-column>
          <el-table-column
            prop="M0009_PILENUMBER_YEAR"
            label="终点桩号"
          >
          </el-table-column>
          <el-table-column
            prop="T0002_TECH_STATE"
            label="所属路段"
          >
          </el-table-column>
          <el-table-column
            prop="T0002_ASSET_DATE"
            label="费用发生时间"
          >
          </el-table-column>
          <el-table-column label="票据查看">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleInfo(scope.row)"
              >票据查看</el-button>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            width="170"
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
        <el-pagination
          class="table-page"
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="dailycost.currentPage"
          :page-sizes="[10, 50, 100]"
          :page-size="dailycost.showCount"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 新建 -->
    <el-dialog
      title=">> 日常费用录入"
      :visible.sync="addShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <el-row :gutter="10">
        <el-form
          label-position="right"
          label-width="70px"
          :model="dailycost"
        >
          <el-col :span="5">
            <el-form-item label="资产类别">
              <el-select
                v-model="dailycost.a"
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
          <el-col :span="5">
            <el-form-item label="起点桩号">
              <el-select
                v-model="dailycost.a"
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
          <el-col :span="5">
            <el-form-item label="终点桩号">
              <el-select
                v-model="dailycost.code"
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
          <el-col :span="5">
            <el-form-item label="关键字">
              <el-input v-model.trim="addForm.T0002_END_PILE"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">搜索</el-button>
            <el-button>重置</el-button>
          </el-col>
        </el-form>
      </el-row>
      <p> 您的检索： <span> 无 </span> </p>
      <table class="add-table">
        <tr>
          <td class="bg-td">请选择资产：</td>
          <td>
            <el-select
              v-model="addForm.T0001_ID"
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
          </td>
          <td class="bg-td"> </td>
          <td> </td>
        </tr>
        <tr>
          <td class="bg-td">费用名称： </td>
          <td>
            <el-input
              v-model.trim="addForm.T0002_ASSET_AMOUNT"
              size="small"
            ></el-input>
          </td>
          <td class="bg-td">金额（元）：</td>
          <td>
            <el-input
              v-model.trim="addForm.T0002_END_PILE"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">收支选择： </td>
          <td>
            <el-radio-group v-model="addForm.T0004_CURINGCOST_TYPE">
              <el-radio :label="1">收入</el-radio>
              <el-radio :label="2">支出</el-radio>
            </el-radio-group>

          </td>
          <td class="bg-td">归属时间：</td>
          <td>
            <el-date-picker
              v-model="addForm.T0004_CREATE_TIME"
              type="date"
              size="small"
              style="width:100%"
            >
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td class="bg-td">票据上传：</td>
          <td colspan="3">
          </td>
        </tr>
        <tr>
          <td class="bg-td">费用况详情（备注）：</td>
          <td colspan="3">
            <el-input
              type="textarea"
              v-model="addForm.T0004_CURINGCOST_REMARK"
              maxlength="500"
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
    <!-- 修改 -->
    <el-dialog
      title=">> 修改日常费用"
      :visible.sync="editShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <el-row :gutter="10">
        <el-form
          label-position="right"
          label-width="70px"
          :model="dailycost"
        >
          <el-col :span="5">
            <el-form-item label="资产类别">
              <el-select
                v-model="dailycost.a"
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
          <el-col :span="5">
            <el-form-item label="起点桩号">
              <el-select
                v-model="dailycost.a"
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
          <el-col :span="5">
            <el-form-item label="终点桩号">
              <el-select
                v-model="dailycost.code"
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
          <el-col :span="5">
            <el-form-item label="关键字">
              <el-input v-model.trim="addForm.T0002_END_PILE"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">搜索</el-button>
            <el-button>重置</el-button>
          </el-col>
        </el-form>
      </el-row>
      <p> 您的检索： <span> 无 </span> </p>
      <table class="add-table">
        <tr>
          <td class="bg-td">请选择资产：</td>
          <td>
            <el-select
              v-model="editForm.T0001_ID"
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
          </td>
          <td class="bg-td"> </td>
          <td> </td>
        </tr>
        <tr>
          <td class="bg-td">费用名称： </td>
          <td>
            <el-input
              v-model.trim="editForm.T0002_ASSET_AMOUNT"
              size="small"
            ></el-input>
          </td>
          <td class="bg-td">金额（元）：</td>
          <td>
            <el-input
              v-model.trim="editForm.T0002_END_PILE"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">收支选择： </td>
          <td>
            <el-radio-group v-model="editForm.T0004_CURINGCOST_TYPE">
              <el-radio :label="1">收入</el-radio>
              <el-radio :label="2">支出</el-radio>
            </el-radio-group>

          </td>
          <td class="bg-td">归属时间：</td>
          <td>
            <el-date-picker
              v-model="editForm.T0004_CREATE_TIME"
              type="date"
              size="small"
              style="width:100%"
            >
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td class="bg-td">票据上传：</td>
          <td colspan="3">
          </td>
        </tr>
        <tr>
          <td class="bg-td">费用况详情（备注）：</td>
          <td colspan="3">
            <el-input
              type="textarea"
              v-model="editForm.T0004_CURINGCOST_REMARK"
              maxlength="500"
            ></el-input>
          </td>
        </tr>
      </table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editShow = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog
      title=">> 查看日常费用"
      :visible.sync="infoShow"
      custom-class="dialog-div"
    >
      <table class="add-table">
        <tr>
          <td class="bg-td">请选择资产：</td>
          <td>
            <el-select
              v-model="infoForm.T0001_ID"
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
          </td>
          <td class="bg-td"> </td>
          <td> </td>
        </tr>
        <tr>
          <td class="bg-td">费用名称： </td>
          <td>
            <el-input
              v-model.trim="infoForm.T0002_ASSET_AMOUNT"
              size="small"
            ></el-input>
          </td>
          <td class="bg-td">金额（元）：</td>
          <td>
            <el-input
              v-model.trim="infoForm.T0002_END_PILE"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">收支选择： </td>
          <td>
            <el-radio-group v-model="infoForm.T0004_CURINGCOST_TYPE">
              <el-radio :label="1">收入</el-radio>
              <el-radio :label="2">支出</el-radio>
            </el-radio-group>

          </td>
          <td class="bg-td">归属时间：</td>
          <td>
            <el-date-picker
              v-model="infoForm.T0004_CREATE_TIME"
              type="date"
              size="small"
              style="width:100%"
            >
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td class="bg-td">票据上传：</td>
          <td colspan="3">
          </td>
        </tr>
        <tr>
          <td class="bg-td">费用况详情（备注）：</td>
          <td colspan="3">
            <el-input
              type="textarea"
              v-model="infoForm.T0004_CURINGCOST_REMARK"
              maxlength="500"
            ></el-input>
          </td>
        </tr>
      </table>
      <div
        slot="footer"
        class="dialog-footer"
      >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      assetList: [],
      loading: false,
      addShow: false,
      editShow: false,
      infoShow: false,
      editForm: {},
      addForm: {},
      infoForm: {},
      dailycost: {
        showCount: 10,
        currentPage: 1
      },
      tableData: [
        {
          T0002_ASSET_NAME: '吕村收费站',
          T0001_ID: '收费站',
          T0002_START_PILE: 'K692+265',
          T0002_END_PILE: 'K742+326',
          T0002_ASSET_AMOUNT: '23',
          M0010_ID: '铜旬段',
          T0004_CURINGCOST_TYPE: 1,
          T0002_TECH_STATE: '三星级收费站',
          T0002_ASSET_DATE: '2018',
          T0004_CURINGCOST_REMARK: '我是备注'
        }
      ],
      total: 0,
      selectList: []
    }
  },
  methods: {
    // 分页
    sizeChange (val) {
      this.dailycost.showCount = val
    },
    currentChange (val) {
      this.dailycost.currentPage = val
    },
    selectTable (selection) {
      this.selectList = selection
    },
    selectAll (selection) {
      this.selectList = selection
    },
    addFun () {
      this.addShow = true
    },
    handleInfo (data) {
      this.infoShow = true
      this.infoForm = Object.assign({}, data)
    },
    handleEdit (data) {
      this.editShow = true
      this.editForm = Object.assign({}, data)
    },
    handleDelete (data) {},
    // 批量删除
    delListFun () {}
  }
}
</script>
<style lang="scss">
.dailycost-wrap {
  .title-p {
    button {
      float: right;
    }
  }
  .content {
    background: #fff;
    padding: 30px 20px;
    .el-form-item {
      margin-bottom: 10px;
    }
    .table-div {
      .el-button--mini {
        padding: 4px 8px;
      }
    }
    .div-btn {
      margin: 10px 0;
    }
  }
  .serach-span {
    margin-left: 20px;
  }
  .table-page {
    text-align: center;
    margin-top: 10px;
  }
  .add-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #dcdfe6;
    tr {
      border: 1px solid #dcdfe6;
      td {
        border: 1px solid #dcdfe6;
        padding: 10px;
      }
    }
    .bg-td {
      background: #f0f0f0;
      text-align: center;
    }
  }
  .el-table {
    td,
    th {
      text-align: center;
    }
  }
  .dialog-div {
    width: 1000px;
  }
}
</style>
