/*
 * @Author: liuhaosheng
 * @Description：资产技术等级列表
 */
<template>
  <div class="techgrade-wrap">
    <p class="title-p">
      <span style="display:inline-block;margin-bottom:20px;"> >> 资产技术等级列表 </span>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addFun"
      >增加资产技术等级</el-button>
    </p>
    <div class="content">
      <el-row :gutter="10">
        <el-form
          label-position="right"
          label-width="70px"
          :model="searchMap"
        >
          <el-col :span="5">
            <el-form-item label="资产类别">
              <el-select
                v-model="searchMap.T0001_ID"
                style="width:100%"
              >
                <el-option
                  v-for="item in assetTypeList"
                  :key="item.T0001_ID"
                  :label="item.T0001_ASSETTYPE_NAME"
                  :value="item.T0001_ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="等级选择">
              <el-select
                v-model="searchMap.a"
                style="width:100%"
              >
                <el-option
                  v-for="item in techTypeList"
                  :key="item.T0006_ID"
                  :label="item.T0006_TECHTYPE_NAME"
                  :value="item.T0006_ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="起点桩号">
              <el-select
                v-model="searchMap.code"
                style="width:100%"
              >
                <el-option
                  v-for="item in techTypeList"
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
                v-model="searchMap.code1"
                style="width:100%"
              >
                <el-option
                  v-for="item in techTypeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="年份选择">
              <el-date-picker
                style="width:100%"
                v-model="searchMap.YEAR"
                type="year"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="div-btn">
        <el-button
          type="primary"
          @click="getTechDataList"
        >搜索</el-button>
        <el-button @click="reset">重置</el-button>
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
            prop="T0001_ASSETTYPE_NAME"
            label="资产类别"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="T0006_TECHTYPE_NAME"
            label="技术状况"
          >
          </el-table-column>
          <el-table-column
            prop="T0003_CHECK_TIME"
            label="检测时间"
            width="110"
          >
          </el-table-column>
          <el-table-column
            prop="T0003_CHECK_UNIT"
            label="检测单位"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="检测报告">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleInfo(scope.row)"
              >检测报告</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="T0002_LOAD_NAME"
            label="所属路段"
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
          :current-page="techgrade.currentPage"
          :page-sizes="[10, 50, 100]"
          :page-size="techgrade.showCount"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 新建 -->
    <el-dialog
      title=">> 新增资产技术等级"
      :visible.sync="addShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <el-row :gutter="10">
        <el-form
          label-position="right"
          label-width="70px"
          :model="techgrade"
        >
          <el-col :span="5">
            <el-form-item label="资产类别">
              <el-select
                v-model="techgrade.T0001_ID"
                style="width:100%"
              >
                <el-option
                  v-for="item in assetTypeList"
                  :key="item.T0001_ID"
                  :label="item.T0001_ASSETTYPE_NAME"
                  :value="item.T0001_ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="起点桩号">
              <el-select
                v-model="techgrade.a"
                style="width:100%"
              >
                <el-option
                  v-for="item in techTypeList"
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
                v-model="techgrade.code"
                style="width:100%"
              >
                <el-option
                  v-for="item in techTypeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="关键字">
              <el-input v-model.trim="techgrade.SEARCH_KEY"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">搜索</el-button>
            <el-button>重置</el-button>
          </el-col>
        </el-form>
      </el-row>
      <table class="add-table">
        <tr>
          <td class="bg-td">请选择资产：</td>
          <td>
            <el-select
              v-model="addForm.T0002_ID"
              style="width:100%"
              size="small"
            >
              <el-option
                v-for="item in assetDataList"
                :key="item.T0002_ID"
                :label="item.T0002_ASSET_NAME"
                :value="item.T0002_ID"
              ></el-option>
            </el-select>
          </td>
          <td class="bg-td">技术等级分类： </td>
          <td>
            <el-select
              v-model="addForm.T0006_ID"
              style="width:100%"
              size="small"
            >
              <el-option
                v-for="item in techTypeList"
                :key="item.T0006_ID"
                :label="item.T0006_TECHTYPE_NAME"
                :value="item.T0006_ID"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="bg-td">检测单位/评测单位： </td>
          <td>
            <el-input
              v-model.trim="addForm.T0003_CHECK_UNIT"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
          <td class="bg-td">检测/评测时间：</td>
          <td>
            <el-date-picker
              v-model="addForm.T0003_CHECK_TIME"
              type="date"
              placeholder="选择年"
              style="width: 100%"
              size="small"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td class="bg-td">检测/评测报告上传：</td>
          <td colspan="3">
          </td>
        </tr>
        <tr>
          <td class="bg-td">详情备注：</td>
          <td colspan="3">
            <el-input
              type="textarea"
              v-model="addForm.T0003_TECH_REMARK"
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
          @click="addSaveFun"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      title=">> 修改资产技术等级"
      :visible.sync="editShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <el-row :gutter="10">
        <el-form
          label-position="right"
          label-width="70px"
          :model="techgrade"
        >
          <el-col :span="5">
            <el-form-item label="资产类别">
              <el-select
                v-model="techgrade.T0001_ID"
                style="width:100%"
              >
                <el-option
                  v-for="item in assetTypeList"
                  :key="item.T0001_ID"
                  :label="item.T0001_ASSETTYPE_NAME"
                  :value="item.T0001_ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="起点桩号">
              <el-select
                v-model="techgrade.a"
                style="width:100%"
              >
                <el-option
                  v-for="item in techTypeList"
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
                v-model="techgrade.code"
                style="width:100%"
              >
                <el-option
                  v-for="item in techTypeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="关键字">
              <el-input v-model.trim="techgrade.SEARCH_KEY"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">搜索</el-button>
            <el-button>重置</el-button>
          </el-col>
        </el-form>
      </el-row>
      <table class="add-table">
        <tr>
          <td class="bg-td">请选择资产：</td>
          <td>
            <el-select
              v-model="editForm.T0002_ID"
              style="width:100%"
              size="small"
            >
              <el-option
                v-for="item in assetDataList"
                :key="item.T0002_ID"
                :label="item.T0002_ASSET_NAME"
                :value="item.T0002_ID"
              ></el-option>
            </el-select>
          </td>
          <td class="bg-td">技术等级分类： </td>
          <td>
            <el-select
              v-model="editForm.T0006_ID"
              style="width:100%"
              size="small"
            >
              <el-option
                v-for="item in techTypeList"
                :key="item.T0006_ID"
                :label="item.T0006_TECHTYPE_NAME"
                :value="item.T0006_ID"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="bg-td">检测单位/评测单位： </td>
          <td>
            <el-input
              v-model.trim="editForm.T0003_CHECK_UNIT"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
          <td class="bg-td">检测/评测时间：</td>
          <td>
            <el-date-picker
              v-model="editForm.T0003_CHECK_TIME"
              type="date"
              placeholder="选择年"
              style="width: 100%"
              size="small"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td class="bg-td">检测/评测报告上传：</td>
          <td colspan="3">
          </td>
        </tr>
        <tr>
          <td class="bg-td">详情备注：</td>
          <td colspan="3">
            <el-input
              type="textarea"
              v-model="editForm.T0003_TECH_REMARK"
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
        <el-button
          type="primary"
          @click="editSaveFun"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog
      title=">> 查看资产技术等级"
      :visible.sync="infoShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <table class="add-table">
        <tr>
          <td class="bg-td">请选择资产：</td>
          <td>
            {{ infoForm.T0002_ASSET_NAME }}
          </td>
          <td class="bg-td">技术等级分类： </td>
          <td>
            {{ infoForm.T0006_TECHTYPE_NAME }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">检测单位/评测单位： </td>
          <td>
            {{ infoForm.T0003_CHECK_UNIT }}
          </td>
          <td class="bg-td">检测/评测时间：</td>
          <td>
            {{ infoForm.T0003_CHECK_TIME }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">检测/评测报告上传：</td>
          <td colspan="3">
          </td>
        </tr>
        <tr>
          <td class="bg-td">详情备注：</td>
          <td colspan="3">
            {{ infoForm.T0003_TECH_REMARK }}
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
      loading: true,
      addShow: false,
      editShow: false,
      infoShow: false,
      editForm: {},
      addForm: {
        T0002_ID: '',
        T0006_ID: '',
        T0003_CHECK_UNIT: '',
        T0003_CHECK_TIME: '',
        T0003_TECH_REMARK: ''
      },
      infoForm: {},
      techgrade: {},
      showCount: 10,
      currentPage: 1,
      total: 0,
      searchMap: {
        T0001_ID: '',
        YEAR: ''
      },
      tableData: [],
      selectList: [],
      assetTypeList: [],
      assetDataList: [],
      techTypeList: [] // 技术类别 list
    }
  },
  methods: {
    // 分页
    sizeChange (val) {
      this.showCount = val
      this.getTechDataList()
    },
    currentChange (val) {
      this.currentPage = val
      this.getTechDataList()
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
    // 新建保存
    addSaveFun () {
      this.$api.post(`/cycle/techData/insert`, this.addForm, null, r => {
        this.$message.success('新增成功')
        this.addShow = false
        this.getTechDataList()
      })
    },
    handleInfo (data) {
      this.infoShow = true
      this.infoForm = Object.assign({}, data)
    },
    // 修改保存
    editSaveFun () {
      this.$api.post(`/cycle/techData/update`, this.editForm, null, r => {
        this.$message.success('修改成功')
        this.editShow = false
        this.getTechDataList()
      })
    },
    // 点击修改
    handleEdit (data) {
      this.editShow = true
      this.$api.post(
        `/cycle/techData/selectById?ID=${data.T0003_ID}`,
        {},
        null,
        r => {
          this.editForm = Object.assign({}, r.data)
        }
      )
    },
    // 获取资产类别 list
    getAssetTypeList () {
      this.$api.post(`/cycle/assetType/listAll`, {}, null, r => {
        this.assetTypeList = r.data
      })
    },
    // 获取资产信息 select 列表
    getAssetDataList () {
      this.$api.post(`/cycle/assetData/listAll`, {}, null, r => {
        this.assetDataList = r.data
      })
    },
    // 技术类别 select
    getTechTypeList () {
      this.$api.post(`/cycle/techType/listAll`, {}, null, r => {
        this.techTypeList = r.data
      })
    },
    // 获取资产技术等级list
    getTechDataList () {
      let _data = {
        currentPage: this.currentPage,
        showCount: this.showCount,
        searchMap: this.searchMap
      }
      this.$api.post(`/cycle/techData/listPage`, _data, null, r => {
        this.loading = false
        this.tableData = r.data.returnParam
        this.total = r.data.totalResult
      })
    },
    // 重置
    reset () {
      this.searchMap.T0001_ID = ''
      this.searchMap.YEAR = ''
      this.showCount = 10
      this.currentPage = 1
      this.getTechDataList()
    },
    handleDelete (data) {
      this.$confirm('确定要删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post(
          `/cycle/techData/deleteById?ID=${data.T0003_ID}`,
          {},
          null,
          r => {
            this.$message.success('删除成功')
            this.getTechDataList()
          }
        )
      })
    },
    // 批量删除
    delListFun () {
      let _list = []
      if (this.selectList.length > 0) {
        for (let i = 0; i < this.selectList.length; i++) {
          _list.push(this.selectList[i].T0003_ID)
        }
        this.$confirm('确定要删除这些记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post(
            `/cycle/techData/deleteByIds?IDS=${_list}`,
            {},
            null,
            r => {
              this.$message.success('删除成功')
              this.getTechDataList()
            }
          )
        })
      } else {
        this.$message.warning('请选择要删除的数据！')
      }
    }
  },
  created () {
    this.getAssetTypeList()
    this.getTechDataList()
    this.getAssetDataList()
    this.getTechTypeList()
  }
}
</script>
<style lang="scss">
.techgrade-wrap {
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
