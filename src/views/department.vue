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
                <el-button type="primary" @click="openDialog">添加部门</el-button>
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
                      <el-button type="primary" size="small" @click="openDialog('look',scope.row)">查看</el-button>
                      <el-button type="primary" size="small" @click="openDialog('edit',scope.row)">编辑</el-button>
                      <el-button type="primary" size="small" @click="delete(scope.row)">删除</el-button>
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
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="选择部门归属：" label-width="150px">
                        <el-select v-model="form.department" placeholder="--- 请选择 ---">
                            <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value"></el-option>
                        </el-select>
                        <!-- <el-input type="text" v-model="form.department"></el-input> -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="部门名称：" label-width="150px">
                        <el-input type="text" v-model="form.name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="是否激活：" label-width="150px">
                        <el-switch
                          v-model="form.switch"
                          active-color="#13ce66"
                          inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="备注：" label-width="150px" id="remark">
                      <el-input type="textarea" rows="5" style="width:90%;" v-model="form.remark"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-main>
              <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="save">提交</el-button>
                  <el-button type="primary" @click="closeDialog">重置</el-button>
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
    check (row) {

    },
    save () {

    },
    openDialog (type, row) {
      this.disVisible = true
      this.form = row
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
    delete () {

    }
  }
}
</script>
<style>
  #department #tableWrap{background: #fff;margin-top: 20px;}
  #department .el-form-item{width: 100%;}
  #department #remark .el-form-item__content{width: 80%;}
</style>
