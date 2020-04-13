<template>
  <div id="department">
    <el-row style="line-height:20px;">
      <el-col :span="4">
        <span style="font-size:20px;">>> 部门列表</span>
      </el-col>
      <el-col :span="8">
        归属上级公司：<span class="preDepartment">{{
          currentUser.COMPANY_NAME
        }}</span>
      </el-col>
      <el-col :span="12" style="text-align:right;padding-right:30px;">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="openDialog('add')"
          v-if="addState === 1 || addState === '1'"
          >添加部门</el-button
        >
      </el-col>
    </el-row>
    <el-main id="tableWrap">
      <el-row>
        <el-col :span="24">
          <el-table
            :data="dpData"
            :span-method="objectSpanMethod"
            border
            style="width: 100%"
            :header-cell-style="{ background: 'rgb(240,240,240)' }"
          >
            <el-table-column label="序号" width="80" align="center">
              <template scope="scope"
                ><span>{{ scope.$index + 1 }}</span></template
              >
            </el-table-column>
            <el-table-column
              prop="ORGANIZATION_NAME"
              label="单位名称"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="M0016_DEPART_NAME"
              label="部门名称"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="DEPART_PARENT_NAME"
              label="上级部门"
              align="center"
            >
            </el-table-column>
            <!-- <el-table-column
                    prop="M0016_DUTY_REMARK"
                    label="描述"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="M0016_CREATE_PERSON"
                    label="创建人"
                    align="center">
                  </el-table-column> -->
            <el-table-column
              prop="M0016_CREATE_TIME"
              label="创建时间"
              align="center"
            >
            </el-table-column>
            <el-table-column label="操作" width="220" align="center">
              <template slot-scope="scope">
                <el-button
                  type="info"
                  size="mini"
                  @click="openDialog('look', scope.row)"
                  v-if="lookState === 1 || lookState === '1'"
                  >查看</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="openDialog('edit', scope.row)"
                  v-if="editState === 1 || editState === '1'"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="deleteRow(scope.row)"
                  v-if="delState === 1 || delState === '1'"
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
    <!-- 部门新增 -->
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
            :rules="rules"
            ref="form"
            :model="form"
            size="small"
            label-width="140px"
            class="demo-ruleForm"
          >
            <table class="add-table">
              <tr>
                <td class="bg-td">选择部门归属：</td>
                <td>
                  <!-- <el-form-item> -->
                  <!-- <el-form-item prop="M0016_ID"> -->
                  <el-select
                    v-model="form.M0016_PID"
                    placeholder="--- 请选择 ---"
                    size="small"
                    :disabled="islook"
                    style="width:100%;"
                  >
                    <el-option
                      v-for="option in options"
                      :key="option.M0016_ID"
                      :label="option.M0016_DEPART_NAME"
                      :value="option.M0016_ID"
                    ></el-option>
                  </el-select>
                  <!-- </el-form-item> -->
                </td>
                <td class="bg-td">部门名称：</td>
                <td>
                  <el-form-item prop="M0016_DEPART_NAME">
                    <el-input
                      type="text"
                      v-model="form.M0016_DEPART_NAME"
                      size="small"
                      :disabled="islook"
                    ></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td class="bg-td">是否激活：</td>
                <td colspan="3">
                  <el-switch
                    v-model="form.M0016_IS_AVTIVE"
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
                    v-model="form.M0016_DUTY_REMARK"
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
      pageIndex: 1,
      dpData: [],
      currentPage: 1,
      showCount: 10,
      total: 0,
      dialogName: '新增部门',
      disVisible: false,
      options: [],
      islook: false,
      dialogType: '',
      form: {
        M0016_PID: '',
        M0016_DEPART_NAME: '',
        M0016_IS_AVTIVE: true,
        M0016_DUTY_REMARK: '',
        M0016_CREATE_PERSON: '',
        M0016_CREATE_TIME: '',
        ORGANIZATION_NAME: '',
        M0018_ID: '',
        DEPART_PARENT_NAME: ''
      },
      rules: {
        // M0016_ID: [
        //   { required: true, message: '请选择归属部门' }
        // ],
        M0016_DEPART_NAME: [
          { required: true, message: '请填写部门名称', trigger: 'blur' }
        ]
      },
      rowSpanArr: [],
      position: '',
      menuList: [],
      menuList1: [],
      lookState: '',
      addState: '',
      editState: '',
      delState: '',
      isCheck: true,
      currentUser: ''
    }
  },
  mounted() {
    this.refreshTable()
    this.loadSelect()
    this.getDateTime()
    this.getState()
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  },
  methods: {
    // 分页
    sizeChange(val) {
      this.showCount = val
      this.refreshTable()
    },
    currentChange(val) {
      this.currentPage = val
      this.refreshTable()
    },
    getRowSpan() {
      // 合并表格列的方法,获取到数据后调用
      this.rowSpanArr = []
      this.dpData.forEach((item, index) => {
        if (index === 0) {
          this.rowSpanArr.push(1)
          this.position = 0
        } else {
          if (
            this.dpData[index].deviceLocation ===
            this.dpData[index - 1].deviceLocation
          ) {
            this.rowSpanArr[this.position] += 1 // 项目名称相同，合并到同一个数组中
            this.rowSpanArr.push(0)
            this.dpData[index].deviceLocation = this.dpData[
              index - 1
            ].deviceLocation
          } else {
            this.rowSpanArr.push(1)
            this.position = index
          }
        }
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 合并列
      if (columnIndex === 1) {
        const _row = this.rowSpanArr[rowIndex]
        return {
          rowspan: _row, // 行
          colspan: 1 // 列
        }
      }
    },
    getDateTime() {
      // 获取当前系统时间
      let nDate = new Date()
      let str = ''
      str =
        nDate.getFullYear() +
        '-' +
        (nDate.getMonth() + 1) +
        '-' +
        nDate.getDate()
      this.form.M0016_CREATE_TIME = str
    },
    findChild(currentItem, list) {
      currentItem.M0004_CHILD = []
      // eslint-disable-next-line no-unneeded-ternary
      currentItem.M0004_CHECKED =
        currentItem.M0005_STATE === '1' || currentItem.M0005_STATE === 1
          ? true
          : false
      list.forEach(v => {
        if (currentItem.M0004_ID === v.M0004_PID) {
          if (v.M0004_LEVEL !== 3 && v.M0004_LEVEL !== '3' && !v.M0004_CHILD) {
            this.findChild(v, list)
          }
          currentItem.M0004_CHILD.push(v)
        }
      })
    },
    // 获取增删改查状态
    getState() {
      this.menuList = JSON.parse(sessionStorage.getItem('currentUser')).menuList
      this.menuList1 = this.menuList.filter(
        v => v.M0004_LEVEL === '1' || v.M0004_LEVEL === 1
      )
      this.menuList1.forEach(v => {
        this.findChild(v, this.menuList)
        if (v.M0004_NAME === '系统配置') {
          v.M0004_CHILD.forEach(v1 => {
            if (v1.M0004_NAME === '部门列表') {
              v1.M0004_CHILD.forEach(v2 => {
                if (v2.M0004_NAME === '查询') {
                  this.lookState = v2.M0005_STATE
                }
                if (v2.M0004_NAME === '添加') {
                  this.addState = v2.M0005_STATE
                }
                if (v2.M0004_NAME === '修改') {
                  this.editState = v2.M0005_STATE
                }
                if (v2.M0004_NAME === '删除') {
                  this.delState = v2.M0005_STATE
                }
              })
            }
          })
        }
      })
    },
    refreshTable() {
      this.form.M0018_ID = sessionStorage.getItem('id')
      // eslint-disable-next-line no-unused-vars
      let _data = {
        currentPage: this.currentPage,
        showCount: this.showCount,
        searchMap: { M0018_ID: this.form.M0018_ID }
      }
      this.$api.post('/cycle/departmentManagement/listPage', _data, null, r => {
        this.dpData = r.data.returnParam
        this.total = r.data.totalResult
        this.getRowSpan()
      })
      this.loadSelect()
    },
    save() {
      this.form.M0018_ID = sessionStorage.getItem('id')
      this.$refs['form'].validate(v => {
        if (v) {
          if (this.form.M0016_PID === '') {
            this.form.M0016_PID = '0'
          }
          this.form.M0016_CREATE_PERSON = JSON.parse(
            sessionStorage.getItem('currentUser')
          ).UserName
          if (this.dialogType === 'new') {
            this.$api.post(
              '/cycle/departmentManagement/insert',
              this.form,
              '新增成功',
              r => {
                this.closeDialog()
                this.refreshTable()
              }
            )
          }
          if (this.dialogType === 'edit') {
            this.$api.post(
              '/cycle/departmentManagement/update',
              this.form,
              '编辑成功',
              r => {
                this.closeDialog()
                this.refreshTable()
              }
            )
          }
        } else {
          return false
        }
      })
    },
    openDialog(type, row) {
      this.refreshTable()
      this.disVisible = true
      if (type === 'add') {
        this.isCheck = true
        this.dialogName = '新增部门'
        this.dialogType = 'new'
      }
      if (type === 'edit') {
        this.isCheck = true
        if (row.M0016_IS_AVTIVE === 1) {
          row.M0016_IS_AVTIVE = true
        } else {
          row.M0016_IS_AVTIVE = false
        }
        // 判断选择框内是否返回了0,如果是0就为空
        if (row.M0016_PID === '0' || row.M0016_PID === 0) {
          row.M0016_PID = ''
        }
        this.dialogName = '编辑部门'
        this.form = row
        this.dialogType = 'edit'
      }
      if (type === 'look') {
        this.isCheck = false
        if (row.M0016_IS_AVTIVE === 1) {
          row.M0016_IS_AVTIVE = true
        } else {
          row.M0016_IS_AVTIVE = false
        }
        this.dialogName = '查看部门'
        this.form = row
        this.islook = true
      }
    },
    closeDialog() {
      this.$refs['form'].resetFields()
      this.disVisible = false
      this.islook = false
      this.form = {
        M0016_PID: '',
        M0016_DEPART_NAME: '',
        M0016_IS_AVTIVE: true,
        M0016_DUTY_REMARK: '',
        M0016_CREATE_PERSON: '',
        M0016_CREATE_TIME: ''
      }
      this.refreshTable()
    },
    deleteRow(row) {
      // alert(1)
      // this.$api.post('', row.id, '删除成功', r => {})
      this.$confirm('确认删除？此操作不可取消', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // let form = {}
        // form.ID = row.M0016_ID
        this.$api.post(
          '/cycle/departmentManagement/deleteById?ID=' + row.M0016_ID,
          {},
          '删除成功',
          r => {
            this.refreshTable(1)
          }
        )
      })
    },
    loadSelect() {
      this.$api.post(
        '/cycle/departmentManagement/listAll',
        { M0018_ID: this.form.M0018_ID },
        null,
        r => {
          this.options = r.data
          // this.options.push('--请选择--')
          this.options.unshift({
            M0016_ID: 0,
            M0016_DEPART_NAME: '请选择--'
          })
          console.log(this.options)
          r.data.forEach((item, index) => {
            if (item.M0016_PID !== '0') {
              item.M0016_DEPART_NAME = '-- ' + item.M0016_DEPART_NAME
            }
          })
        }
      )
    }
  }
}
</script>
<style lang="scss">
#department {
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
  .el-table {
    font-size: 12px;
  }
}
</style>
