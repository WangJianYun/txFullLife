<template>
    <div id="manager">
        <el-row style="line-height:20px;">
            <el-col :span="4">
                <span style="font-size:20px;">>> 管理员列表</span>
            </el-col>
            <el-col :span="20" style="text-align:right;padding-right:30px;">
                <el-button type="primary" icon="el-icon-plus" @click="openDialog('add')">添加管理员</el-button>
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
                    prop="M0014_SIMP_NAME"
                    label="用户昵称"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="M0014_USER_NAME"
                    label="真实姓名"
                    width="100"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="DEPART_NAME"
                    label="归属机构"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="DUTY_NAME"
                    label="职务"
                    width="100"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="归属权限组"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="M0014_USER_TEL"
                    label="手机"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="M0014_USER_EMAIL"
                    label="邮箱"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="状态"
                    align="center">
                    <template slot-scope="scope">
                      <el-switch
                        v-model="scope.row.M0014_IS_AVTIVE"
                        active-color="#409eff"
                        inactive-color="#bbb">
                      </el-switch>
                    </template>
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
              <el-form :inline="true" ref="form" :rules="rules" :model="form" size="small" label-width="140px"
                class="demo-form-inline">
                <table class="add-table">
                  <tr>
                    <td class="bg-td">昵称：</td>
                    <td>
                    <el-form-item prop='M0014_SIMP_NAME'>
                      <el-input type="text" v-model="form.M0014_SIMP_NAME"  :disabled="islook"></el-input>
                    </el-form-item>
                    </td>
                    <!-- <td class="bg-td">昵称：</td>
                    <td><el-input type="text" v-model="form.M0014_SIMP_NAME" size="small" :disabled="islook"></el-input></td> -->
                    <td class="bg-td">真实姓名：</td>
                    <td>
                       <el-form-item prop='M0014_USER_NAME'>
                      <el-input type="text" v-model="form.M0014_USER_NAME" size="small" :disabled="islook"></el-input>
                       </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-td">密码：</td>
                    <td>
                       <el-form-item prop='M0014_PASS_WORD'>
                      <el-input type="password" v-model="form.M0014_PASS_WORD" size="small" :disabled="islook"></el-input>
                       </el-form-item>
                    </td>
                    <td class="bg-td">确认密码：</td>
                    <td>
                       <el-form-item prop='Expassword'>
                      <el-input type="password" v-model="Expassword" size="small" :disabled="islook"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-td">归属部门：</td>
                    <td>
                        <el-select v-model="form.M0016_ID" size="small" style="width:100%;" :disabled="islook">
                            <el-option v-for="item in mechans" :key="item.M0016_ID" :label="item.M0016_DEPART_NAME" :value="item.M0016_ID"></el-option>
                        </el-select>
                    </td>
                    <td class="bg-td">职务：</td>
                    <td>
                        <el-select v-model="form.M0015_ID" size="small" style="width:100%;" :disabled="islook">
                            <el-option v-for="item in positions" :key="item.M0015_ID" :label="item.M0015_DUTY_NAME" :value="item.M0015_ID"></el-option>
                        </el-select>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-td">电子信箱：</td>
                    <td>
                       <el-form-item prop='M0014_USER_EMAIL'>
                      <el-input type="email" v-model="form.M0014_USER_EMAIL" size="small" :disabled="islook"></el-input>
                       </el-form-item>
                    </td>
                    <td class="bg-td">手机号：</td>
                    <td>
                       <el-form-item prop='M0014_USER_TEL'>
                      <el-input type="phone" v-model="form.M0014_USER_TEL" size="small" :disabled="islook"></el-input>
                       </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-td">是否激活：</td>
                    <td>
                      <el-switch
                        v-model="form.M0014_IS_AVTIVE"
                         :disabled="islook"
                        active-color="#409eff"
                        inactive-color="#bbb">
                      </el-switch>
                    </td>
                    <td class="bg-td"></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="bg-td">备注：</td>
                    <td colspan="3">
                      <el-input type="textarea" rows="5" v-model="form.M0014_USER_REMARK" size="small" :disabled="islook"></el-input>
                    </td>
                  </tr>
                </table>
              </el-form>
            </el-main>
              <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="save" size="small">提交</el-button>
                  <el-button @click="resetDialog" size="small">重置</el-button>
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
      dpData: [
        { nickname: 'blue', realname: '1', mechanism: '1', position: '1', rights: '1', phone: '13333333333', email: '123@321.com', switch: true },
        { nickname: 'red', realname: '1', mechanism: '1', position: '1', rights: '1', phone: '15665656565', email: '23@43.com', switch: false }
      ],
      totalData: 3,
      condition: { currentPage: 1 },
      dialogName: '新增管理员',
      disVisible: false,
      islook: false,
      Expassword: '',
      form: {
        M0014_USER_CODE: '',
        M0014_SIMP_NAME: '',
        M0014_USER_NAME: '',
        M0014_PASS_WORD: '',
        M0016_ID: '',
        M0015_ID: '',
        M0014_USER_EMAIL: '',
        M0014_USER_TEL: '',
        M0014_IS_AVTIVE: true,
        M0014_USER_REMARK: ''
      },
      mechans: [],
      positions: [],
      rules: {
        M0014_SIMP_NAME: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        M0014_USER_NAME: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '姓名不支持特殊字符',
            trigger: 'blur'
          }
        ],
        M0014_PASS_WORD: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        Expassword: [
          { required: true, message: '请确认密码', trigger: 'blur' }
        ],
        M0014_USER_EMAIL: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' }
        ],
        M0014_USER_TEL: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.refreshTable(1)
    this.loadSelect()
  },
  // watch: {
  //   dialogFormVisible (val) {
  //     !val && setTimeout(() => {
  //       this.$refs['form'].resetFields()
  //     }, 0)
  //   }
  // },

  methods: {
    refreshTable (pageIndex) {
      // let token = JSON.parse(sessionStorage.getItem('currentUser'))
      // console.log(token)
      this.pageIndex = pageIndex
      this.condition.currentPage = pageIndex
      // let tabDatas = []
      this.$api.post('/cycle/userManagement/listPage', this.condition, null, r => {
        // console.log(r)
        r.data.forEach(element => {
          if (element.M0014_IS_AVTIVE === 1) {
            element.M0014_IS_AVTIVE = true
          } else {
            element.M0014_IS_AVTIVE = false
          }
        })
        this.dpData = r.data
        this.totalData = r.data.length
      })
    },
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.M0015_ID === '') {
            this.form.M0015_ID = '0'
          }
          if (this.form.M0014_PASS_WORD === this.Expassword) {
            this.form.M0014_USER_CODE = this.form.M0014_SIMP_NAME
            if (this.dialogType === 'new') {
              // console.log(this.form)
              // if (this.form.M0014_IS_AVTIVE === true) {
              // this.form.M0014_IS_AVTIVE = 1
              // } else {
              // this.form.M0014_IS_AVTIVE = 0
              // }
              this.$api.post('/cycle/userManagement/insert', this.form, '新增成功', r => {
                this.closeDialog()
              })
            }
            if (this.dialogType === 'edit') {
              alert(1)
              // console.log(this.form.image)
              this.$api.post('/cycle/userManagement/update', this.form, '编辑成功', r => {
                this.closeDialog()
              })
            }
          } else {
            alert('密码不一致')
            return false
          }
        } else {
          return false
        }
      })
    },
    openDialog (type, row) {
      this.disVisible = true
      console.log(row)
      if (type === 'add') {
        this.dialogName = '新增管理员'
        this.dialogType = 'new'
      }
      if (type === 'edit') {
        this.Expassword = row.M0014_PASS_WORD
        if (row.M0014_IS_AVTIVE === 1) {
          row.M0014_IS_AVTIVE = true
        } else {
          row.M0014_IS_AVTIVE = false
        }
        this.dialogName = '编辑部门'
        this.form = row
        this.dialogType = 'edit'
      }
      if (type === 'look') {
        this.Expassword = row.M0014_PASS_WORD
        if (row.M0014_IS_AVTIVE === 1) {
          row.M0014_IS_AVTIVE = true
        } else {
          row.M0014_IS_AVTIVE = false
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
        M0014_USER_CODE: '',
        M0014_SIMP_NAME: '',
        M0014_USER_NAME: '',
        M0014_PASS_WORD: '',
        expassword: '',
        M0016_ID: '',
        M0015_ID: '',
        M0014_USER_EMAIL: '',
        M0014_USER_TEL: '',
        M0014_IS_AVTIVE: true,
        M0014_USER_REMARK: ''
      }
      this.refreshTable(1)
    },
    resetDialog () {
      this.$refs['form'].resetFields()
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
        this.$api.post('/cycle/userManagement/deleteById?ID=' + row.M0014_ID, {}, '删除成功', r => {
          this.refreshTable(1)
        })
      })
    },
    loadSelect () {
      this.$api.post('/cycle/departmentManagement/listAll', {}, null, r => {
        this.mechans = r.data
      })
      this.$api.post('/cycle/dutyManagement/listAll', {}, null, r => {
        this.positions = r.data
      })
    }
  }
}
</script>
<style lang="scss">
  #manager{
    #tableWrap{background: #fff;margin-top: 20px;}
    .add-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #dcdfe6;
      tr {
        border: 1px solid #dcdfe6;
        height:60px;
        td {
          border: 1px solid #dcdfe6;
          padding: 5px 15px;
        }
      }
      .bg-td {
        background: #f0f0f0;
        text-align: center;
      }
      .el-form-item{
        margin-bottom: 0;
      }
    }
  }
</style>
