/*
 * @Description：高速管理
 */
<template>
  <div class="higway-wrap">
    <p class="title-p">
      <span style="display:inline-block;margin-bottom:20px;"> >> 高速管理 </span>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="openDialog('add')"
      >增加高速</el-button>
    </p>
    <div class="content">
      <div>
        <el-button
          type="primary"
          icon="el-icon-delete"
          @click="delListFun"
        >批量删除</el-button>
        <p class="p-search">
          <span>
            请输入关键字
          </span>
          <el-input
            placeholder="请输入内容"
            v-model="SEARCH_KEY"
            style="width:240px"
          >
          </el-input>
          <el-button type="primary" @click="searchFun">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </p>
      </div>
      <div class="table-div">
        <el-table
          v-loading.body="loading"
          :data="dpData"
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
            prop="M0008_HIGHSPEED_NAME"
            label="高速名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="M0008_HIGHSPEED_ABBR"
            label="简称"
          >
          </el-table-column>
          <el-table-column
            prop="M0008_HIGHSPEED_NUM"
            label="编号"
          >
          </el-table-column>
          <el-table-column
            prop="M0008_START_POINT"
            label="起点"
          >
          </el-table-column>
          <el-table-column
            prop="M0008_END_POINT"
            label="终点"
          >
          </el-table-column>
          <el-table-column
            prop="M0008_HIGHSPEED_KILO"
            label="里程（公里）"
          >
          </el-table-column>
          <el-table-column
            prop="M0008_START_PILE"
            label="起点桩号"
          >
          </el-table-column>
          <el-table-column
            prop="M0008_END_PILE"
            label="终点桩号"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            width="170"
            label="操作"
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
        <el-pagination
          class="table-page"
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="higway.currentPage"
          :page-sizes="[10, 50, 100]"
          :page-size="higway.showCount"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
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
          <td class="bg-td">高速名称：</td>
          <td>
            <el-form-item prop="M0008_HIGHSPEED_NAME">
            <el-input
              v-model.trim="form.M0008_HIGHSPEED_NAME"
              size="small"
              maxlength="50"
              :disabled="islook"
            ></el-input>
            </el-form-item>
          </td>
          <td class="bg-td">简称： </td>
          <td>
            <el-form-item prop="M0008_HIGHSPEED_ABBR">
            <el-input
              v-model.trim="form.M0008_HIGHSPEED_ABBR"
              size="small"
              maxlength="30"
              :disabled="islook"
            ></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td class="bg-td">编号： </td>
          <td>
            <el-form-item prop="M0008_HIGHSPEED_NUM">
            <el-input
              v-model.trim="form.M0008_HIGHSPEED_NUM"
              size="small"
              maxlength="20"
              :disabled="islook"
            ></el-input>
            </el-form-item>
          </td>
          <td class="bg-td">里程（公里）：</td>
          <td>
            <el-form-item prop="M0008_HIGHSPEED_KILO">
            <el-input
              v-model.number="form.M0008_HIGHSPEED_KILO"
              size="small"
              :disabled="islook"
            ></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td class="bg-td">起点： </td>
          <td>
            <el-form-item prop="M0008_START_POINT">
            <el-input
              v-model.trim="form.M0008_START_POINT"
              size="small"
              maxlength="30"
              :disabled="islook"
            ></el-input>
            </el-form-item>
          </td>
          <td class="bg-td">终点：</td>
          <td>
            <el-form-item prop="M0008_END_POINT">
            <el-input
              v-model.trim="form.M0008_END_POINT"
              size="small"
              maxlength="30"
              :disabled="islook"
            ></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td class="bg-td">起点桩号： </td>
          <td>
            <el-form-item prop="M0008_START_PILE">
            <el-input
              v-model.trim="form.M0008_START_PILE"
              size="small"
              maxlength="20"
              :disabled="islook"
            ></el-input>
            </el-form-item>
          </td>
          <td class="bg-td">终点桩号：</td>
          <td>
            <el-form-item prop="M0008_END_PILE">
            <el-input
              v-model.trim="form.M0008_END_PILE"
              size="small"
              maxlength="20"
              :disabled="islook"
            ></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td class="bg-td">是否激活：</td>
          <td colspan="3">
            <el-switch
              v-model="form.M0008_IS_ACTIVE"
              active-color="#2196f3"
              inactive-color="#dddddd"
              :disabled="islook"
            >
            </el-switch>
          </td>
        </tr>
        <tr>
          <td class="bg-td">费用况详情（备注）：</td>
          <td colspan="3">
            <el-input
              type="textarea"
              :rows="6"
              v-model="form.M0008_HIGHSPEED_REMARK"
              maxlength="500"
              :disabled="islook"
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
    // 起点终点桩号
    // eslint-disable-next-line no-unused-vars
    const validPile = (rule, value, callback) => {
      let reg = /[0-9a-zA-Z]|[+,-]/ // 固定
      if (!reg.test(value)) {
        callback(new Error('桩号只能输入英文，数字，+，-'))
      } else {
        callback()
      }
    }
    return {
      dialogName: '新增高速',
      loading: false,
      addShow: false,
      editShow: false,
      infoShow: false,
      editForm: {},
      addForm: {},
      infoForm: {},
      totalData: 3,
      dpData: [],
      SEARCH_KEY: '',
      form: {
        M0018_ID: '',
        M0008_HIGHSPEED_REMARK: '',
        M0008_START_PILE: '',
        M0008_HIGHSPEED_KILO: '',
        M0008_HIGHSPEED_ABBR: '',
        M0008_HIGHSPEED_NUM: '',
        M0008_IS_ACTIVE: 1,
        M0008_ID: '',
        M0008_HIGHSPEED_NAME: '',
        M0008_END_POINT: '',
        M0008_START_POINT: '',
        M0008_END_PILE: '',
        isBlue: true
      },
      rules: {
        M0008_HIGHSPEED_NAME: [
          { required: true, message: '请填写高速名称', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/, message: '高速名称不支持特殊字符', trigger: 'blur' }
        ],
        M0008_HIGHSPEED_ABBR: [
          { required: true, message: '请填写高速简称', trigger: 'blur' }
        ],
        M0008_HIGHSPEED_NUM: [
          { required: true, message: '请填写高速编号', trigger: 'blur' },
          { pattern: /[0-9a-zA-Z]/, message: '高速编号只能为字母和数字', trigger: 'blur' }
        ],
        M0008_HIGHSPEED_KILO: [
          { required: true, message: '请填写高速里程', trigger: 'blur' },
          { type: 'number', message: '高速里程必须为数字值' }
        ],
        M0008_START_POINT: [
          { required: true, message: '请填写高速起点', trigger: 'blur' }
        ],
        M0008_END_POINT: [
          { required: true, message: '请填写高速终点', trigger: 'blur' }
        ],
        M0008_START_PILE: [
          { required: true, message: '请填写高速起点桩号', trigger: 'blur' },
          { validator: validPile, trigger: 'blur' }
        ],
        M0008_END_PILE: [
          { required: true, message: '请填写高速终点桩号', trigger: 'blur' },
          { validator: validPile, trigger: 'blur' }
        ]
      },
      higway: {
        showCount: 10,
        currentPage: 1
      },
      total: 0,
      selectList: [],
      islook: false
    }
  },
  mounted () {
    this.refreshTable()
  },
  methods: {
    // 搜索
    searchFun () {
      let _data = {
        currentPage: this.higway.currentPage,
        showCount: this.higway.showCount,
        searchMap: { 'SEARCH_KEY': this.SEARCH_KEY }
      }
      console.log(_data)
      this.$api.post('/cycle/highspeed/listPage', _data, null, r => {
        console.log(r)
        this.loading = false
        this.dpData = r.data.returnParam
        this.total = r.data.totalResult
        // this.searchVal = r.search_val
      })
    },
    // 重置
    reset () {
      this.isSearch = false
      this.SEARCH_KEY = ''
      this.showCount = 10
      this.currentPage = 1
      this.refreshTable()
    },
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
    refreshTable () {
      this.form.M0018_ID = sessionStorage.getItem('id')
      // eslint-disable-next-line no-unused-vars
      let _data = {
        currentPage: this.higway.currentPage,
        showCount: this.higway.showCount,
        searchMap: { 'M0018_ID': this.form.M0018_ID }
      }
      this.$api.post('/cycle/highspeed/listPage', _data, null, r => {
        console.log(r)
        this.dpData = r.data.returnParam
        this.total = r.data.totalResult
      })
    },
    closeDialog () {
      // this.$refs['form'].resetFields()
      this.addShow = false
      this.islook = false
      this.form = {}
      this.refreshTable()
    },
    resetDialog () {
      this.addShow = false
      // this.$refs['form'].resetFields()
      this.closeDialog()
    },
    openDialog (type, row) {
      console.log(row)
      this.imageUrl = ''
      this.imageList = []
      if (type === 'add') {
        this.addShow = true
        this.dialogName = '新增高速'
        this.form.M0008_IS_ACTIVE = this.form.isBlue
        this.dialogType = 'new'
        this.$api.post(`/cycle/utilData/getId`, {}, null, r => {
          this.form.M0008_ID = r.data
        })
      }
      if (type === 'edit') {
        this.addShow = true
        this.dialogName = '编辑高速'
        this.form = row
        this.form.isBlue = !!((this.form.M0008_IS_ACTIVE === '1' || this.form.M0008_IS_ACTIVE === 1))
        this.dialogType = 'edit'
      }
      if (type === 'look') {
        this.addShow = true
        this.dialogName = '查看高速'
        this.form = row
        this.islook = true
      }
    },
    save () {
      this.form.M0018_ID = sessionStorage.getItem('id')
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.dialogType === 'new') {
            console.log(this.form)
            this.$api.post('/cycle/highspeed/insert', this.form, '新增成功', r => {
              this.closeDialog()
            })
          }
          if (this.dialogType === 'edit') {
            this.form.M0008_IS_ACTIVE = this.form.isBlue ? 1 : 0
            this.$api.post('/cycle/highspeed/update', this.form, '编辑成功', r => {
              this.closeDialog()
            })
          }
        } else {
          return false
        }
      })
    },
    deleteRow (row) {
      this.$confirm('确认删除？此操作不可取消', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/cycle/highspeed/deleteById?ID=' + row.M0008_ID, {}, '删除成功', r => {
          this.refreshTable()
        })
      }).catch(() => {})
    },
    // 批量删除
    delListFun () {
      let _list = []
      if (this.selectList.length > 0) {
        for (let i = 0; i < this.selectList.length; i++) {
          _list.push(this.selectList[i].M0008_ID)
        }
        this.$confirm('确定要删除这些记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post(
            `/cycle/highspeed/deleteByIds?IDS=${_list}`,
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
        padding: 10px;
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
}
</style>
