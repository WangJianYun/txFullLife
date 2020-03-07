<template>
  <div id="authority">
    <el-row style="line-height:20px;">
      <el-col :span="4">
        <span style="font-size:20px;">>> 权限配置与管理</span>
      </el-col>
      <el-col
        :span="20"
        style="text-align:right;padding-right:30px;"
      >
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="openDialog('add')"
        >添加权限组</el-button>
      </el-col>
    </el-row>
    <el-main id="tableWrap">
      <el-row>
        <el-col :span="24">
          <el-table
            :data="dpData"
            border
            style="width: 100%"
            :header-cell-style="{background:'rgb(240,240,240)'}"
          >
            <el-table-column
              label="序号"
              width="50"
              align="center"
            >
              <template scope="scope"><span>{{scope.$index + 1}}</span></template>
            </el-table-column>
            <el-table-column
              prop="M0003_NAME"
              label="角色名称"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="管理员"
              width="500"
              align="center"
            >
              <template slot-scope="scope">
                <table style="width:100%;height:100%;">
                  <tr>
                    <td style="max-width:100px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                      <span v-text="scope.row.NAMES"></span>
                      <!-- <span v-for="item in scope.row.names" :key="item.code">{{item.code}}({{(item.name)}})、</span> -->
                    </td>
                    <td style="width:160px;">
                      <!-- <el-button type="danger" size="mini" v-if="scope.row.num>0" @click="checkMangers(scope.row.names)">查看<span class="num">{{scope.row.num}}</span></el-button> -->
                      <el-button
                        type="danger"
                        size="mini"
                        v-if="scope.row.COUNT>0"
                        @click="checkMangers(scope.row)"
                      >查看<span class="num">{{scope.row.COUNT}}</span></el-button>
                      <el-button
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="addManager(scope.row.M0003_ID)"
                      >添加</el-button>
                    </td>
                  </tr>
                </table>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              align="center"
            >
              <!-- <template slot-scope="scope"> -->
                <el-switch
                  v-model="value1"
                  active-color="#409eff"
                  inactive-color="#bbb"
                  disabled
                >
                </el-switch>
              <!-- </template> -->
            </el-table-column>
            <el-table-column
              prop='CREATOR'
              label="创建人"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="M0003_DATA_CREATE"
              label="创建时间"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="220"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  type="info"
                  size="mini"
                  @click="openDialog('look',scope.$index,scope.row)"
                >查看</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="openDialog('edit',scope.$index,scope.row)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="deleteRow(scope.$index,scope.row)"
                >删除</el-button>
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
      <el-dialog
        :title="dialogName"
        id="disZbDialog"
        :fullscreen="false"
        :visible.sync="disVisible"
        width="60%"
        :before-close="closeDialog"
      >
        <!-- :destroy-on-close="true" -->
        <el-main>
          <el-form
            :inline="true"
            ref="form"
            v-model="form"
            size="small"
            class="demo-form-inline"
          >
            <table class="add-table">
              <tr>
                <td class="bg-td">权限组名称：</td>
                <td>
                  <el-input
                    type="text"
                    v-model="form.M0003_NAME"
                    size="small"
                    :disabled="islook"
                  ></el-input>
                </td>
                <td class="bg-td">是否激活：</td>
                <td>
                  <el-switch
                    v-model="form.M0003_DATA_STATE"
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
                    v-model="form.M0003_DISP_NAME"
                    size="small"
                    :disabled="islook"
                  ></el-input>
                </td>
              </tr>
            </table>
            <el-main id="authModel">
              <p style="margin: 80px 0 30px 0;">权限配置</p>
              <div
                v-for="item of permisionListData"
                :key="item.M0004_ID"
              >
                <!-- <div v-show="item.M0004_LEVEL == 1"> -->
                  <span
                    class="tabs"
                    v-text="item.M0004_NAME"
                  ></span>
                  <table class="add-table authTable">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>模块名称</th>
                      <th>权限节点</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(child,index) of item.M0004_CHILD"
                      :key="index"
                    >
                      <td v-text="index+1"></td>
                      <td class="chakan">
                        <el-checkbox v-model="child.M0004_CHECKED" @change="changeCheck(child)">{{child.M0004_NAME}}</el-checkbox>
                        <!-- <el-checkbox v-model="child.M0004_CHECKED"></el-checkbox>  @change="handleCheckAllChange" :indeterminate="isIndeterminate"-->
                      </td>
                      <td>
                        <el-checkbox-group
                          v-model="child.tableForm"
                          @change="changeAuths(child)"
                        >
                          <el-checkbox
                            v-for="item1 of child.M0004_CHILD"
                            :key="item1.$index"
                            :label="item1.M0004_NAME"
                            :disabled="islook"
                          ></el-checkbox>
                        </el-checkbox-group>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
              <!-- </div> -->
            </el-main>
          </el-form>
        </el-main>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="save"
            size="small"
          >提交</el-button>
          <el-button
            @click="closeDialog"
            size="small"
          >重置</el-button>
        </div>
      </el-dialog>
    </el-row>
    <div
      id="managers"
      v-if="managerDialog"
      :style="manStyle"
    >
      <span
        class="el-icon-close"
        style="position:absolute;right:5px;top:5px;cursor:pointer;"
        @click="closeManger"
      ></span>
      <el-checkbox-group
        v-model="everyManager"
        @change='editManger'
      >
        <div
          v-for="item in mans"
          :key="item.$index"
        >
          <el-checkbox
            :label="item.NAME"
            id='checkbox_item'
            :disabled="item.STATE == 2"
          ></el-checkbox>
        </div>
      </el-checkbox-group>
    </div>
    <div
      id="checkMans"
      v-if="checkMans"
      :style="checkStyle"
    >
      <span
        class="el-icon-close"
        style="position:absolute;right:5px;top:5px;cursor:pointer;"
        @click="closeCheck"
      ></span>
      <div
        id="chMans"
        v-for=" item in this.list"
        :key="item.index"
      >
        <span>{{item.NAME}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: true,
      pageIndex: 1,
      dpData: [],
      totalData: 3,
      islook: false,
      condition: { currentPage: 1 },
      dialogName: '新增权限组',
      disVisible: false,
      everyManager: [],
      mans: [],
      chkMans: [],
      dialogType: '',
      managerDialog: false,
      checkMans: false,
      manStyle: { left: 0, top: 0 },
      checkStyle: { left: 0, top: 0 },
      form: {
        M0003_NAME: '',
        M0003_DATA_STATE: false,
        M0003_DISP_NAME: '',
        mytb: true,
        bigdata: false,
        M0004_ID: '',
        M0004_NAME: '',
        M0004_TYPE: '',
        M0004_STATE: '',
        M0004_PID: '',
        M0004_LEVEL: 1,
        M0005_STATE: '',
        M0004_CHILD: []
      },
      listPromision: [],
      permisionListData: [],
      itemID: '',
      data: '',
      itemData: '',
      manList: [],
      spanList: '',
      count: '',
      list: [],
      NAMES: '',
      NAMESarr: [],
      diff: {},
      M0003ID: '',
      M0001_ID_UPDATE: '',
      tip: '新增成功',
      idArr: [],
      M0005ID: '',
      updateData: {},
      updateID: '',
      checked: false
    }
  },
  mounted () {
    this.refreshTable(1)
  },
  methods: {
    // 分级查找子节点
    findChild (currentItem, list) {
      currentItem.M0004_CHILD = []
      // eslint-disable-next-line no-unneeded-ternary
      currentItem.M0004_CHECKED = (currentItem.M0005_STATE === '1' || currentItem.M0005_STATE === 1) ? true : false
      list.forEach(v => {
        if (currentItem.M0004_ID === v.M0004_PID) {
          if (v.M0004_LEVEL !== 3 && v.M0004_LEVEL !== '3' && !v.M0004_CHILD) {
            this.findChild(v, list)
          }
          currentItem.M0004_CHILD.push(v)
        }
      })
    },
    setTableForm (send) {
      this.listPromision = []
      this.permisionListData.forEach(v => {
        if (v.M0004_CHILD && v.M0004_CHILD.length > 0) {
          v.M0004_CHILD.forEach(v1 => {
            if (!send) {
              v1.tableForm = []
            }
            if (v1.M0004_CHILD && v1.M0004_CHILD.length > 0) {
              v1.M0004_CHILD.forEach(v2 => {
                if (!send && (v2.M0005_STATE === '1' || v2.M0005_STATE === 1)) {
                  v1.tableForm.push(v2.M0004_NAME)
                }
                v2.M0005_STATE = v1.tableForm.includes(v2.M0004_NAME) ? 1 : 0
                v1.M0005_STATE = v1.tableForm.length > 0 ? 1 : 0
                v1.M0004_CHECKED = !!v1.M0005_STATE
                v.M0005_STATE = v1.M0005_STATE
                this.listPromision.push(v2)
              })
            }
            this.listPromision.push(v1)
          })
          this.listPromision.push(v)
        }
      })
      console.log(this.permisionListData)
      // this.permisionListData = [...this.permisionListData]
    },
    getPermission (id) {
      const path = `/cycle/roleGroupManagement/${id ? ('getPermissionByRoleId?ID=' + id) : 'getPermission'}`
      this.$api.post(path, null, null, r => {
        this.permisionListData = r.data.filter(v => v.M0004_LEVEL === '1' || v.M0004_LEVEL === 1)
        this.permisionListData.forEach(v => {
          this.findChild(v, r.data)
        })
        this.setTableForm()
      })
    },
    refreshTable (pageIndex) {
      this.pageIndex = pageIndex
      this.condition.currentPage = pageIndex
      this.$api.post('/cycle/roleGroupManagement/listPage', this.condition, null, r => {
        this.dpData = r.data
        this.totalData = r.data.length
      })
    },
    save () {
      this.setTableForm(true)
      this.itemData = {
        M0003_DATA_STATE: this.form.M0003_DATA_STATE ? 1 : 0,
        M0003_DISP_NAME: this.form.M0003_DISP_NAME,
        M0001_ID_UPDATE: JSON.parse(sessionStorage.getItem('currentUser')).UserMap.CM_M0001_ID,
        M0003_NAME: this.form.M0003_NAME
      }
      this.data = {
        'mapParam': this.itemData,
        'permissionList': this.listPromision
        // 'permissionList': this.listPromision
      }
      if (this.dialogType === 'add') {
        this.itemData.CREATOR = JSON.parse(sessionStorage.getItem('currentUser')).UserName
        this.itemData.M0001_ID_CREATE = JSON.parse(sessionStorage.getItem('currentUser')).UserMap.CM_M0001_ID
        this.data.mapParam = this.itemData
        this.$api.post('/cycle/roleGroupManagement/insert', this.data, '新增成功', r => {
          this.closeDialog()
          this.refreshTable(1)
        })
      }
      if (this.dialogType === 'edit') {
        this.data.mapParam = { ...this.updateData, ...this.itemData }
        this.$api.post('/cycle/roleGroupManagement/updateSelective', this.data, '修改成功', r => {
          this.closeDialog()
          this.refreshTable(1)
        })
      }
    },
    changeCheck (child) {
      console.log(child)
      if (child.M0004_CHECKED) {
        child.tableForm = ['查询', '删除', '修改', '添加']
      } else {
        child.tableForm = []
      }
    },
    openDialog (type, index, row) {
      console.log(row)
      this.disVisible = true
      this.managerDialog = false
      this.checkMans = false
      if (type === 'add') {
        this.dialogName = '新增权限组'
        this.dialogType = 'add'
        this.getPermission()
      }
      if (type === 'edit') {
        this.dialogName = '编辑权限组'
        this.form = row
        this.updateData = row
        this.updateID = row.M0003_ID
        // eslint-disable-next-line no-unneeded-ternary
        this.form.M0003_DATA_STATE = (this.form.M0003_DATA_STATE === 1 ? true : false)
        this.dialogType = 'edit'
        this.getPermission(row.M0003_ID)
      }
      if (type === 'look') {
        this.dialogName = '查看权限组'
        this.form = row
        this.islook = true
        this.getPermission(row.M0003_ID)
      }
    },
    changeAuths (currets) {
      this.setTableForm(true)
    },
    closeDialog () {
      this.disVisible = false
      this.islook = false
      this.form = {
        M0003_NAME: '',
        M0003_DATA_STATE: false,
        M0003_DISP_NAME: '',
        mytb: true,
        bigdata: false,
        M0004_ID: '',
        M0004_NAME: '',
        M0004_TYPE: '',
        M0004_STATE: '',
        M0004_PID: '',
        M0004_LEVEL: 1,
        M0005_STATE: '',
        M0004_CHILD: []
      }
      this.data = ''
    },
    deleteRow (index, row) {
      this.$confirm('确认删除？此操作不可取消', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/cycle/roleGroupManagement/deleteById?ID=' + row.M0003_ID, {}, '删除成功', r => {
          this.refreshTable(1)
        })
      }).catch((err) => {
        console.log(err)
      })
    },

    addManager (id) {
      this.managerDialog = true
      this.checkMans = false
      let e = window.event
      this.M0003ID = id
      this.manStyle = { left: e.clientX - 280 + 'px', top: e.clientY - 150 + 'px' }
      this.$api.post('/cycle/roleGroupMember/addList?M0003_ID=' + id, {}, null, r => {
        this.mans = []
        this.everyManager = []
        this.manList = r.data
        this.manList.forEach(item => {
          this.mans.push(item)// 成员
          if (item.STATE === '1') {
            this.everyManager.push(item.NAME)// 选中状态成员
          }
        })
      })
    },
    closeManger () {
      this.managerDialog = false
      this.checkMans = false
    },
    editManger (data) {
      // 判断是添加还是取消管理员
      this.mans.forEach(v => {
        if (this.everyManager.includes(v.NAME)) {
          if (v.STATE === 0 || v.STATE === '0') {
            this.diff = v
            this.diff.STATE = 1
          }
        } else {
          if (v.STATE === 1 || v.STATE === '1') {
            this.diff = v
            this.diff.STATE = 0
          }
        }
      })
      this.diff['M0003_ID'] = this.M0003ID
      if (this.diff.STATE === 0) {
        this.tip = '取消成功'
      } else {
        this.tip = '新增成功'
      }
      this.$api.post('/cycle/roleGroupMember/update', this.diff, this.tip, r => {
        this.refreshTable(1)
      })
    },
    checkMangers (row) {
      // console.log(row)// 成员查看
      this.checkMans = true
      this.managerDialog = false
      let e = window.event
      this.checkStyle = { left: e.clientX - 280 + 'px', top: e.clientY - 150 + 'px' }
      this.$api.post('/cycle/roleGroupMember/lookList?M0003_ID=' + row.M0003_ID, {}, null, r => {
        this.list = r.data.list
      })
    },
    closeCheck () {
      this.checkMans = false
      this.managerDialog = false
    }
  }
}
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#authority {
  #tableWrap {
    background: #fff;
    margin-top: 20px;
  }
  #managers {
    position: absolute;
    width: 300px;
    box-shadow: 0 0 5px #bbb;
    padding: 20px 0 20px 20px;
    background-color: rgb(221, 253, 247);
  }
  #checkbox_item {
    height: 24px;
    line-height: 24px;
    font-size: 18px;
    color: #000;
  }
  #checkMans {
    position: absolute;
    width: 200px;
    box-shadow: 0 0 5px #bbb;
    padding: 16px 0 16px 16px;
    background-color: #fff;
  }
  #chMans span {
    display: inline-block;
    margin: 3px 10px;
    font-size: 18px;
    color: #333;
    height: 24px;
    line-height: 24px;
  }
  .tabs {
    padding: 8px 30px;
    background: rgb(76, 195, 165);
    color: #fff;
  }
  .authTable {
    margin: 20px 0 30px 0;
  }
  .add-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #dcdfe6;
    tr {
      border: 1px solid #dcdfe6;
      td,
      th {
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
  .chakan{
    font-weight: 700;
    font-size: 16px;
  }
}
</style>
