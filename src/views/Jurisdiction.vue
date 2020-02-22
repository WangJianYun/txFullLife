/*
 * @Author: liuhaosheng
 * @Description：分公司管辖路段列表
 */
<template>
  <div class="jurisdiction-wrap">
    <p class="title-p">
      <span style="display:inline-block;margin-bottom:20px;">>> 分公司管辖路段列表</span>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addFun"
      >分公司管辖路段配置</el-button>
    </p>
    <div class="content">
      <el-form
        :model="searchMap"
        label-width="70px"
        :inline="true"
      >
        <el-form-item label="所属路段">
          <el-select
            v-model="searchMap.M0010_LOAD_NAME"
            placeholder="请选择"
          >
            <el-option
              v-for="(item,index ) in listNameList"
              :key="index"
              :label="item.M0010_LOAD_NAME"
              :value="item.M0010_LOAD_NAME"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getLoadList">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <p>
        <el-button
          type="primary"
          icon="el-icon-delete"
          @click="delListFun"
        >批量删除</el-button>
        <span class="serach-span"> 您的检索： <span> 无 </span> </span>
      </p>
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
            prop="M0010_LOAD_NAME"
            label="路段名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="M0010_CURING_UNIT"
            label="管理公司"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="M0010_START_PILE"
            label="起点桩号"
          >
          </el-table-column>
          <el-table-column
            prop="M0010_END_PILE"
            label="终点桩号"
          >
          </el-table-column>
          <el-table-column
            prop="M0010_LOAD_PRECI"
            label="经度"
          >
          </el-table-column>
          <el-table-column
            prop="M0010_LOAD_LATI"
            label="纬度"
          >
          </el-table-column>
          <el-table-column
            prop="M0008_END_POINT"
            label="图片"
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
          :current-page="currentPage"
          :page-sizes="[10, 50, 100]"
          :page-size="showCount"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 新增 -->
    <el-dialog
      title=">> 增加分公司管辖路段"
      :visible.sync="addShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addRefForm"
        label-width="100px"
      >
        <table class="add-table">
          <tr>
            <td class="bg-td">路段名称：</td>
            <td>
              <el-input
                v-model.trim="addForm.M0010_LOAD_NAME"
                size="small"
                maxlength="50"
              ></el-input>
            </td>
            <td class="bg-td">养管单位名称： </td>
            <td>
              <el-input
                v-model.trim="addForm.M0010_CURING_UNIT"
                size="small"
                maxlength="50"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg-td">起点桩号： </td>
            <td>
              <el-input
                v-model.trim="addForm.M0010_START_PILE"
                size="small"
                maxlength="20"
              ></el-input>
            </td>
            <td class="bg-td">终点桩号：</td>
            <td>
              <el-input
                v-model.trim="addForm.M0010_END_PILE"
                size="small"
                maxlength="20"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg-td">经度： </td>
            <td>
              <el-input
                v-model.trim="addForm.M0010_LOAD_PRECI"
                size="small"
              ></el-input>
            </td>
            <td class="bg-td">纬度：</td>
            <td>
              <el-input
                v-model.trim="addForm.M0010_LOAD_LATI"
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
            <td class="bg-td">简介（备注）：</td>
            <td colspan="3">
              <el-input
                type="textarea"
                maxlength="500"
                v-model="addForm.M0010_LOAD_REMARK"
              ></el-input>
            </td>
          </tr>
        </table>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addShow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addSaveFun('addRefForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      title=">> 修改分公司管辖路段"
      :visible.sync="editShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <el-form
        :model="editForm"
        :rules="rules"
        ref="editRefForm"
        label-width="100px"
      >
        <table class="add-table">
          <tr>
            <td class="bg-td">路段名称：</td>
            <td>
              <el-input
                v-model.trim="editForm.M0010_LOAD_NAME"
                size="small"
                maxlength="50"
              ></el-input>
            </td>
            <td class="bg-td">养管单位名称： </td>
            <td>
              <el-input
                v-model.trim="editForm.M0010_CURING_UNIT"
                size="small"
                maxlength="50"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg-td">起点桩号： </td>
            <td>
              <el-input
                v-model.trim="editForm.M0010_START_PILE"
                size="small"
                maxlength="20"
              ></el-input>
            </td>
            <td class="bg-td">终点桩号：</td>
            <td>
              <el-input
                v-model.trim="editForm.M0010_END_PILE"
                size="small"
                maxlength="20"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg-td">经度： </td>
            <td>
              <el-input
                v-model.trim="editForm.M0010_LOAD_PRECI"
                size="small"
              ></el-input>
            </td>
            <td class="bg-td">纬度：</td>
            <td>
              <el-input
                v-model.trim="editForm.M0010_LOAD_LATI"
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
            <td class="bg-td">简介（备注）：</td>
            <td colspan="3">
              <el-input
                type="textarea"
                maxlength="500"
                v-model="editForm.M0010_LOAD_REMARK"
              ></el-input>
            </td>
          </tr>
        </table>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editShow = false">取 消</el-button>
        <el-button type="primary" @click="editSaveFun">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog
      title=">> 查看分公司管辖路段"
      :visible.sync="infoShow"
      custom-class="dialog-div"
    >
      <table class="add-table">
        <tr>
          <td class="bg-td">路段名称：</td>
          <td>
            {{ infoForm.M0010_LOAD_NAME }}
          </td>
          <td class="bg-td">养管单位名称： </td>
          <td>
            {{ infoForm.M0010_CURING_UNIT }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">起点桩号： </td>
          <td>
            {{ infoForm.M0010_START_PILE }}
          </td>
          <td class="bg-td">终点桩号：</td>
          <td>
            {{ infoForm.M0010_END_PILE}}
          </td>
        </tr>
        <tr>
          <td class="bg-td">经度： </td>
          <td>
            {{ infoForm.M0010_LOAD_PRECI }}
          </td>
          <td class="bg-td">纬度：</td>
          <td>
            {{ infoForm.M0010_LOAD_LATI}}
          </td>
        </tr>
        <tr>
          <td class="bg-td">图片上传：</td>
          <td colspan="3">
          </td>
        </tr>
        <tr>
          <td class="bg-td">简介（备注）：</td>
          <td colspan="3">
            {{ infoForm.M0010_LOAD_REMARK}}
          </td>
        </tr>
      </table>
      <div slot="footer">
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
      infoShow: false,
      editShow: false,
      addForm: {},
      editForm: {},
      infoForm: {},
      rules: {},
      tableData: [],
      showCount: 10,
      currentPage: 1,
      total: 0,
      searchMap: {
        M0010_LOAD_NAME: ''
      },
      selectList: [],
      listNameList: []
    }
  },
  methods: {
    // 分页
    sizeChange (val) {
      this.showCount = val
      this.getLoadList()
    },
    currentChange (val) {
      this.currentPage = val
      this.getLoadList()
    },
    selectTable (selection) {
      this.selectList = selection
    },
    selectAll (selection) {
      this.selectList = selection
    },
    handleInfo (data) {
      this.infoShow = true
      this.infoForm = Object.assign({}, data)
    },
    handleEdit (data) {
      this.editShow = true
      this.$api.post(
        `/cycle/load/selectById?ID=${data.M0010_ID}`,
        {},
        null,
        r => {
          this.editForm = Object.assign({}, r.data)
        }
      )
    },
    // 请求select 的所属路段
    getListNameList () {
      this.$api.post('/cycle/load/listLoadName', {}, null, r => {
        this.listNameList = r.data
      })
    },
    addFun () {
      this.addShow = true
      this.$nextTick(() => {
        this.$refs['addRefForm'].resetFields()
      })
    },
    reset () {
      this.searchMap.M0010_LOAD_NAME = ''
      this.getLoadList()
    },
    // 新增保存
    addSaveFun () {
      this.$api.post('/cycle/load/insert', this.addForm, null, r => {
        this.$message.success('新增成功')
        this.addShow = false
        this.getLoadList()
      })
    },
    //  管辖路段 列表
    getLoadList () {
      let _data = {
        currentPage: this.currentPage,
        showCount: this.showCount,
        searchMap: this.searchMap
      }
      this.$api.post(`/cycle/load/listPage`, _data, null, r => {
        this.loading = false
        this.tableData = r.data.returnParam
        this.total = r.data.totalResult
      })
    },
    handleDelete (data) {
      this.$confirm('确定要删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post(
          `/cycle/load/deleteById?ID=${data.M0010_ID}`,
          {},
          null,
          r => {
            this.$message.success('删除成功')
            this.getLoadList()
          }
        )
      })
    },
    // 修改保存
    editSaveFun () {
      this.$api.post(`/cycle//load/update`, this.editForm, null, r => {
        this.$message.success('修改成功')
        this.editShow = false
        this.getLoadList()
      })
    },
    // 批量删除
    delListFun () {
      let _list = []
      if (this.selectList.length > 0) {
        for (let i = 0; i < this.selectList.length; i++) {
          _list.push(this.selectList[i].M0010_ID)
        }
        this.$confirm('确定要删除这些记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post(
            `/cycle/load/deleteByIds?IDS=${_list}`,
            {},
            null,
            r => {
              this.$message.success('删除成功')
              this.getLoadList()
            }
          )
        })
      } else {
        this.$message.warning('请选择要删除的数据！')
      }
    }
  },
  created () {
    this.getLoadList()
    this.getListNameList()
  }
}
</script>
<style lang="scss">
.jurisdiction-wrap {
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
