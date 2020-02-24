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
                  border
                  style="width: 100%"
                  :header-cell-style="{background:'rgb(240,240,240)'}">
                  <el-table-column
                    label="序号"
                    width="50"
                    align="center">
                    <template scope="scope"><span>{{scope.$index + 1}}</span></template>
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
                  <el-table-column
                    prop="M0016_SENIOR_USER"
                    label="部门高级管理员"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="M0016_DUTY_REMARK"
                    label="描述"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="M0015_CREATE_PERSON"
                    label="创建人"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="M0015_CREATE_TIME"
                    label="创建时间"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="操作"
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
            <el-pagination
                    @current-change="refreshTable"
                    layout="total, prev, pager, next"
                    :total="totalData"
                    :current-page.sync="pageIndex"
                    :page-size="this.preSetPageSize"
            ></el-pagination>
        </el-row>
        </el-main>
        <el-row>
          <el-dialog :title="dialogName" id="disZbDialog" :fullscreen="false" :visible.sync="disVisible" width="60%" :before-close="closeDialog">
            <el-main>
              <el-form :inline="true" ref="form" v-model="form" size="small" label-width="140px"  class="demo-form-inline">
                <table class="add-table">
                  <tr>
                    <td class="bg-td">选择部门归属：</td>
                    <td>
                      <el-select v-model="form.M0016_PID" placeholder="--- 请选择 ---" style="width:100%;" size="small" :disabled="islook">
                          <el-option v-for="option in options" :key="option.M0016_ID" :label="option.M0016_DEPART_NAME" :value="option.M0016_ID"></el-option>
                      </el-select>
                    </td>
                    <td class="bg-td">部门名称：</td>
                    <td><el-input type="text" v-model="form.M0016_DEPART_NAME" size="small" :disabled="islook"></el-input></td>
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
                <!-- <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="选择部门归属：" label-width="150px">
                        <el-select v-model="form.department" placeholder="--- 请选择 ---">
                            <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value"></el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="部门名称：" label-width="150px">
                        <el-input type="text" v-model="form.name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="是否激活：" label-width="150px">
                        <el-switch
                          v-model="form.switch"
                        active-color="#409eff"
                        inactive-color="#bbb">
                        </el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="备注：" label-width="150px" id="remark">
                      <el-input type="textarea" rows="5" style="width:90%;" v-model="form.remark"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row> -->
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
      totalData: 3,
      condition: { currentPage: 1 },
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
        M0015_CREATE_PERSON: '',
        M0015_CREATE_TIME: ''
      }
    }
  },
  mounted () {
    this.refreshTable(1)
    this.loadSelect()
    this.getDateTime()
  },
  methods: {
    getDateTime () {
      let nDate = new Date()
      let str = ''
      str = nDate.getFullYear() + '-' + (nDate.getMonth() + 1) + '-' + nDate.getDate()
      this.form.M0015_CREATE_TIME = str
    },
    refreshTable (pageIndex) {
      // let token = JSON.parse(sessionStorage.getItem('currentUser'))
      // console.log(token)
      this.pageIndex = pageIndex
      this.condition.currentPage = pageIndex
      // let tabDatas = []
      this.$api.post('/cycle/departmentManagement/listPage', this.condition, null, r => {
        console.log(r)
        this.dpData = r.data
        this.totalData = r.data.length
      })
    },
    save () {
      if (this.form.M0016_PID === '') {
        this.form.M0016_PID = '0'
      }
      this.form.M0015_CREATE_PERSON = JSON.parse(sessionStorage.getItem('currentUser')).UserName
      if (this.dialogType === 'new') {
        // console.log(this.form)
        // if (this.form.M0016_IS_AVTIVE === true) {
        //   this.form.M0016_IS_AVTIVE = 1
        // } else {
        //   this.form.M0016_IS_AVTIVE = 0
        // }
        this.$api.post('/cycle/departmentManagement/insert', this.form, '新增成功', r => {
          this.closeDialog()
        })
      }
      if (this.dialogType === 'edit') {
        // console.log(this.form.image)
        this.$api.post('/cycle/departmentManagement/update', this.form, '编辑成功', r => {
          this.closeDialog()
        })
      }
    },
    openDialog (type, row) {
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
      this.disVisible = false
      this.islook = false
      this.form = {
        M0016_PID: '',
        M0016_DEPART_NAME: '',
        M0016_IS_AVTIVE: true,
        M0016_DUTY_REMARK: '',
        M0015_CREATE_PERSON: '',
        M0015_CREATE_TIME: ''
      }
      this.refreshTable(1)
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
      this.$api.post('/cycle/departmentManagement/listAll', {}, null, r => {
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
        }
      }
      .bg-td {
        background: #f0f0f0;
        text-align: center;
      }
    }
  }
</style>
