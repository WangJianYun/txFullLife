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
                    prop="nickname"
                    label="用户昵称"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="realname"
                    label="真实姓名"
                    width="100"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="mechanism"
                    label="归属机构"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="position"
                    label="职务"
                    width="100"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="rights"
                    label="归属权限组"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    label="手机"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="email"
                    label="邮箱"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="状态"
                    align="center">
                    <template slot-scope="scope">
                      <el-switch
                        v-model="scope.row.switch"
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
                      <el-button type="info" size="mini" @click="openDialog('look',scope.$index,scope.row)">查看</el-button>
                      <el-button type="primary" size="mini" @click="openDialog('edit',scope.$index,scope.row)">编辑</el-button>
                      <el-button type="danger" size="mini" @click="deleteRow(scope.$index,scope.row)">删除</el-button>
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
                    <td class="bg-td">昵称：</td>
                    <td><el-input type="text" v-model="form.nickname" size="small"></el-input></td>
                    <td class="bg-td">真实姓名：</td>
                    <td><el-input type="text" v-model="form.realname" size="small"></el-input></td>
                  </tr>
                  <tr>
                    <td class="bg-td">密码：</td>
                    <td><el-input type="password" v-model="form.password" size="small"></el-input></td>
                    <td class="bg-td">确认密码：</td>
                    <td><el-input type="password" v-model="form.expassword" size="small"></el-input></td>
                  </tr>
                  <tr>
                    <td class="bg-td">归属部门：</td>
                    <td>
                        <el-select v-model="form.mechanism" size="small" style="width:100%;">
                            <el-option v-for="item in mechans" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </td>
                    <td class="bg-td">职务：</td>
                    <td>
                        <el-select v-model="form.position" size="small" style="width:100%;">
                            <el-option v-for="item in positions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-td">电子信箱：</td>
                    <td><el-input type="email" v-model="form.email" size="small"></el-input></td>
                    <td class="bg-td">手机号：</td>
                    <td><el-input type="phone" v-model="form.phone" size="small"></el-input></td>
                  </tr>
                  <tr>
                    <td class="bg-td">是否激活：</td>
                    <td>
                      <el-switch
                        v-model="form.switch"
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
                      <el-input type="textarea" rows="5" v-model="form.remark" size="small"></el-input>
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
      dpData: [
        { nickname: 'blue', realname: '1', mechanism: '1', position: '1', rights: '1', phone: '13333333333', email: '123@321.com', switch: true },
        { nickname: 'red', realname: '1', mechanism: '1', position: '1', rights: '1', phone: '15665656565', email: '23@43.com', switch: false }
      ],
      totalData: 3,
      condition: { currentPage: 1 },
      dialogName: '新增管理员',
      disVisible: false,
      form: {
        nickname: '',
        realname: '',
        password: '',
        expassword: '',
        mechanism: '',
        position: '',
        email: '',
        phone: '',
        switch: true,
        remark: ''
      },
      mechans: [],
      positions: []
    }
  },
  methods: {
    refreshTable (pageIndex) {
      this.pageIndex = pageIndex
      this.condition.currentPage = pageIndex
      // let tabDatas = []
      this.$api.post('disease/page/list', this.condition, null, r => {
        // this.totalData = r.data.total
        // tabDatas = r.data.list
        // tabDatas.forEach(function (item, index) {
        //   // console.log(item)
        //   item.patrolTime = item.patrolTime.split(' ')[0]
        //   if (!item.cost) {
        //     item.cost = 0
        //   }
        //   if (!item.unit) {
        //     item.unit = '通达养护公司'
        //   }
        //   if (!item.measuresStatus) {
        //     item.measuresStatus = '0'
        //   }
        // })
        // this.tableData = tabDatas
      })
    },
    save () {

    },
    openDialog (type, index, row) {
      this.disVisible = true
      // if (type.indexOf('add') > -1) {
      //   this.form = {
      //     nickname: '',
      //     realname: '',
      //     password: '',
      //     expassword: '',
      //     mechanism: '',
      //     position: '',
      //     email: '',
      //     phone: '',
      //     switch: true,
      //     remark: ''
      //   }
      // } else {
      //   this.form = row
      //   this.form.department = ''
      //   this.form.switch = false
      // }
    },
    closeDialog () {
      this.disVisible = false
      this.form = {
        nickname: '',
        realname: '',
        password: '',
        expassword: '',
        mechanism: '',
        position: '',
        email: '',
        phone: '',
        switch: true,
        remark: ''
      }
    },
    deleteRow (index, row) {
    //   alert(1)
      // this.$api.post('', row.id, '删除成功', r => {})
      this.$confirm('确认删除？此操作不可取消', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let form = {}
        form.id = row.id
        this.$api.post('', form, '删除成功', r => {
          this.refreshTable(1)
        })
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
