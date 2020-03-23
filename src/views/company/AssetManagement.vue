/*
 * @Description 资产类别列表
 */
<template>
  <div class="higway-wrap">
    <p class="title-p">
      <span style="display:inline-block;margin-bottom:20px;"> >> 资产类别管理 </span>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="openDialog('add')"
      >增加资产类别</el-button>
    </p>
    <div class="content">
      <div>
        <el-button
          type="primary"
          icon="el-icon-delete"
          @click="delListFun"
        >批量删除</el-button>
      </div>
      <div class="table-div">
        <el-table
          v-loading.body="loading"
          :data="assetData"
          border
          style="width: 100%"
          highlight-current-row
          @select="selectTable"
          @select-all="selectAll"
          :header-cell-style="{background:'#f0f0f0'}"
        >
          >
          <el-table-column
            type="selection"
            width="40"
          >
          </el-table-column>
          <el-table-column
            label="序号"
            width="50"
            align="center"
          >
            <template scope="scope"><span>{{scope.$index + 1}}</span></template>
          </el-table-column>
          <el-table-column
            prop="T0001_ASSETTYPE_NAME"
            label="主类别"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="T0001_CHILD"
            label="从属子类别"
            align="center"
          >
          <template slot-scope="scope">
           <div class="button_box" v-for="(item,index) of scope.row.T0001_CHILD" :key="index">
              <span class="tip">{{item.T0001_ASSETTYPE_NAME}}</span>
              <div class="buttons" v-if="scope.row.T0001_CHILD.length>0">
                <el-button
                type="info"
                size="mini"
                @click="openDialog('look',item)"
              >查看</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="openDialog('edit',item)"
              >编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="deleteRow(item)"
              >删除</el-button>
              </div>
           </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="T0001_ASSETYPE_REMARK"
            label="备注"
            align="center"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            width="170"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="info"
                size="mini"
                @click="openDialog('look',scope.row)"
              >查看</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="openDialog('edit',scope.row)"
              >编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="deleteRow(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          class="table-page"
          @current-change="currentChange"
          :current-page="higway.currentPage"
          @size-change="sizeChange"
          :page-sizes="[10, 50, 100]"
          :page-size="higway.showCount"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination> -->
      </div>
    </div>
    <!-- 新建 -->
    <el-dialog
      :title="dialogName"
      :visible.sync="addShow"
       :before-close="closeDialog"
      custom-class="dialog-div"
    >
    <el-form
        :model="form"
        :rules="rules"
        ref="form"
      >
      <table class="add-table">
        <tr>
          <td class="bg-td">请选择类别</td>
          <td>
            <el-select v-model="form.T0001_PID" placeholder="请选择" :disabled="isChoose">
              <el-option
                v-for="(item,index ) in assetData"
                :key="index"
                :label="item.T0001_ASSETTYPE_NAME"
                :value="item.T0001_ID">
              </el-option>
            </el-select>
          </td>
          <td class="bg-td">类别名称</td>
            <td>
              <el-form-item prop="T0001_ASSETTYPE_NAME">
              <el-input v-model.trim="form.T0001_ASSETTYPE_NAME" size="small" maxlength="30" :disabled="islook"></el-input>
              </el-form-item>
            </td>
        <tr>
          <td class="bg-td">备注</td>
          <td colspan="10">
            <el-input
              type="textarea"
              :rows="10"
              v-model="form.T0001_ASSETYPE_REMARK"
              :disabled="islook"
              maxlength="2000"
            ></el-input>
          </td>
        </tr>
      </table>
       </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button type="primary" @click="save">保 存</el-button>
        <el-button @click="resetDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogName: '新增高速',
      loading: false,
      addShow: false,
      editShow: false,
      infoShow: false,
      editForm: {},
      addForm: {},
      infoForm: {},
      dpData: [],
      assetData: [],
      islook: false,
      isChoose: false,
      form: {
        M0018_ID: '',
        T0001_ID: '',
        T0001_ASSETTYPE_NAME: '',
        T0001_PID: '',
        T0001_ASSETYPE_REMARK: ''
      },
      rules: {
        T0001_ASSETTYPE_NAME: [
          { required: true, message: '请输入类别名称', trigger: 'blur' }
        ]
      },
      higway: {
        showCount: 10,
        currentPage: 1
      },
      total: 0,
      selectList: [],
      mainData: [],
      options: []
    }
  },
  mounted () {
    this.refreshTable()
    this.getAllData()
  },
  methods: {
    // 分页
    sizeChange (val) {
      this.higway.showCount = val
    },
    currentChange (val) {
      this.higway.currentPage = val
    },
    selectTable (selection) {
      this.selectList = selection
    },
    selectAll (selection) {
      this.selectList = selection
    },

    // 数据整理出子集
    findChild (currentItem, list) {
      currentItem.T0001_CHILD = []
      // eslint-disable-next-line no-unneeded-ternary
      list.forEach(v => {
        if (currentItem.T0001_ID === v.T0001_PID) {
          currentItem.T0001_CHILD.push(v)
        }
      })
    },
    // 列表
    refreshTable (pageIndex) {
      this.form.M0018_ID = sessionStorage.getItem('id')
      // eslint-disable-next-line no-unused-vars
      // let _data = {
      //   currentPage: this.higway.currentPage,
      //   showCount: this.higway.showCount,
      //   searchMap: { 'M0018_ID': this.form.M0018_ID }
      // }
      this.$api.post('/cycle/assetType/listAll', { 'M0018_ID': this.form.M0018_ID }, null, r => {
        this.assetData = r.data.filter(v => v.T0001_PID === '0' || v.T0001_PID === 0)
        this.assetData.forEach(v => {
          this.findChild(v, r.data)
        })
        this.total = this.assetData.length
      })
    },
    // 选择框的数据
    getAllData () {
      this.$api.post('/cycle/assetType/listAll', { 'M0018_ID': this.form.M0018_ID }, null, r => {
        this.mainData = r.data.filter(v => v.T0001_PID === '0' || v.T0001_PID === 0) // 选择框的数据
      })
    },
    // 关闭弹窗
    closeDialog () {
      this.$refs['form'].resetFields()
      this.addShow = false
      this.islook = false
      this.isChoose = false
      this.form = {}
      this.refreshTable()
    },
    resetDialog () {
      this.addShow = false
      this.$refs['form'].resetFields()
      this.closeDialog()
    },
    openDialog (type, row) {
      if (type === 'add') {
        this.addShow = true
        this.dialogName = '新增资产类别'
        this.dialogType = 'new'
        this.$api.post(`/cycle/utilData/getId`, {}, null, r => {
          this.form.T0001_ID = r.data
        })
      }
      if (type === 'edit') {
        if (row.T0001_PID === '0' || row.T0001_PID === 0) {
          row.T0001_PID = ''
          this.isChoose = true
        }
        this.addShow = true
        this.dialogName = '编辑资产类别'
        this.form = row
        this.dialogType = 'edit'
      }
      if (type === 'look') {
        if (row.T0001_PID === '0' || row.T0001_PID === 0) {
          row.T0001_PID = ''
        }
        this.addShow = true
        this.dialogName = '查看资产类别'
        this.form = row
        this.islook = true
        this.isChoose = true
        this.dialogType = 'look'
      }
    },
    save () {
      this.form.M0018_ID = sessionStorage.getItem('id')
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.dialogType === 'new') {
            // 选择框为空，则传0给后端
            if (this.form.T0001_PID === '') {
              this.form.T0001_PID = '0'
            }
            console.log(this.form)
            this.$api.post('/cycle/assetType/insert', this.form, '新增成功', r => {
              this.closeDialog()
            })
          }
          if (this.dialogType === 'edit') {
            if (this.form.T0001_PID === '') {
              this.form.T0001_PID = '0'
            }
            this.$api.post('/cycle/assetType/update', this.form, '编辑成功', r => {
              this.closeDialog()
            })
          }
          if (this.dialogType === 'look') {
            this.addShow = false
            this.islook = false
            this.isChoose = false
            this.form = {}
            this.refreshTable()
          }
        } else {
          return false
        }
      })
    },
    deleteRow (row) {
      console.log(row)
      this.$confirm('确认删除？此操作不可取消', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/cycle/assetType/deleteById?ID=' + row.T0001_ID, {}, '删除成功', r => {
          this.refreshTable()
        })
      }).catch(() => {})
    },
    addFun () {
      this.addShow = true
    },
    handleInfo (data) {
      this.infoShow = true
      this.infoForm = Object.assign({}, data)
    },
    handleEdit (data) {
      this.editShow = true
      this.editForm = Object.assign({}, data)
    },
    handleDelete (data) {},
    // 批量删除
    delListFun () {
      let _list = []
      if (this.selectList.length > 0) {
        for (let i = 0; i < this.selectList.length; i++) {
          _list.push(this.selectList[i].T0001_ID)
        }
        this.$confirm('确定要删除这些记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post(
            `/cycle/assetType/deleteByIds?IDS=${_list}`,
            {},
            null,
            r => {
              this.$message.success('删除成功')
              this.refreshTable()
              this.selectList = []
            }
          )
        })
      } else {
        this.$message.warning('请选择要删除的数据！')
      }
    }
  }
}
</script>
<style lang="scss">
.higway-wrap {
  .title-p {
    button {
      float: right;
    }
  }
  .content {
    background: #fff;
    padding: 30px 20px;
    .table-div {
        margin-top: 10px;
      .el-button--mini {
        margin: 0 2px;
        padding: 4px 8px;
      }
    }
  }
  .p-search {
    margin-left: 20px;
    display: inline-block;
    width: 600px;
    // .el-button--primary {
    //   margin-left: 10px;
    // }
  }
  .table-page {
    text-align: center;
    margin-top: 10px;
  }
  .add-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #dcdfe6;
    tr {
      border: 1px solid #dcdfe6;
      td {
        border: 1px solid #dcdfe6;
        padding: 15px 15px !important;
          .el-form-item{
            margin-bottom: 0 !important;
          }
      }
    }
    .bg-td {
      background: #f0f0f0;
      text-align: center;
    }
  }
  .dialog-div {
    width: 1000px;
  }
  .button_box {
    border: 1px solid #999;
    margin: 2px;
    text-align: start;
    position: relative;
  }
  .higway-wrap .tip{
    width:auto;
    display: inline-block;
    text-align: center;
    padding-left:10%;
  }
  .buttons{
    float: right;
  }
}
</style>
