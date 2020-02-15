/*
 * @Author: liuhaosheng
 * @Description：资产列表管理
 */
<template>
  <div class="assets-wrap">
    <p class="title-p">
      <span style="display:inline-block;margin-bottom:20px;"> >> 资产列表管理 </span>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addFun"
      >添加资产</el-button>
    </p>
    <div class="content">
      <el-row :gutter="10">
        <el-form
          label-position="right"
          label-width="70px"
          :model="assets"
        >
          <el-col :span="5">
            <el-form-item label="资产类别">
              <el-select
                v-model="assets.a"
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
                v-model="assets.code"
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
                v-model="assets.code1"
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
            <el-form-item label="年份选择">
              <el-date-picker
                style="width:100%"
                v-model="assets.year"
                type="year"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="关键字">
              <el-input
                placeholder="请输入关键字"
                v-model="assets.a"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="div-btn">
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
            prop="T0002_START_PILE"
            label="起点桩号"
          >
          </el-table-column>
          <el-table-column
            prop="T0002_END_PILE"
            label="终点桩号"
          >
          </el-table-column>
          <el-table-column
            prop="T0002_ASSET_AMOUNT"
            label="数量（个/座/片）"
          >
          </el-table-column>
          <el-table-column
            prop="M0010_ID"
            label="所属路段"
          >
          </el-table-column>
          <el-table-column
            prop="M0009_PILENUMBER_YEAR"
            label="图片"
          >
          </el-table-column>
          <el-table-column
            prop="T0002_TECH_STATE"
            label="技术状况"
          >
          </el-table-column>
          <el-table-column
            prop="T0002_ASSET_DATE"
            label="归属年份"
          >
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
          :current-page="assets.currentPage"
          :page-sizes="[10, 50, 100]"
          :page-size="assets.showCount"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 新建 -->
    <el-dialog
      title=">> 增加资产"
      :visible.sync="addShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <table class="add-table">
        <tr>
          <td class="bg-td">资产名称：</td>
          <td>
            <el-input
              v-model.trim="addForm.T0002_ASSET_NAME"
              size="small"
              maxlength="50"
            ></el-input>
          </td>
          <td class="bg-td">资产类别： </td>
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
        </tr>
        <tr>
          <td class="bg-td">所属路段：</td>
          <td>
            <el-select
              v-model="addForm.M0010_ID"
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
          <td> </td>
          <td> </td>
        </tr>
        <tr>
          <td class="bg-td">起点桩号： </td>
          <td>
            <el-input
              v-model.trim="addForm.T0002_START_PILE"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
          <td class="bg-td">终点桩号：</td>
          <td>
            <el-input
              v-model.trim="addForm.T0002_END_PILE"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">数量： </td>
          <td>
            <el-input
              v-model.trim="addForm.T0002_ASSET_AMOUNT"
              size="small"
            ></el-input>
          </td>
          <td class="bg-td">归属年份：</td>
          <td>
            <el-date-picker
              v-model="addForm.T0002_ASSET_DATE"
              type="year"
              placeholder="选择年"
              style="width: 100%"
              size="small"
            >
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td class="bg-td">归属公司： </td>
          <td>
            <el-input
              v-model.trim="addForm.T0002_ASSET_COMPANY"
              size="small"
              maxlength="50"
            ></el-input>
          </td>
          <td class="bg-td"> 所属养管公司： </td>
          <td>
            <el-input
              v-model.trim="addForm.T0002_CURING_UNIT"
              size="small"
              maxlength="50"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">责任人： </td>
          <td>
            <el-input
              v-model.trim="addForm.T0002_DUTY_PERSON"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
          <td class="bg-td"> 联系电话： </td>
          <td>
            <el-input
              v-model.trim="addForm.T0002_TOUCH_TEL"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">经度： </td>
          <td>
            <el-input
              v-model.trim="addForm.T0002_ASSET_PRECI"
              size="small"
            ></el-input>
          </td>
          <td class="bg-td"> 纬度： </td>
          <td>
            <el-input
              v-model.trim="addForm.T0002_ASSET_LATI"
              size="small"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">图片上传：</td>
          <td colspan="3">
          </td>
        </tr>
        <tr>
          <td class="bg-td">费用况详情（备注）：</td>
          <td colspan="3">
            <el-input
              type="textarea"
              v-model="addForm.T0002_ASSET_REAMRK"
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
      title=">> 修改资产"
      :visible.sync="editShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <table class="add-table">
        <tr>
          <td class="bg-td">资产名称：</td>
          <td>
            <el-input
              v-model.trim="editShow.T0002_ASSET_NAME"
              size="small"
              maxlength="50"
            ></el-input>
          </td>
          <td class="bg-td">资产类别： </td>
          <td>
            <el-select
              v-model="editShow.T0001_ID"
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
        </tr>
        <tr>
          <td class="bg-td">所属路段：</td>
          <td>
            <el-select
              v-model="editShow.M0010_ID"
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
          <td> </td>
          <td> </td>
        </tr>
        <tr>
          <td class="bg-td">起点桩号： </td>
          <td>
            <el-input
              v-model.trim="editShow.T0002_START_PILE"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
          <td class="bg-td">终点桩号：</td>
          <td>
            <el-input
              v-model.trim="editShow.T0002_END_PILE"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">数量： </td>
          <td>
            <el-input
              v-model.trim="editShow.T0002_ASSET_AMOUNT"
              size="small"
            ></el-input>
          </td>
          <td class="bg-td">归属年份：</td>
          <td>
            <el-date-picker
              v-model="editShow.T0002_ASSET_DATE"
              type="year"
              placeholder="选择年"
              style="width: 100%"
              size="small"
            >
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td class="bg-td">归属公司： </td>
          <td>
            <el-input
              v-model.trim="editShow.T0002_ASSET_COMPANY"
              size="small"
              maxlength="50"
            ></el-input>
          </td>
          <td class="bg-td"> 所属养管公司： </td>
          <td>
            <el-input
              v-model.trim="editShow.T0002_CURING_UNIT"
              size="small"
              maxlength="50"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">责任人： </td>
          <td>
            <el-input
              v-model.trim="editShow.T0002_DUTY_PERSON"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
          <td class="bg-td"> 联系电话： </td>
          <td>
            <el-input
              v-model.trim="editShow.T0002_TOUCH_TEL"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">经度： </td>
          <td>
            <el-input
              v-model.trim="editShow.T0002_ASSET_PRECI"
              size="small"
            ></el-input>
          </td>
          <td class="bg-td"> 纬度： </td>
          <td>
            <el-input
              v-model.trim="editShow.T0002_ASSET_LATI"
              size="small"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">图片上传：</td>
          <td colspan="3">
          </td>
        </tr>
        <tr>
          <td class="bg-td">费用况详情（备注）：</td>
          <td colspan="3">
            <el-input
              type="textarea"
              v-model="editShow.T0002_ASSET_REAMRK"
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
      title=">> 查看资产"
      :visible.sync="infoShow"
      custom-class="dialog-div"
    >
      <table class="add-table">
        <tr>
          <td class="bg-td">资产名称：</td>
          <td>
            {{ infoForm.T0002_ASSET_NAME}}
          </td>
          <td class="bg-td">资产类别： </td>
          <td>
            {{ infoForm.T0001_ID }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">所属路段：</td>
          <td>
            {{ infoForm.M0010_ID }}
          </td>
          <td> </td>
          <td> </td>
        </tr>
        <tr>
          <td class="bg-td">起点桩号： </td>
          <td>
            {{ infoForm.T0002_START_PILE }}
          </td>
          <td class="bg-td">终点桩号：</td>
          <td>
            {{ infoForm.T0002_END_PILE }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">数量： </td>
          <td>
            {{ infoForm.T0002_ASSET_AMOUNT }}
          </td>
          <td class="bg-td">归属年份：</td>
          <td>
            {{ infoForm.T0002_ASSET_DATE}}
          </td>
        </tr>
        <tr>
          <td class="bg-td">归属公司： </td>
          <td>
            {{ infoForm.T0002_ASSET_COMPANY }}
          </td>
          <td class="bg-td"> 所属养管公司： </td>
          <td>
            {{ infoForm.T0002_CURING_UNIT }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">责任人： </td>
          <td>
            {{ infoForm.T0002_DUTY_PERSON }}
          </td>
          <td class="bg-td"> 联系电话： </td>
          <td>
            {{ infoForm.T0002_TOUCH_TEL}}
          </td>
        </tr>
        <tr>
          <td class="bg-td">经度： </td>
          <td>
            {{ infoForm.T0002_ASSET_PRECI}}
          </td>
          <td class="bg-td"> 纬度： </td>
          <td>
            {{ infoForm.T0002_ASSET_LATI}}
          </td>
        </tr>
        <tr>
          <td class="bg-td">图片上传：</td>
          <td colspan="3">
          </td>
        </tr>
        <tr>
          <td class="bg-td">费用况详情（备注）：</td>
          <td colspan="3">
            {{ infoForm.T0002_ASSET_REAMRK }}
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
      assets: {
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
          T0002_TECH_STATE: '三星级收费站',
          T0002_ASSET_DATE: '2018'
        }
      ],
      total: 0,
      selectList: []
    }
  },
  methods: {
    // 分页
    sizeChange (val) {
      this.assets.showCount = val
    },
    currentChange (val) {
      this.assets.currentPage = val
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
.assets-wrap {
  .title-p {
    button {
      float: right;
    }
  }
  .content {
    background: #fff;
    padding: 30px 20px;
    .el-form-item {
      margin-bottom: 0;
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
