<template>
  <div class="meters-wrap">
    <p class="title-p">
      <span style="display:inline-block;margin-bottom:20px;">
        >> 桩号展示
      </span>
      <el-button type="primary" icon="el-icon-plus" @click="addFun"
        >新增桩号信息</el-button
      >
    </p>
    <div class="content">
      <el-row :gutter="0">
        <el-form label-position="right" label-width="80px" :model="dataParam">
          <el-col :span="4">
            <el-form-item label="所属路段">
              <el-select
                v-model="dataParam.M0010_LOAD_NAME"
                size="medium "
                @change="changeSelect"
              >
                <el-option
                  v-for="item in loadList"
                  :key="item.M0010_LOAD_NAME"
                  :label="item.M0010_LOAD_NAME"
                  :value="item.M0010_LOAD_NAME"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="起点桩号">
              <el-select
                v-model="dataParam.M0010_START_PILE"
                style="width:100%"
                size="medium "
              >
                <el-option
                  v-for="item in pileList"
                  :key="item.M0010_ID"
                  :label="item.M0010_START_PILE"
                  :value="item.M0010_START_PILE"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="终点桩号">
              <el-select
                v-model="dataParam.M0010_END_PILE"
                style="width:100%"
                size="medium "
              >
                <el-option
                  v-for="item in pileList"
                  :key="item.M0010_ID"
                  :label="item.M0010_END_PILE"
                  :value="item.M0010_END_PILE"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="年份选择">
              <el-date-picker
                style="width:100%"
                v-model="dataParam.YEAR"
                type="year"
                value-format="yyyy"
                size="medium "
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="关键字">
              <el-input
                placeholder="请输入关键字"
                v-model="dataParam.SEARCH_KEY"
                size="medium "
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="padding-top:3px;padding-left:5px">
            <el-button type="primary" @click="searchFun" size="small"
              >搜索</el-button
            >
            <el-button @click="reset" size="small">重置</el-button>
          </el-col>
        </el-form>
      </el-row>
      <div class="div-btn">
        <el-button type="primary" icon="el-icon-delete" @click="delListFun"
          >批量删除</el-button
        >
        <span class="serach-span">
          您的检索：
          <span v-show="!isSearch" style="font-size:12px;color:#999"> 无 </span>
          <span style="font-size:12px;color:#999"> {{ searchVal }} </span>
        </span>
      </div>
      <div class="table-div">
        <el-table
          v-loading.body="loading"
          :data="tableData"
          border
          style="width: 100%"
          highlight-current-row
          @select="selectTable"
          @select-all="selectAll"
          :header-cell-style="{ background: '#f0f0f0' }"
        >
          >
          <el-table-column type="selection" width="40"> </el-table-column>
          <el-table-column label="序号" width="50" align="center">
            <template scope="scope"
              ><span>{{ scope.$index + 1 }}</span></template
            >
          </el-table-column>
          <el-table-column
            prop="M0008_HIGHSPEED_NAME"
            label="高速名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="M0009_LOAD_NAME" label="路段名称">
          </el-table-column>
          <el-table-column
            prop="M0018_COMPANY_NAME"
            show-overflow-tooltip
            label="管理单位"
          >
          </el-table-column>
          <el-table-column prop="M0009_PILENUMBER_NAME" label="桩号">
          </el-table-column>
          <el-table-column
            prop="M0009_PILENUMBER_DREICT"
            label="方向"
            :formatter="codeFmt"
          >
          </el-table-column>
          <el-table-column prop="M0009_PILENUMBER_PRECI" label="经度">
          </el-table-column>
          <el-table-column prop="M0009_PILENUMBER_LATI" label="纬度">
          </el-table-column>
          <el-table-column prop="M0009_PILENUMBER_YEAR" label="归属年份">
          </el-table-column>
          <el-table-column fixed="right" width="170" label="操作">
            <template slot-scope="scope">
              <el-button type="info" size="mini" @click="handleInfo(scope.row)"
                >查看</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
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
      </div>
    </div>
    <!-- 新建 -->
    <el-dialog
      title=">> 增加百米桩号配置"
      :visible.sync="addShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <el-form :model="addForm" :rules="rules" ref="addFormRef">
        <table class="add-table">
          <tr>
            <td class="bg-td">高速名称：</td>
            <td>
              <el-form-item prop="M0008_ID">
                <el-select
                  v-model="addForm.M0008_ID"
                  style="width:100%"
                  size="small"
                >
                  <el-option
                    v-for="item in highspeedList"
                    :key="item.M0008_ID"
                    :label="item.M0008_HIGHSPEED_NAME"
                    :value="item.M0008_ID"
                  ></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="bg-td">所属路段：</td>
            <td>
              <el-form-item prop="M0009_LOAD_NAME">
                <el-select
                  v-model="addForm.M0009_LOAD_NAME"
                  style="width:100%"
                  size="small"
                >
                  <el-option
                    v-for="item in loadList"
                    :key="item.M0010_LOAD_NAME"
                    :label="item.M0010_LOAD_NAME"
                    :value="item.M0010_LOAD_NAME"
                  ></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">桩号：</td>
            <td>
              <el-form-item prop="M0009_PILENUMBER_NAME">
                <el-input
                  v-model.trim="addForm.M0009_PILENUMBER_NAME"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">方向：</td>
            <td>
              <el-radio-group v-model="addForm.M0009_PILENUMBER_DREICT">
                <el-radio :label="1">上行线</el-radio>
                <el-radio :label="2">下行线</el-radio>
              </el-radio-group>
            </td>
          </tr>
          <tr>
            <td class="bg-td">经度：</td>
            <td>
              <el-form-item prop="M0009_PILENUMBER_PRECI">
                <el-input
                  v-model.trim="addForm.M0009_PILENUMBER_PRECI"
                  size="small"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">纬度：</td>
            <td>
              <el-form-item prop="M0009_PILENUMBER_LATI">
                <el-input
                  v-model.trim="addForm.M0009_PILENUMBER_LATI"
                  size="small"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">归属年份：</td>
            <td>
              <el-form-item prop="M0009_PILENUMBER_YEAR">
                <el-date-picker
                  v-model="addForm.M0009_PILENUMBER_YEAR"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
                  size="small"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSaveFun('ruleForm')"
          >确 认</el-button
        >
        <el-button @click="addShow = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      title=">> 修改百米桩号配置"
      :visible.sync="editShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <el-form :model="editForm" :rules="rules" ref="editFormRef">
        <table class="add-table">
          <tr>
            <td class="bg-td">高速名称：</td>
            <td>
              <el-form-item prop="M0008_ID">
                <el-select
                  v-model="editForm.M0008_ID"
                  style="width:100%"
                  size="small"
                >
                  <el-option
                    v-for="item in highspeedList"
                    :key="item.M0008_ID"
                    :label="item.M0008_HIGHSPEED_NAME"
                    :value="item.M0008_ID"
                  ></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="bg-td">所属路段：</td>
            <td>
              <el-form-item prop="M0009_LOAD_NAME">
                <el-select
                  v-model="editForm.M0009_LOAD_NAME"
                  style="width:100%"
                  size="small"
                >
                  <el-option
                    v-for="item in loadList"
                    :key="item.M0010_LOAD_NAME"
                    :label="item.M0010_LOAD_NAME"
                    :value="item.M0010_LOAD_NAME"
                  ></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">桩号：</td>
            <td>
              <el-form-item prop="M0009_PILENUMBER_NAME">
                <el-input
                  v-model.trim="editForm.M0009_PILENUMBER_NAME"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">方向：</td>
            <td>
              <el-radio-group v-model="editForm.M0009_PILENUMBER_DREICT">
                <el-radio :label="1">上行线</el-radio>
                <el-radio :label="2">下行线</el-radio>
              </el-radio-group>
            </td>
          </tr>
          <tr>
            <td class="bg-td">经度：</td>
            <td>
              <el-form-item prop="M0009_PILENUMBER_PRECI">
                <el-input
                  v-model.trim="editForm.M0009_PILENUMBER_PRECI"
                  size="small"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">纬度：</td>
            <td>
              <el-form-item prop="M0009_PILENUMBER_LATI">
                <el-input
                  v-model.trim="editForm.M0009_PILENUMBER_LATI"
                  size="small"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">归属年份：</td>
            <td>
              <el-form-item prop="M0009_PILENUMBER_YEAR">
                <el-date-picker
                  v-model="editForm.M0009_PILENUMBER_YEAR"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
                  size="small"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editSaveFun">确 认</el-button>
        <el-button @click="editShow = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog
      title=">> 查看百米桩号配置"
      :visible.sync="infoShow"
      custom-class="dialog-div"
    >
      <table class="add-table">
        <tr>
          <td class="bg-td">高速名称：</td>
          <td>
            {{ infoForm.M0008_HIGHSPEED_NAME }}
          </td>
          <td class="bg-td">所属路段：</td>
          <td>
            {{ infoForm.M0010_LOAD_NAME }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">桩号：</td>
          <td>
            {{ infoForm.M0009_PILENUMBER_NAME }}
          </td>
          <td class="bg-td">方向：</td>
          <td>
            {{ infoForm.M0009_PILENUMBER_DREICT }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">经度：</td>
          <td>
            {{ infoForm.M0009_PILENUMBER_PRECI }}
          </td>
          <td class="bg-td">纬度：</td>
          <td>
            {{ infoForm.M0009_PILENUMBER_LATI }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">归属年份：</td>
          <td>
            {{ infoForm.M0009_PILENUMBER_YEAR }}
          </td>
          <td></td>
          <td></td>
        </tr>
      </table>

      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    // 起点终点桩号
    const validPile = (rule, value, callback) => {
      let reg = /[0-9a-zA-Z]|[+,-]/ // 固定
      if (!reg.test(value)) {
        callback(new Error('桩号只能输入英文，数字，+，-'))
      } else {
        callback()
      }
    }
    // 经度正则表达式（-180 至 180）
    const validPreci = (rule, value, callback) => {
      let reg = /^-?((0|1?[0-8]?[0-9]?)(([.][0-9]{1,10})?)|180(([.][0]{1,10})?))$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的经度(-180 至 180)'))
      } else {
        callback()
      }
    }
    // 纬度正则表达式(-90 至 90)
    const validLati = (rule, value, callback) => {
      let reg = /^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,10})?)|90(([.][0]{1,10})?))$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的纬度(-90 至 90)'))
      } else {
        callback()
      }
    }
    return {
      loading: true,
      addShow: false,
      editShow: false,
      infoShow: false,
      editForm: {},
      addForm: {
        M0008_ID: '',
        M0009_LOAD_NAME: '',
        M0009_PILENUMBER_NAME: '',
        M0009_PILENUMBER_DREICT: 1,
        M0009_PILENUMBER_PRECI: '',
        M0009_PILENUMBER_LATI: '',
        M0009_PILENUMBER_YEAR: '',
      },
      rules: {
        M0008_ID: [
          { required: true, message: '请选择高速名称', trigger: 'change' },
        ],
        M0009_LOAD_NAME: [
          { required: true, message: '请选择所属路段', trigger: 'change' },
        ],
        M0009_PILENUMBER_NAME: [
          { required: true, message: '请填写桩号', trigger: 'change' },
          { validator: validPile, trigger: 'blur' },
        ],
        M0009_PILENUMBER_PRECI: [
          { required: true, message: '请填写经度', trigger: 'change' },
          { validator: validPreci, trigger: 'blur' },
        ],
        M0009_PILENUMBER_LATI: [
          { required: true, message: '请填写纬度', trigger: 'change' },
          { validator: validLati, trigger: 'blur' },
        ],
        M0009_PILENUMBER_YEAR: [
          {
            required: true,
            message: '请选择归属年份',
            trigger: 'change',
          },
        ],
      },
      infoForm: {},
      tableData: [],
      showCount: 10,
      currentPage: 1,
      total: 0,
      selectList: [],
      loadList: [],
      dataParam: {
        M0010_LOAD_NAME: '',
        M0010_START_PILE: '',
        M0010_END_PILE: '',
        YEAR: '',
        SEARCH_KEY: '',
      },
      pileList: [], // 桩好数组
      highspeedList: [], //
      isSearch: false,
      searchVal: '', // 搜索内容
    }
  },
  methods: {
    // 请求所有的起点 / 终点桩号
    assetDataFun() {
      this.$api.post('/cycle/load/listAll', {}, null, (r) => {
        this.pileList = r.data
      })
    },
    // 根据 所属路段 获取起点，终点桩号
    changeSelect(val) {
      let _data = {
        M0010_LOAD_NAME: val,
      }
      this.$api.post('/cycle/load/listAll', _data, null, (r) => {
        this.pileList = r.data
      })
    },
    // 搜索
    searchFun() {
      this.isSearch = true
      this.getPileList()
    },
    codeFmt(row) {
      return row.M0009_PILENUMBER_DREICT === '1' ? '上行线' : '下行线'
    },
    // 重置
    reset() {
      this.dataParam.M0010_LOAD_NAME = ''
      this.dataParam.M0010_START_PILE = ''
      this.dataParam.M0010_END_PILE = ''
      this.dataParam.YEAR = ''
      this.dataParam.SEARCH_KEY = ''
      this.isSearch = false
      this.pileList = []
      this.getPileList()
    },
    // 分页
    sizeChange(val) {
      this.showCount = val
      this.getPileList()
    },
    currentChange(val) {
      this.currentPage = val
      this.getPileList()
    },
    selectTable(selection) {
      this.selectList = selection
    },
    selectAll(selection) {
      this.selectList = selection
    },
    // 点击新增
    addFun() {
      this.addShow = true
      this.$nextTick(() => {
        this.$refs['addFormRef'].resetFields()
      })
      this.$api.post(`/cycle/utilData/getId`, {}, null, (r) => {
        this.addForm.M0009_ID = r.data
      })
    },
    // 添加保存
    addSaveFun() {
      this.$refs['addFormRef'].validate((valid) => {
        if (valid) {
          this.$api.post(
            '/cycle/pileNumber/insert',
            this.addForm,
            null,
            (r) => {
              this.$message.success('新增成功')
              this.addShow = false
              this.getPileList()
            }
          )
        }
      })
    },
    // 点击查看
    handleInfo(data) {
      this.infoShow = true
      if (data.M0009_PILENUMBER_DREICT === 1) {
        data.M0009_PILENUMBER_DREICT = '上行线'
      } else {
        data.M0009_PILENUMBER_DREICT = '下行线'
      }
      this.infoForm = Object.assign({}, data)
    },
    // 点击编辑
    handleEdit(data) {
      this.editShow = true
      this.$api.post(
        `/cycle/pileNumber/selectById?ID=${data.M0009_ID}`,
        {},
        null,
        (r) => {
          this.editForm = Object.assign({}, r.data)
        }
      )
    },
    // 修改保存
    editSaveFun() {
      this.$refs['editFormRef'].validate((valid) => {
        if (valid) {
          this.$api.post(
            '/cycle/pileNumber/update',
            this.editForm,
            null,
            (r) => {
              this.$message.success('修改成功')
              this.editShow = false
              this.getPileList()
            }
          )
        }
      })
    },
    // 点击删除
    handleDelete(data) {
      this.$confirm('确定要删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$api.post(
          `/cycle/pileNumber/deleteById?ID=${data.M0009_ID}`,
          {},
          null,
          (r) => {
            this.$message.success('删除成功')
            this.getPileList()
          }
        )
      })
    },
    // 请求 百米桩分页列表
    getPileList() {
      let _data = {
        currentPage: this.currentPage,
        showCount: this.showCount,
        searchMap: this.dataParam,
      }
      this.$api.post('/cycle/pileNumber/listPage', _data, null, (r) => {
        this.loading = false
        this.tableData = r.data.returnParam
        this.total = r.data.totalResult
        this.searchVal = r.search_val
      })
    },
    // 管辖路段接口
    getLoadList() {
      this.$api.post('/cycle/load/listLoadName', {}, null, (r) => {
        this.loadList = r.data
      })
    },
    // 选择高速下拉框 list
    getHighspeedList() {
      this.$api.post('/cycle/highspeed/listAll', {}, null, (r) => {
        this.highspeedList = r.data
      })
    },
    // 删除多个
    delListFun() {
      let _list = []
      if (this.selectList.length > 0) {
        for (let i = 0; i < this.selectList.length; i++) {
          _list.push(this.selectList[i].M0009_ID)
        }
        this.$confirm('确定要删除这些记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$api.post(
            `/cycle/pileNumber/deleteByIds?IDS=${_list}`,
            {},
            null,
            (r) => {
              this.$message.success('删除成功')
              this.getPileList()
              this.selectList = []
            }
          )
        })
      } else {
        this.$message.warning('请选择要删除的数据！')
      }
    },
  },
  created() {
    this.getHighspeedList()
    this.getLoadList()
    this.getPileList()
    this.assetDataFun()
  },
}
</script>
<style lang="scss">
.el-scrollbar__wrap {
  margin-bottom: 0 !important;
}
.meters-wrap {
  .el-dialog__header {
    background: #f5f5f5;
  }
  .title-p {
    margin-bottom: 10px;
    button {
      float: right;
    }
  }
  .content {
    background: #fff;
    padding: 30px 20px;
    .el-form-item {
      margin-bottom: 0;
    }
    .table-div {
      .el-button--mini {
        padding: 4px 5px;
      }
      // .el-input__inner {
      //   height: 36px !important;
      // }
    }
    .div-btn {
      margin: 10px 0;
    }
  }
  .serach-span {
    margin-left: 20px;
    span + span {
      margin-right: 10px;
    }
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
        padding: 15px 10px;
      }
    }
    .bg-td {
      background: #f0f0f0;
      text-align: center;
    }
  }
  .el-table {
    td,
    th {
      text-align: center;
    }
  }
  .dialog-div {
    width: 1000px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
