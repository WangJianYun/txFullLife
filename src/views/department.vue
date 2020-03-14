<template>
    <div id="department">
        <el-row style="line-height:20px;">
            <el-col :span="4">
                <span style="font-size:20px;">>> 部门列表</span>
            </el-col>
            <el-col :span="8">
                归属上级公司：<span class="preDepartment">铜旬分公司</span>
            </el-col>
            <el-col :span="12" style="text-align:right;padding-right:30px;">
                <el-button type="primary" icon="el-icon-plus" @click="openDialog('add')">添加部门</el-button>
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
                  :header-cell-style="{background:'rgb(240,240,240)'}"
                  >
                  <el-table-column
                    label="序号"
                    width="50"
                    align="center">
                    <template scope="scope"><span>{{scope.$index + 1}}</span></template>
                  </el-table-column>
                  <el-table-column
                    prop="ORGANIZATION_NAME"
                    label="单位名称"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="M0016_DEPART_NAME"
                    label="部门名称"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="DEPART_PARENT_NAME"
                    label="上级部门"
                    align="center">
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
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="220"
                    align="center">
                    <template slot-scope="scope">
                      <el-button type="info" size="mini" @click="openDialog('look',scope.row)">查看</el-button>
                      <el-button type="primary" size="mini" @click="openDialog('edit',scope.row)">编辑</el-button>
                      <el-button type="danger" size="mini" @click="deleteRow(scope.row)">删除</el-button>
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
          <el-dialog :title="dialogName" id="disZbDialog" :fullscreen="false" :visible.sync="disVisible" width="60%" :before-close="closeDialog">
            <el-main>
              <el-form :inline="true" :rules="rules" ref="form" :model="form" size="small" label-width="140px"
                class="demo-ruleForm"
                >
                <table class="add-table">
                  <tr>
                    <td class="bg-td">选择部门归属：</td>
                    <td>
                      <!-- <el-form-item> -->
                        <!-- <el-form-item prop="M0016_ID"> -->
                      <el-select v-model="form.M0016_PID" placeholder="--- 请选择 ---" size="small" :disabled="islook" style="width:100%;">
                          <el-option v-for="option in options" :key="option.M0016_ID" :label="option.M0016_DEPART_NAME" :value="option.M0016_ID"></el-option>
                      </el-select>
                      <!-- </el-form-item> -->
                    </td>
                    <td class="bg-td">部门名称：</td>
                    <td>
                      <el-form-item prop='M0016_DEPART_NAME'>
                      <el-input type="text" v-model="form.M0016_DEPART_NAME" size="small" :disabled="islook"></el-input>
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
                        inactive-color="#bbb">
                      </el-switch>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-td">备注：</td>
                    <td colspan="3">
                      <el-input type="textarea" rows="5" v-model="form.M0016_DUTY_REMARK" size="small" :disabled="islook"></el-input>
                    </td>
                  </tr>
                </table>
              </el-form>
            </el-main>
              <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="save" size="small">提交</el-button>
                  <el-button @click="closeDialog" size="small">重置</el-button>
              </div>
          </el-dialog>
        </el-row>
    </div>
</template>

<script>
export default {
  data () {
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
      position: ''
    }
  },
  mounted () {
    this.refreshTable()
    this.loadSelect()
    this.getDateTime()
  },
  methods: {
    // 分页
    sizeChange (val) {
      this.showCount = val
      this.refreshTable()
    },
    currentChange (val) {
      this.currentPage = val
      this.refreshTable()
    },
    getRowSpan () { // 合并表格列的方法,获取到数据后调用
      this.rowSpanArr = []
      this.dpData.forEach((item, index) => {
        if (index === 0) {
          this.rowSpanArr.push(1)
          this.position = 0
        } else {
          if (this.dpData[index].deviceLocation === this.dpData[index - 1].deviceLocation) {
            this.rowSpanArr[this.position] += 1 // 项目名称相同，合并到同一个数组中
            this.rowSpanArr.push(0)
            this.dpData[index].deviceLocation = this.dpData[index - 1].deviceLocation
          } else {
            this.rowSpanArr.push(1)
            this.position = index
          }
        }
      })
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) { // 合并列
      if (columnIndex === 1) {
        const _row = this.rowSpanArr[rowIndex]
        return {
          rowspan: _row, // 行
          colspan: 1 // 列
        }
      }
    },
    getDateTime () { // 获取当前系统时间
      let nDate = new Date()
      let str = ''
      str = nDate.getFullYear() + '-' + (nDate.getMonth() + 1) + '-' + nDate.getDate()
      this.form.M0016_CREATE_TIME = str
    },
    refreshTable () {
      this.form.M0018_ID = sessionStorage.getItem('id')
      // eslint-disable-next-line no-unused-vars
      let _data = {
        currentPage: this.currentPage,
        showCount: this.showCount,
        searchMap: { 'M0018_ID': this.form.M0018_ID }
      }
      this.$api.post('/cycle/departmentManagement/listPage', _data, null, r => {
        console.log(r)
        this.dpData = r.data.returnParam
        this.total = r.data.totalResult
        this.getRowSpan()
      })
      this.loadSelect()
    },
    save () {
      this.form.M0018_ID = sessionStorage.getItem('id')
      console.log(this.form)
      console.log(this.options)
      this.$refs['form'].validate(v => {
        if (v) {
          if (this.form.M0016_PID === '') {
            this.form.M0016_PID = '0'
          }
          this.form.M0016_CREATE_PERSON = JSON.parse(sessionStorage.getItem('currentUser')).UserName
          if (this.dialogType === 'new') {
            console.log(this.form)
            this.$api.post('/cycle/departmentManagement/insert', this.form, '新增成功', r => {
              console.log(r)
              this.closeDialog()
              this.refreshTable()
            })
          }
          if (this.dialogType === 'edit') {
            console.log(this.form)
            this.$api.post('/cycle/departmentManagement/update', this.form, '编辑成功', r => {
              this.closeDialog()
              this.refreshTable()
            })
          }
        } else {
          return false
        }
      })
    },
    openDialog (type, row) {
      console.log(row)
      this.refreshTable()
      this.disVisible = true
      if (type === 'add') {
        this.dialogName = '新增部门'
        this.dialogType = 'new'
      }
      if (type === 'edit') {
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
    closeDialog () {
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
    deleteRow (row) {
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
        this.$api.post('/cycle/departmentManagement/deleteById?ID=' + row.M0016_ID, {}, '删除成功', r => {
          this.refreshTable(1)
        })
      })
    },
    loadSelect () {
      this.$api.post('/cycle/departmentManagement/listAll', { 'M0018_ID': this.form.M0018_ID }, null, r => {
        this.options = r.data
      })
    }
  }
}
</script>
<style lang="scss">
  #department{
    #tableWrap{background: #fff;margin-top: 20px;}
    .add-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #dcdfe6;
      tr {
        border: 1px solid #dcdfe6;
        td {
          border: 1px solid #dcdfe6;
          padding: 5px 10px;
          .el-form-item{
            margin-bottom: 20px;
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
