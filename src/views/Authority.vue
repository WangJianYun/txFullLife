<template>
    <div id="authority">
        <el-row style="line-height:20px;">
            <el-col :span="4">
                <span style="font-size:20px;">>> 权限配置与管理</span>
            </el-col>
            <el-col :span="20" style="text-align:right;padding-right:30px;">
                <el-button type="primary" icon="el-icon-plus" @click="openDialog('add')">添加权限组</el-button>
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
                    label="角色名称"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="管理员"
                    width="500"
                    align="center">
                    <template slot-scope="scope">
                        <table style="width:100%;height:100%;">
                            <tr>
                                <td style="max-width:100px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                                    <span v-for="item in scope.row.names" :key="item.code">{{item.code}}({{(item.name)}})、</span>
                                </td>
                                <td style="width:160px;">
                                    <el-button type="danger" size="mini" v-if="scope.row.num>0" @click="checkMangers(scope.row.names)">查看<span class="num">{{scope.row.num}}</span></el-button>
                                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="addManager(scope.row.id)">添加</el-button>
                                </td>
                            </tr>
                        </table>
                    </template>
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
              <el-form :inline="true" ref="form" v-model="form" size="small" class="demo-form-inline">
                <table class="add-table">
                  <tr>
                    <td class="bg-td">权限组名称：</td>
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
                <el-main id="authModel">
                    <p style="margin: 80px 0 30px 0;">权限配置</p>
                    <span class="tabs">机构详情</span>
                    <table class="add-table authTable">
                        <thead><tr><th>序号</th><th>模块名称</th><th>权限节点</th></tr></thead>
                        <tbody>
                            <tr><td>1</td><td>我的桌面</td><td><el-checkbox v-model="form.mytb" @change="changeAuths('book')">查看</el-checkbox></td></tr>
                            <tr><td>2</td><td>大数据分析</td><td><el-checkbox v-model="form.bigdata" @change="changeAuths('bigdata')">查看</el-checkbox></td></tr>
                        </tbody>
                    </table>
                    <span class="tabs">养护费用</span>
                    <table class="add-table authTable">
                        <thead><tr><th>序号</th><th>模块名称</th><th>权限节点</th></tr></thead>
                        <tbody>
                            <tr><td>1</td><td>费用录入</td>
                                <td>
                                    <el-checkbox-group v-model="form.yhCostIn" @change="changeAuths('yhcostin')">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                            <tr><td>2</td><td>费用详情</td>
                                <td>
                                    <el-checkbox-group v-model="form.yhCostXq">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <span class="tabs">日常费用</span>
                    <table class="add-table authTable">
                        <thead><tr><th>序号</th><th>模块名称</th><th>权限节点</th></tr></thead>
                        <tbody>
                            <tr><td>1</td><td>费用录入</td>
                                <td>
                                    <el-checkbox-group v-model="form.dayCostIn" @change="changeAuths('yhcostin')">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                            <tr><td>2</td><td>费用详情</td>
                                <td>
                                    <el-checkbox-group v-model="form.dayCostXq">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <span class="tabs">资产技术等级</span>
                    <table class="add-table authTable">
                        <thead><tr><th>序号</th><th>模块名称</th><th>权限节点</th></tr></thead>
                        <tbody>
                            <tr><td>1</td><td>资产技术等级列表</td>
                                <td>
                                    <el-checkbox-group v-model="form.techLevel" @change="changeAuths('yhcostin')">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <span class="tabs">公路资产</span>
                    <table class="add-table authTable">
                        <thead><tr><th>序号</th><th>模块名称</th><th>权限节点</th></tr></thead>
                        <tbody>
                            <tr><td>1</td><td>资产列表</td>
                                <td>
                                    <el-checkbox-group v-model="form.assetList" @change="changeAuths('yhcostin')">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <span class="tabs">基础数据</span>
                    <table class="add-table authTable">
                        <thead><tr><th>序号</th><th>模块名称</th><th>权限节点</th></tr></thead>
                        <tbody>
                            <tr><td>1</td><td>百米桩号</td>
                                <td>
                                    <el-checkbox-group v-model="form.meters" @change="changeAuths('yhcostin')">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                            <tr><td>2</td><td>管辖路段</td>
                                <td>
                                    <el-checkbox-group v-model="form.highway">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <span class="tabs">系统配置</span>
                    <table class="add-table authTable">
                        <thead><tr><th>序号</th><th>模块名称</th><th>权限节点</th></tr></thead>
                        <tbody>
                            <tr><td>1</td><td>部门管理</td>
                                <td>
                                    <el-checkbox-group v-model="form.department" @change="changeAuths('yhcostin')">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                            <tr><td>2</td><td>职务管理</td>
                                <td>
                                    <el-checkbox-group v-model="form.position">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                            <tr><td>3</td><td>管理员管理</td>
                                <td>
                                    <el-checkbox-group v-model="form.manager">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                            <tr><td>4</td><td>权限组配置</td>
                                <td>
                                    <el-checkbox-group v-model="form.authority">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </el-main>
              </el-form>
            </el-main>
              <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="save" size="small">提交</el-button>
                  <el-button @click="closeDialog" size="small">重置</el-button>
              </div>
          </el-dialog>
        </el-row>
        <div id="managers" v-if="managerDialog" :style="manStyle">
          <span class="el-icon-close" style="position:absolute;right:5px;top:5px;cursor:pointer;" @click="closeManger"></span>
          <el-checkbox-group v-model="everyManager">
            <div v-for="item in mans" :key="item.$index"><el-checkbox :label="item"></el-checkbox></div>
          </el-checkbox-group>
        </div>
        <div id="checkMans" v-if="checkMans" :style="checkStyle">
          <span class="el-icon-close" style="position:absolute;right:5px;top:5px;cursor:pointer;" @click="closeCheck"></span>
          <div id="chMans">
            <span v-for="item in chkMans" :key="item.code">{{item.code}}{{item.name}}</span>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      pageIndex: 1,
      dpData: [
        { id: '1', name: 'blue', switch: true, maker: '1', makeTime: '2020-02-02', num: 32, names: [{ code: 'y12', name: '张三' }, { code: 'x23', name: '刘德华' }, { code: 'a23', name: '刘德华' }, { code: 'b23', name: '刘德华' }, { code: 'c23', name: '刘德华' }, { code: 'y123', name: '刘德华' }, { code: 'd23', name: '刘德华' }] },
        { id: '2', name: 'red', switch: false, maker: '2', makeTime: '2020-02-02', num: 0, names: [{ code: 'wjy', name: '李四' }] },
        { id: '3', name: 'yellow', switch: true, maker: '3', makeTime: '2020-02-02', num: 2, names: [{ code: 'abc', name: '王五' }] },
        { id: '4', name: 'green', switch: false, maker: '4', makeTime: '2020-02-02', num: 1, names: [{ code: 'dd', name: '赵六' }] }
      ],
      totalData: 3,
      condition: { currentPage: 1 },
      dialogName: '新增权限组',
      disVisible: false,
      auths: ['查看', '新增', '修改', '删除', '批量删除', '锁定', '启用'],
      everyManager: [],
      mans: ['张三', '李四', '王五', '赵六'],
      chkMans: [],
      managerDialog: false,
      checkMans: false,
      manStyle: { left: 0, top: 0 },
      checkStyle: { left: 0, top: 0 },
      form: {
        name: '',
        switch: false,
        remark: '',
        mytb: true,
        bigdata: false,
        yhCostIn: [],
        yhCostXq: [],
        dayCostIn: [],
        dayCostXq: [],
        techLevel: [],
        assetList: [],
        meters: [],
        highway: [],
        department: [],
        position: [],
        manager: [],
        authority: []
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
      this.managerDialog = false
      this.checkMans = false
    //   if (type.indexOf('add') > -1) {
    //     this.form = {
    //       name: '',
    //       switch: true,
    //       remark: ''
    //     }
    //   } else {
    //     this.form = row
    //     this.form.department = ''
    //     this.form.switch = false
    //   }
    },
    closeDialog () {
      this.disVisible = false
      this.form = {
        name: '',
        switch: false,
        remark: '',
        mytb: true,
        bigdata: false,
        yhCostIn: [],
        yhCostXq: [],
        dayCostIn: [],
        dayCostXq: [],
        techLevel: [],
        assetList: [],
        meters: [],
        highway: [],
        department: [],
        position: [],
        manager: [],
        authority: [],
        sunny: []
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
    },
    changeAuths (txt) {
      switch (txt) {
        case 'book':
          console.log(this.form.mytb)
          break
        case 'bigdata':
          console.log(this.form.bigdata)
          break
        case 'yhcostin':
          console.log(this.form.yhCostIn)
          break
      }
    },
    addManager (id) {
      this.managerDialog = true
      this.checkMans = false
      let e = window.event
      this.manStyle = { left: e.clientX - 280 + 'px', top: e.clientY - 150 + 'px' }
      if (id.indexOf('1') !== -1) {
        this.everyManager = ['张三', '李四']
      } else {
        this.everyManager = ['王五', '赵六']
      }
    },
    closeManger () {
      this.managerDialog = false
      this.checkMans = false
    },
    checkMangers (names) {
      this.checkMans = true
      this.managerDialog = false
      let e = window.event
      this.checkStyle = { left: e.clientX - 280 + 'px', top: e.clientY - 150 + 'px' }
      this.chkMans = names
    },
    closeCheck () {
      this.checkMans = false
      this.managerDialog = false
    }
  }
}
</script>
<style lang="scss">
  #authority{
    #tableWrap{background: #fff;margin-top: 20px;}
    #managers{position: absolute;width: 100px;box-shadow: 0 0 5px #bbb;padding:20px 0 20px 20px;background-color: #fff;}
    #checkMans{position: absolute;width: 150px;box-shadow: 0 0 5px #bbb;padding:16px 0 16px 16px;background-color: #fff;}
    #chMans span{display: inline-block;margin: 3px 10px;font-size: 14px;color: #444;}
    .tabs{padding: 8px 30px;background: rgb(76, 195, 165);color: #fff;}
    .authTable{margin: 20px 0 30px 0;}
    .add-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #dcdfe6;
      tr {
        border: 1px solid #dcdfe6;
        td,th {
          border: 1px solid #dcdfe6;
          padding: 5px 10px;
          text-align: center;
        }
      }
      .bg-td {
        background: #f0f0f0;
        text-align: center;
      }
    }
  }
</style>
