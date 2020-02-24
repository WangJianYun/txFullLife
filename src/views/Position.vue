<template>
    <div id="position">
        <el-row style="line-height:20px;">
            <el-col :span="4">
                <span style="font-size:20px;">>> 职务列表</span>
            </el-col>
            <el-col :span="20" style="text-align:right;padding-right:30px;">
                <el-button type="primary" icon="el-icon-plus" @click="openDialog('add')">添加职务</el-button>
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
                    prop="M0015_DUTY_NAME"
                    label="职务名称"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="M0015_DUTY_REMARK"
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
                    <td class="bg-td">职务名称：</td>
                    <td><el-input type="text" v-model="form.M0015_DUTY_NAME" size="small" :disabled="islook"></el-input></td>
                    <td class="bg-td">是否激活：</td>
                    <td>
                      <el-switch
                        v-model="form.M0015_IS_AVTIVE"
                         :disabled="islook"
                        active-color="#409eff"
                        inactive-color="#bbb">
                      </el-switch>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-td">备注：</td>
                    <td colspan="3">
                      <el-input type="textarea" rows="5" v-model="form.M0015_DUTY_REMARK" size="small" :disabled="islook"></el-input>
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
      totalData: 3,
      condition: { currentPage: 1 },
      dialogName: '新增职务',
      disVisible: false,
      islook: false,
      form: {
        M0015_DUTY_NAME: '',
        M0015_IS_AVTIVE: true,
        M0015_DUTY_REMARK: '',
        M0015_CREATE_PERSON: '',
        M0015_CREATE_TIME: ''
      }
    }
  },
  mounted () {
    this.refreshTable(1)
    // this.loadSelect()
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
      let token = JSON.parse(sessionStorage.getItem('currentUser'))
      console.log(token)
      this.pageIndex = pageIndex
      this.condition.currentPage = pageIndex
      // let tabDatas = []
      this.$api.post('/cycle/dutyManagement/listPage', this.condition, null, r => {
        console.log(r)
        this.dpData = r.data
      })
    },
    save () {
      this.form.M0015_CREATE_PERSON = JSON.parse(sessionStorage.getItem('currentUser')).UserName
      if (this.dialogType === 'new') {
        this.$api.post('/cycle/dutyManagement/insert', this.form, '新增成功', r => {
          this.closeDialog()
        })
      }
      if (this.dialogType === 'edit') {
        // console.log(this.form.image)
        this.getDateTime()
        this.$api.post('/cycle/dutyManagement/update', this.form, '编辑成功', r => {
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
        if (row.M0015_IS_AVTIVE === 1) {
          row.M0015_IS_AVTIVE = true
        } else {
          row.M0015_IS_AVTIVE = false
        }
        this.dialogName = '编辑部门'
        this.form = row
        this.dialogType = 'edit'
      }
      if (type === 'look') {
        if (row.M0015_IS_AVTIVE === 1) {
          row.M0015_IS_AVTIVE = true
        } else {
          row.M0015_IS_AVTIVE = false
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
        M0015_DUTY_NAME: '',
        M0015_IS_AVTIVE: true,
        M0015_DUTY_REMARK: '',
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
        this.$api.post('/cycle/dutyManagement/deleteById?ID=' + row.M0015_ID, {}, '删除成功', r => {
          this.refreshTable(1)
        })
      })
    }
  }
}
</script>
<style lang="scss">
  #position{
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
