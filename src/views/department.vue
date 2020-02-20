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
                    prop="name"
                    label="部门名称"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="prevDepart"
                    label="上级部门"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="departManger"
                    label="部门高级管理员"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="option"
                    label="描述"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="maker"
                    label="创建人"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="makeTime"
                    label="创建时间"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="操作"
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
                    <td class="bg-td">选择部门归属：</td>
                    <td>
                      <el-select v-model="form.department" placeholder="--- 请选择 ---" style="width:100%;" size="small">
                          <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value"></el-option>
                      </el-select>
                    </td>
                    <td class="bg-td">部门名称：</td>
                    <td><el-input type="text" v-model="form.name" size="small"></el-input></td>
                  </tr>
                  <tr>
                    <td class="bg-td">是否激活：</td>
                    <td colspan="3">
                      <el-switch
                        v-model="form.switch"
                        active-color="#409eff"
                        inactive-color="#bbb">
                      </el-switch>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-td">备注：</td>
                    <td colspan="3">
                      <el-input type="textarea" rows="5" v-model="form.remark" size="small"></el-input>
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
      dpData: [
        { name: 'blue', prevDepart: '1', departManger: '1', option: '1', maker: '1', makeTime: '2020-02-02' },
        { name: 'red', prevDepart: '2', departManger: '2', option: '2', maker: '2', makeTime: '2020-02-02' },
        { name: 'yellow', prevDepart: '3', departManger: '3', option: '3', maker: '3', makeTime: '2020-02-02' },
        { name: 'green', prevDepart: '4', departManger: '4', option: '4', maker: '4', makeTime: '2020-02-02' }
      ],
      totalData: 3,
      condition: { currentPage: 1 },
      dialogName: '新增部门',
      disVisible: false,
      options: [{ value: '1', label: '养护科' }, { value: '2', label: '工程科' }],
      form: {
        department: '',
        name: '',
        switch: true,
        remark: ''
      }
    }
  },
  mounted () {
    this.save()
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
      console.log(sessionStorage.getItem('currentUser'))
    },
    openDialog (type, index, row) {
      this.disVisible = true
      // if (type.indexOf('add') > -1) {
      //   this.form = {
      //     department: '',
      //     name: '',
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
        department: '',
        name: '',
        switch: true,
        remark: ''
      }
    },
    deleteRow (index, row) {
      // alert(1)
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
