<template>
  <div id="position">
    <el-row style="line-height:20px;">
      <el-col :span="4">
        <span style="font-size:20px;">>> 职务列表</span>
      </el-col>
      <el-col :span="20" style="text-align:right;padding-right:30px;">
        <el-button type="primary" icon="el-icon-plus" @click="openDialog('add')"
          >添加职务</el-button
        >
      </el-col>
    </el-row>
    <el-main id="tableWrap">
      <el-row>
        <el-col :span="24">
          <el-table
            :data="dpData"
            border
            style="width: 100%"
            :header-cell-style="{ background: 'rgb(240,240,240)' }"
          >
            <el-table-column label="序号" width="50" align="center">
              <template scope="scope"
                ><span>{{ scope.$index + 1 }}</span></template
              >
            </el-table-column>
            <el-table-column
              prop="M0015_DUTY_NAME"
              label="职务名称"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="M0015_DUTY_REMARK"
              label="描述"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="M0015_CREATE_PERSON"
              label="创建人"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="M0015_CREATE_TIME"
              label="创建时间"
              align="center"
            >
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="info"
                  size="mini"
                  @click="openDialog('look', scope.row)"
                  >查看</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="openDialog('edit', scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="deleteRow(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row class="list-pagination-row">
        <!-- <el-pagination
                    @current-change="refreshTable"
                    layout="total, prev, pager, next"
                    :total="totalData"
                    :current-page.sync="pageIndex"
                    :page-size="this.preSetPageSize"
            ></el-pagination> -->
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
      </el-row>
    </el-main>
    <!-- 添加职务 -->
    <el-row>
      <el-dialog
        :title="dialogName"
        id="disZbDialog"
        :fullscreen="false"
        :visible.sync="disVisible"
        width="60%"
        :before-close="closeDialog"
      >
        <el-main>
          <el-form
            :inline="true"
            ref="form"
            :rules="rules"
            :model="form"
            size="small"
            label-width="140px"
            class="demo-form-inline"
          >
            <table class="add-table">
              <tr>
                <td class="bg-td">职务名称：</td>
                <td>
                  <el-form-item prop="M0015_DUTY_NAME">
                    <el-input
                      type="text"
                      v-model="form.M0015_DUTY_NAME"
                      size="small"
                      :disabled="islook"
                    ></el-input>
                  </el-form-item>
                </td>
                <td class="bg-td">是否激活：</td>
                <td>
                  <el-switch
                    v-model="form.M0015_IS_AVTIVE"
                    :disabled="islook"
                    active-color="#409eff"
                    inactive-color="#bbb"
                  >
                  </el-switch>
                </td>
              </tr>
              <tr>
                <td class="bg-td">备注：</td>
                <td colspan="3">
                  <el-input
                    type="textarea"
                    rows="5"
                    v-model="form.M0015_DUTY_REMARK"
                    size="small"
                    :disabled="islook"
                  ></el-input>
                </td>
              </tr>
            </table>
          </el-form>
        </el-main>
        <div slot="footer" class="dialog-footer" v-show="isCheck">
          <el-button type="primary" @click="save" size="small">确认</el-button>
          <el-button @click="closeDialog" size="small">取消</el-button>
        </div>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCheck: true,
      dpData: [],
      totalData: 3,
      currentPage: 1,
      showCount: 10,
      total: 0,
      dialogName: '新增职务',
      disVisible: false,
      islook: false,
      form: {
        M0015_DUTY_NAME: '',
        M0015_IS_AVTIVE: true,
        M0015_DUTY_REMARK: '',
        M0015_CREATE_PERSON: '',
        M0015_CREATE_TIME: '',
        M0018_ID: ''
      },
      rules: {
        M0015_DUTY_NAME: [
          { required: true, message: '请输入职务名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.refreshTable(1)
    // this.loadSelect()
    this.getDateTime()
  },
  methods: {
    // 分页
    sizeChange(val) {
      this.showCount = val
      this.getCuringList()
    },
    currentChange(val) {
      this.currentPage = val
      this.getCuringList()
    },
    getDateTime() {
      let nDate = new Date()
      let str = ''
      str =
        nDate.getFullYear() +
        '-' +
        (nDate.getMonth() + 1) +
        '-' +
        nDate.getDate()
      this.form.M0015_CREATE_TIME = str
    },
    refreshTable() {
      this.form.M0018_ID = sessionStorage.getItem('id')
      // let token = JSON.parse(sessionStorage.getItem('currentUser'))
      // console.log(token)
      // eslint-disable-next-line no-unused-vars
      let _data = {
        currentPage: this.currentPage,
        showCount: this.showCount,
        searchMap: { M0018_ID: this.form.M0018_ID }
      }
      // let tabDatas = []
      this.$api.post('/cycle/dutyManagement/listPage', _data, null, r => {
        console.log(r)
        this.dpData = r.data.returnParam
        this.total = r.data.totalResult
        // console.log(this.dpData)
      })
    },
    save() {
      this.form.M0018_ID = sessionStorage.getItem('id')
      this.form.M0015_CREATE_PERSON = JSON.parse(
        sessionStorage.getItem('currentUser')
      ).UserName
      this.$refs['form'].validate(v => {
        if (v) {
          if (this.dialogType === 'new') {
            this.$api.post(
              '/cycle/dutyManagement/insert',
              this.form,
              '新增成功',
              r => {
                console.log(r)
                this.closeDialog()
              }
            )
          }
          if (this.dialogType === 'edit') {
            // console.log(this.form.image)
            this.getDateTime()
            this.$api.post(
              '/cycle/dutyManagement/update',
              this.form,
              '编辑成功',
              r => {
                this.closeDialog()
              }
            )
          }
        } else {
          return false
        }
      })
    },
    openDialog(type, row) {
      this.isCheck = true
      this.disVisible = true
      if (type === 'add') {
        this.dialogName = '新增职位'
        this.dialogType = 'new'
      }
      if (type === 'edit') {
        this.isCheck = true
        if (row.M0015_IS_AVTIVE === 1) {
          row.M0015_IS_AVTIVE = true
        } else {
          row.M0015_IS_AVTIVE = false
        }
        this.dialogName = '编辑职位'
        this.form = row
        this.dialogType = 'edit'
      }
      if (type === 'look') {
        this.isCheck = false
        if (row.M0015_IS_AVTIVE === 1) {
          row.M0015_IS_AVTIVE = true
        } else {
          row.M0015_IS_AVTIVE = false
        }
        this.dialogName = '查看职位'
        this.form = row
        this.islook = true
      }
    },
    closeDialog() {
      this.disVisible = false
      this.islook = false
      this.form = {
        M0015_DUTY_NAME: '',
        M0015_IS_AVTIVE: true,
        M0015_DUTY_REMARK: '',
        M0015_CREATE_PERSON: '',
        M0015_CREATE_TIME: '',
        M0018_ID: ''
      }
      this.refreshTable(1)
    },
    deleteRow(row) {
      // alert(1)
      // this.$api.post('', row.id, '删除成功', r => {})
      console.log(row.M0016_ID)
      this.$confirm('确认删除？此操作不可取消', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // let form = {}
        // form.ID = row.M0016_ID
        this.$api.post(
          '/cycle/dutyManagement/deleteById?ID=' + row.M0015_ID,
          {},
          '删除成功',
          r => {
            this.refreshTable(1)
          }
        )
      })
    }
  }
}
</script>
<style lang="scss">
#position {
  .el-dialog__header {
    background: #f5f5f5;
  }
  #tableWrap {
    background: #fff;
    margin-top: 20px;
  }
  .el-button--mini {
    padding: 4px 5px;
  }
  .add-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #dcdfe6;
    tr {
      border: 1px solid #dcdfe6;
      td {
        border: 1px solid #dcdfe6;
        padding: 15px 15px !important;
        .el-form-item {
          margin-bottom: 0 !important;
        }
      }
    }
    .bg-td {
      background: #f0f0f0;
      text-align: center;
    }
  }
  .table-page {
    text-align: center;
    margin-top: 10px;
  }
}
</style>
