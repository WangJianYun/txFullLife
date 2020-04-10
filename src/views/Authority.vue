<template>
  <div id="authority">
    <el-row style="line-height:20px;">
      <el-col :span="4">
        <span style="font-size:20px;">>> 权限配置与管理</span>
      </el-col>
      <el-col :span="20" style="text-align:right;padding-right:30px;">
        <el-button type="primary" icon="el-icon-plus" @click="openDialog('add')"
          >添加权限组</el-button
        >
      </el-col>
    </el-row>
    <el-main id="tableWrap">
      <el-row>
        <el-col :span="24">
          <el-table
            :data="dpData"
            border
            style="width: 100%"
            :header-cell-style="{ background: 'rgb(240,240,240)' }"
          >
            <el-table-column label="序号" width="80" align="center">
              <template scope="scope"
                ><span>{{ scope.$index + 1 }}</span></template
              >
            </el-table-column>
            <el-table-column prop="M0003_NAME" label="角色名称" align="center">
            </el-table-column>
            <el-table-column label="管理员" width="500" align="center">
              <template slot-scope="scope">
                <table style="width:100%;height:100%;">
                  <tr>
                    <td
                      style="max-width:100px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;border-bottom:none;padding:0;border-right:none;padding-right:10px"
                    >
                      <span
                        v-text="scope.row.NAMES"
                        style="font-size:12px"
                      ></span>
                    </td>
                    <td
                      style="width:160px;border-bottom:none;padding:0;border-right:none"
                    >
                      <el-button
                        type="danger"
                        size="mini"
                        v-if="scope.row.COUNT > 0"
                        @click="checkMangers(scope.row)"
                        >查看<span class="num">{{
                          scope.row.COUNT
                        }}</span></el-button
                      >
                      <el-button
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="addManager(scope.row.M0003_ID)"
                        >添加</el-button
                      >
                    </td>
                  </tr>
                </table>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isBlue"
                  active-color="#409eff"
                  inactive-color="#bbb"
                  disabled
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="CREATOR" label="创建人" align="center">
            </el-table-column>
            <el-table-column
              prop="M0003_DATA_CREATE"
              label="创建时间"
              align="center"
            >
            </el-table-column>
            <el-table-column label="操作" width="220" align="center">
              <template slot-scope="scope">
                <el-button
                  type="info"
                  size="mini"
                  @click="openDialog('look', scope.$index, scope.row)"
                  >查看</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="openDialog('edit', scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="deleteRow(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row class="list-pagination-row">
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
            :rules="rules"
            :model="form"
            size="small"
            class="demo-form-inline"
          >
            <table class="add-table">
              <tr>
                <td class="bg-td">权限组名称：</td>
                <td>
                  <el-form-item prop="M0003_NAME">
                    <el-input
                      type="text"
                      v-model="form.M0003_NAME"
                      size="small"
                      :disabled="islook"
                    ></el-input>
                  </el-form-item>
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
              <div v-for="item of permisionListData" :key="item.M0004_ID">
                <!-- <div v-show="item.M0004_LEVEL == 1"> -->
                <span class="tabs" v-text="item.M0004_NAME"></span>
                <table class="add-table authTable">
                  <thead>
                    <tr>
                      <th width="10%">序号</th>
                      <th width="40%">模块名称</th>
                      <th>权限节点</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(child, index) of item.M0004_CHILD" :key="index">
                      <td v-text="index + 1"></td>
                      <td class="chakan">
                        <el-checkbox
                          v-model="child.M0004_CHECKED"
                          @change="changeCheck(child)"
                          :disabled="islook"
                          >{{ child.M0004_NAME }}</el-checkbox
                        >
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
        <div slot="footer" class="dialog-footer" v-show="isCheck">
          <el-button type="primary" @click="save" size="small">确定</el-button>
          <el-button @click="closeDialog" size="small">取消</el-button>
        </div>
      </el-dialog>
    </el-row>
    <!-- 添加管理员弹窗 -->
    <div id="managers" v-if="managerDialog" :style="manStyle">
      <span
        class="el-icon-close"
        style="position:absolute;right:5px;top:5px;cursor:pointer;"
        @click="closeManger"
      ></span>
      <el-checkbox-group v-model="everyManager" @change="editManger">
        <div v-for="item in mans" :key="item.$index">
          <el-checkbox
            :label="item.NAME"
            id="checkbox_item"
            :disabled="item.STATE == 2"
          ></el-checkbox>
        </div>
      </el-checkbox-group>
    </div>
    <!-- 查看权限组成员弹框 -->
    <div id="checkMans" v-if="checkMans" :style="checkStyle">
      <span
        class="el-icon-close"
        style="position:absolute;right:5px;top:5px;cursor:pointer;"
        @click="closeCheck"
      ></span>
      <div id="chMans" v-for="item in this.list" :key="item.index">
        <span>{{ item.NAME }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // isBlue: false,
      isCheck: true,
      pageIndex: 1,
      dpData: [],
      totalData: 3,
      currentPage: 1,
      showCount: 10,
      total: 0,
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
        M0004_ID: '',
        M0004_NAME: '',
        M0004_TYPE: '',
        M0004_STATE: '',
        M0004_PID: '',
        M0004_LEVEL: 1,
        M0005_STATE: '',
        M0004_CHILD: [],
        M0018_ID: '',
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
      checked: false,
      rules: {
        M0003_NAME: [
          { required: true, message: '请输入权限组名称', trigger: 'blur' },
        ],
      },
    }
  },
  mounted() {
    this.refreshTable(1)
  },
  methods: {
    // 分页
    sizeChange(val) {
      this.showCount = val
      this.refreshTable()
    },
    currentChange(val) {
      this.currentPage = val
      this.refreshTable()
    },
    // 分级查找子节点
    findChild(currentItem, list) {
      currentItem.M0004_CHILD = []
      // eslint-disable-next-line no-unneeded-ternary
      currentItem.M0004_CHECKED =
        currentItem.M0005_STATE === '1' || currentItem.M0005_STATE === 1
          ? true
          : false
      list.forEach((v) => {
        if (currentItem.M0004_ID === v.M0004_PID) {
          if (v.M0004_LEVEL !== 3 && v.M0004_LEVEL !== '3' && !v.M0004_CHILD) {
            this.findChild(v, list)
          }
          currentItem.M0004_CHILD.push(v)
        }
      })
    },
    setTableForm(send) {
      // 无send表示发送前，有send表示发送后
      this.listPromision = []
      this.permisionListData.forEach((v) => {
        if (v.M0004_CHILD && v.M0004_CHILD.length > 0) {
          v.M0004_CHILD.forEach((v1) => {
            if (!send) {
              v1.tableForm = []
            }
            if (v1.M0004_CHILD && v1.M0004_CHILD.length > 0) {
              v1.M0004_CHILD.forEach((v2) => {
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
    },
    getPermission(id) {
      const path = `/cycle/roleGroupManagement/${
        id ? 'getPermissionByRoleId?ID=' + id : 'getPermission'
      }`
      this.$api.post(path, { M0018_ID: this.form.M0018_ID }, null, (r) => {
        this.permisionListData = r.data.filter(
          (v) => v.M0004_LEVEL === '1' || v.M0004_LEVEL === 1
        )
        this.permisionListData.forEach((v) => {
          this.findChild(v, r.data)
        })
        this.setTableForm()
      })
    },
    refreshTable(pageIndex) {
      this.form.M0018_ID = sessionStorage.getItem('id')
      // eslint-disable-next-line no-unused-vars
      let _data = {
        currentPage: this.currentPage,
        showCount: this.showCount,
        searchMap: { M0018_ID: this.form.M0018_ID },
      }
      this.$api.post(
        '/cycle/roleGroupManagement/listPage',
        _data,
        null,
        (r) => {
          this.dpData = r.data.returnParam
          this.dpData.forEach((v) => {
            v.isBlue = !!(
              v.M0003_DATA_STATE === '1' || v.M0003_DATA_STATE === 1
            )
          })
          console.log(this.dpData)
          this.total = r.data.totalResult
        }
      )
    },
    save() {
      this.form.M0018_ID = sessionStorage.getItem('id')
      this.setTableForm(true)
      this.itemData = {
        M0003_DATA_STATE: this.form.M0003_DATA_STATE === true ? 1 : 0,
        M0003_DISP_NAME: this.form.M0003_DISP_NAME,
        M0001_ID_UPDATE: JSON.parse(sessionStorage.getItem('currentUser'))
          .UserMap.CM_M0001_ID,
        M0003_NAME: this.form.M0003_NAME,
      }
      this.data = {
        mapParam: this.itemData,
        permissionList: this.listPromision,
      }
      this.$refs['form'].validate((v) => {
        if (v) {
          if (this.dialogType === 'add') {
            this.itemData.CREATOR = JSON.parse(
              sessionStorage.getItem('currentUser')
            ).UserName
            this.itemData.M0001_ID_CREATE = JSON.parse(
              sessionStorage.getItem('currentUser')
            ).UserMap.CM_M0001_ID
            this.data.mapParam = this.itemData
            this.$api.post(
              '/cycle/roleGroupManagement/insert',
              this.data,
              '新增成功',
              (r) => {
                this.closeDialog()
                this.refreshTable()
              }
            )
          }
          if (this.dialogType === 'edit') {
            this.data.mapParam = { ...this.updateData, ...this.itemData }
            this.$api.post(
              '/cycle/roleGroupManagement/updateSelective',
              this.data,
              '修改成功',
              (r) => {
                this.closeDialog()
                this.refreshTable()
              }
            )
          }
        } else {
          return false
        }
      })
    },
    changeCheck(child) {
      // console.log(child)
      if (child.M0004_CHECKED) {
        child.tableForm = ['查询', '删除', '修改', '添加']
      } else {
        child.tableForm = []
      }
    },
    openDialog(type, index, row) {
      // console.log(row)
      this.disVisible = true
      this.managerDialog = false
      this.checkMans = false
      if (type === 'add') {
        this.isCheck = true
        this.dialogName = '新增权限组'
        this.dialogType = 'add'
        this.getPermission()
      }
      if (type === 'edit') {
        this.isCheck = true
        this.dialogName = '编辑权限组'
        this.form = row
        this.updateData = row
        this.updateID = row.M0003_ID
        // eslint-disable-next-line no-unneeded-ternary
        // this.form.M0003_DATA_STATE = (this.form.M0003_DATA_STATE === 1 ? true : false)
        this.form.M0003_DATA_STATE = row.isBlue
        this.dialogType = 'edit'
        this.getPermission(row.M0003_ID)
      }
      if (type === 'look') {
        this.isCheck = false
        this.dialogName = '查看权限组'
        this.form = row
        // eslint-disable-next-line no-unneeded-ternary
        // this.form.M0003_DATA_STATE = (this.form.M0003_DATA_STATE === 1 ? true : false)
        this.form.M0003_DATA_STATE = row.isBlue
        this.islook = true

        this.getPermission(row.M0003_ID)
      }
    },
    changeAuths(currets) {
      this.setTableForm(true)
    },
    closeDialog() {
      this.$refs['form'].resetFields()
      this.disVisible = false
      this.islook = false
      this.form = {}
      this.data = ''
    },
    deleteRow(index, row) {
      this.$confirm('确认删除？此操作不可取消', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.post(
            '/cycle/roleGroupManagement/deleteById?ID=' + row.M0003_ID,
            {},
            '删除成功',
            (r) => {
              this.refreshTable(1)
            }
          )
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 新增管理员
    addManager(id) {
      this.managerDialog = true
      this.checkMans = false
      let e = window.event
      this.M0003ID = id
      this.manStyle = {
        left: e.clientX - 360 + 'px',
        top: e.clientY - 115 + 'px',
      }
      this.$api.post(
        '/cycle/roleGroupMember/addList?M0003_ID=' + id,
        {},
        null,
        (r) => {
          this.mans = []
          this.everyManager = []
          this.manList = r.data
          this.manList.forEach((item) => {
            this.mans.push(item) // 成员
            if (item.STATE === '1') {
              this.everyManager.push(item.NAME) // 选中状态成员
            }
          })
        }
      )
    },
    closeManger() {
      this.managerDialog = false
      this.checkMans = false
    },
    editManger(data) {
      // 判断是添加还是取消管理员
      this.mans.forEach((v) => {
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
      this.diff['M0018_ID'] = sessionStorage.getItem('id')
      if (this.diff.STATE === 0) {
        this.tip = '取消成功'
      } else {
        this.tip = '新增成功'
      }
      this.$api.post(
        '/cycle/roleGroupMember/update',
        this.diff,
        this.tip,
        (r) => {
          this.refreshTable(1)
        }
      )
    },
    checkMangers(row) {
      // console.log(row)// 成员查看
      this.checkMans = true
      this.managerDialog = false
      let e = window.event
      this.checkStyle = {
        left: e.clientX - 360 + 'px',
        top: e.clientY - 110 + 'px',
      }
      this.$api.post(
        '/cycle/roleGroupMember/lookList?M0003_ID=' + row.M0003_ID,
        {},
        null,
        (r) => {
          this.list = r.data.list
        }
      )
    },
    closeCheck() {
      this.checkMans = false
      this.managerDialog = false
    },
  },
}
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#authority {
  .el-dialog__header {
    background: #f5f5f5;
  }
  #tableWrap {
    background: #fff;
    margin-top: 20px;
    height: 650px;
  }
  #managers {
    position: absolute;
    width: 300px;
    box-shadow: 0 0 5px #bbb;
    padding: 20px 0 20px 20px;
    background-color: #f5f5f5 !important;
  }
  #checkbox_item {
    height: 24px;
    line-height: 24px;
    font-size: 18px;
    color: #000;
  }
  #checkMans {
    position: absolute;
    width: 300px;
    box-shadow: 0 0 5px #bbb;
    padding: 20px 0 20px 20px;
    background-color: #f5f5f5 !important;
  }
  #chMans span {
    display: inline-block;
    margin: 3px 10px;
    font-size: 14px !important;
    color: #666 !important;
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
  .el-button--mini {
    padding: 4px 5px;
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
        padding: 15px 10px !important;
        text-align: left !important;
      }
    }
    .bg-td {
      background: #f0f0f0;
      text-align: center;
    }
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .chakan {
    font-weight: 700;
    font-size: 16px;
  }
  .table-page {
    text-align: center;
    margin-top: 10px;
  }
}
</style>
