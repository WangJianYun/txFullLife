/* * @Description 技术类别列表 */
<template>
  <div class="higway-wrap">
    <p class="title-p">
      <span style="display:inline-block;margin-bottom:20px;">
        >> 技术类别管理
      </span>
      <el-button type="primary" icon="el-icon-plus" @click="openDialog('add')"
        >增加技术类别</el-button
      >
    </p>
    <div class="content">
      <div>
        <el-button type="primary" icon="el-icon-delete" @click="delListFun"
          >批量删除</el-button
        >
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
            prop="T0001_ASSETTYPE_NAME"
            label="资产类别名称"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column prop="CHILD" label="技术等级类别" align="center">
            <template slot-scope="scope">
              <div
                class="button_box"
                v-for="(item, index) of scope.row.CHILD"
                :key="index"
              >
                <span class="tip">{{ item.T0006_TECHTYPE_NAME }}</span>
                <div class="buttons" v-if="scope.row.CHILD.length > 0">
                  <el-button
                    type="info"
                    size="mini"
                    @click="openDialog('look', item)"
                    >查看</el-button
                  >
                  <el-button
                    type="primary"
                    size="mini"
                    @click="openDialog('edit', item)"
                    >编辑</el-button
                  >
                  <el-button type="danger" size="mini" @click="deleteRow(item)"
                    >删除</el-button
                  >
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="备注" align="center">
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
                @click="openDialog('look', scope.row)"
                >查看</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="openDialog('edit', scope.row)"
                >编辑</el-button
              >
              <el-button type="danger" size="mini" @click="deleteRow(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          class="table-page"
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="higway.currentPage"
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
      <el-form :model="form" ref="form">
        <table class="add-table">
          <tr>
            <td class="bg-td">请选择资产类别</td>
            <td>
              <el-select v-model="form.T0001_ID" placeholder="请选择">
                <el-option
                  v-for="item in mainData"
                  :key="item.T0001_ID"
                  :label="item.T0001_ASSETTYPE_NAME"
                  :value="item.T0001_ID"
                >
                </el-option>
              </el-select>
            </td>
            <td class="bg-td">技术等级名称</td>
            <td>
              <el-input
                v-model.trim="form.T0006_TECHTYPE_NAME"
                size="small"
                maxlength="30"
              ></el-input>
            </td>
          </tr>

          <tr>
            <td class="bg-td">检测年限约定</td>
            <td>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select
              >年
            </td>
          </tr>
          <tr>
            <td class="bg-td">备注</td>
            <td colspan="10">
              <el-input
                type="textarea"
                :rows="10"
                v-model="form.T0006_TECHTYPE_REMARK"
                maxlength="2000"
              ></el-input>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button>
        <el-button @click="resetDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogName: '新增技术类别',
      loading: false,
      addShow: false,
      dpData: [],
      assetData: [],
      islook: false,
      isChoose: false,
      form: {
        M0018_ID: '',
        T0006_CHECK_YEAR: 1,
        T0006_ID: '',
        T0001_ID: '',
        T0001_ASSETTYPE_NAME: '',
        T0006_TECHTYPE_REMARK: '',
        T0006_TECHTYPE_NAME: ''
      },
      dpData: [],
      mainData: [],
      editForm: {},
      addForm: {},
      infoForm: {},
      tableData: [
        {
          main: '桥梁',
          son: ['一类', '二类', '三类', '四类', '五类'],
          desc: '无'
        },
        {
          main: '隧道',
          son: ['一级', '二级', '三级'],
          desc: '无'
        },
        {
          main: '涵洞',
          son: ['好', '较好', '差', '较差', '危险'],
          desc: '无'
        },
        {
          main: '互通式立交',
          son: '',
          desc: '无'
        }
      ],
      higway: {
        showCount: 10,
        currentPage: 1
      },
      total: 0,
      selectList: [],
      options: [
        {
          value: '选项1',
          label: '1'
        },
        {
          value: '选项2',
          label: '2'
        },
        {
          value: '选项3',
          label: '3'
        },
        {
          value: '选项4',
          label: '4'
        },
        {
          value: '选项5',
          label: '5'
        }
      ],
      value: ''
    }
  },
  mounted() {
    this.refreshTable()
    this.getAllData()
  },
  methods: {
    // 分页
    sizeChange(val) {
      this.higway.showCount = val
    },
    currentChange(val) {
      this.higway.currentPage = val
    },
    selectTable(selection) {
      this.selectList = selection
    },
    selectAll(selection) {
      this.selectList = selection
    },
    // 分组处理
    grouping(list) {
      this.dpData = []
      list.forEach(v => {
        let current
        this.dpData.forEach(v1 => {
          if (v['T0001_ID'] == v1['T0001_ID']) {
            current = v1
          }
        })
        // 如果'CHILD'已存在则push, 如果不存在, 则初始化并添加
        if (current) {
          current['CHILD'].push(v)
        } else {
          this.dpData.push({
            T0001_ID: v['T0001_ID'],
            T0006_ID: v['T0006_ID'],
            T0001_ASSETTYPE_NAME: v['T0001_ASSETTYPE_NAME'],
            T0006_TECHTYPE_REMARK: v['T0006_TECHTYPE_REMARK'],
            CHILD: [v]
          })
        }
      })
      return this.dpData
    },
    // 列表页
    refreshTable() {
      this.form.M0018_ID = sessionStorage.getItem('id')
      this.$api.post(
        '/cycle/techType/listAll',
        { M0018_ID: this.form.M0018_ID },
        null,
        r => {
          this.grouping(r.data)
        }
      )
    },
    // 选择资产类别数据
    getAllData() {
      this.$api.post(
        '/cycle/assetType/listAll',
        { M0018_ID: this.form.M0018_ID },
        null,
        r => {
          this.mainData = r.data.filter(
            v => v.T0001_PID === '0' || v.T0001_PID === 0
          ) // 选择框的数据
        }
      )
    },
    // 关闭弹窗
    closeDialog() {
      this.$refs['form'].resetFields()
      this.addShow = false
      this.islook = false
      this.isChoose = false
      this.form = {}
      this.refreshTable()
    },
    resetDialog() {
      this.addShow = false
      this.$refs['form'].resetFields()
      this.closeDialog()
    },
    openDialog(type, row) {
      if (type === 'add') {
        this.addShow = true
        this.dialogName = '新增技术类别'
        this.dialogType = 'new'
        this.$api.post(`/cycle/utilData/getId`, {}, null, r => {
          this.form.T0006_ID = r.data
        })
      }
      if (type === 'edit') {
        if (row.T0001_ID === '0' || row.T0001_ID === 0) {
          row.T0001_ID = ''
          this.isChoose = true
        }
        this.addShow = true
        this.dialogName = '编辑技术类别'
        this.form = row
        this.dialogType = 'edit'
      }
      if (type === 'look') {
        if (row.T0001_ID === '0' || row.T0001_ID === 0) {
          row.T0001_ID = ''
        }
        this.addShow = true
        this.dialogName = '查看技术类别'
        this.form = row
        this.islook = true
        this.isChoose = true
        this.dialogType = 'look'
      }
    },
    save() {
      this.form.M0018_ID = sessionStorage.getItem('id')
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.dialogType === 'new') {
            if (this.form.T0001_ID === '') {
              this.form.T0001_ID = '0'
            }
            this.$api.post(
              '/cycle/techType/insert',
              this.form,
              '新增成功',
              r => {
                this.closeDialog()
                this.refreshTable()
              }
            )
          }
          if (this.dialogType === 'edit') {
            if (this.form.T0001_PID === '') {
              this.form.T0001_PID = '0'
            }
            this.$api.post(
              '/cycle/techType/update',
              this.form,
              '编辑成功',
              r => {
                this.closeDialog()
              }
            )
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
    // 单条删除
    deleteRow(row) {
      console.log(row)
      this.$confirm('确认删除？此操作不可取消', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.post(
            '/cycle/techType/deleteById?ID=' + row.T0006_ID,
            {},
            '删除成功',
            r => {
              this.refreshTable()
            }
          )
        })
        .catch(() => {})
    },
    // 批量删除
    delListFun() {
      let _list = []
      if (this.selectList.length > 0) {
        for (let i = 0; i < this.selectList.length; i++) {
          _list.push(this.selectList[i].T0006_ID)
        }
        this.$confirm('确定要删除这些记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post(
            `/cycle/techType/deleteByIds?IDS=${_list}`,
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
    },
    addFun() {
      this.addShow = true
    },
    handleInfo(data) {
      console.log(data)
      this.infoShow = true
      this.infoForm = Object.assign({}, data)
    },
    handleEdit(data) {
      this.editShow = true
      this.editForm = Object.assign({}, data)
    },
    handleDelete(data) {}
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
  .button_box {
    border: 1px solid #999;
    margin: 2px;
    text-align: start;
    position: relative;
  }
  .tip {
    width: auto;
    padding-left: 10%;
    display: inline-block;
    text-align: center;
    // float: left;
  }
  .buttons {
    float: right;
    // position:absolute;
    // top:-2px;
    // left:250px;
  }
}
</style>
