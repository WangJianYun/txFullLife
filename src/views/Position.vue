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
                    prop="name"
                    label="职务名称"
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
                    <td class="bg-td">职务名称：</td>
                    <td><el-input type="text" v-model="form.name" size="small"></el-input></td>
                    <td class="bg-td">是否激活：</td>
                    <td>
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
        { name: 'blue', option: '1', maker: '1', makeTime: '2020-02-02' },
        { name: 'red', option: '2', maker: '2', makeTime: '2020-02-02' },
        { name: 'yellow', option: '3', maker: '3', makeTime: '2020-02-02' },
        { name: 'green', option: '4', maker: '4', makeTime: '2020-02-02' }
      ],
      totalData: 3,
      condition: { currentPage: 1 },
      dialogName: '新增职务',
      disVisible: false,
      form: {
        name: '',
        switch: true,
        remark: ''
      }
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
        name: '',
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
