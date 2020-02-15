<template>
  <div class="meterspile-wrap">
    <p class="title-p">
      <span style="display:inline-block;margin-bottom:20px;"> >> 桩号展示 </span>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addFun"
      >新增桩号信息</el-button>
    </p>
    <div class="content">
      <el-row :gutter="10">
        <el-form
          label-position="right"
          label-width="70px"
          :model="meterspile"
        >
          <el-col :span="5">
            <el-form-item label="所属路段">
              <el-select
                v-model="meterspile.a"
                style="width:100%"
              >
                <el-option
                  v-for="item in assetList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="起点桩号">
              <el-select
                v-model="meterspile.code"
                style="width:100%"
              >
                <el-option
                  v-for="item in assetList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="终点桩号">
              <el-select
                v-model="meterspile.code1"
                style="width:100%"
              >
                <el-option
                  v-for="item in assetList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="年份选择">
              <el-date-picker
                style="width:100%"
                v-model="meterspile.year"
                type="year"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="关键字">
              <el-input
                placeholder="请输入关键字"
                v-model="meterspile.a"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="div-btn">
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
        <el-button
          type="primary"
          icon="el-icon-delete"
          @click="delListFun"
        >批量删除</el-button>
        <span class="serach-span"> 您的检索： <span> 无 </span> </span>
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
            label="路段名称"
          >
          </el-table-column>
          <el-table-column
            prop="M0008_HIGHSPEED_NUM"
            label="管理单位"
          >
          </el-table-column>
          <el-table-column
            prop="M0009_PILENUMBER_NAME"
            label="桩号"
          >
          </el-table-column>
          <el-table-column
            prop="M0009_PILENUMBER_DREICT"
            label="方向"
          >
          </el-table-column>
          <el-table-column
            prop="M0009_PILENUMBER_PRECI"
            label="经度"
          >
          </el-table-column>
          <el-table-column
            prop="M0009_PILENUMBER_LATI"
            label="纬度"
          >
          </el-table-column>
          <el-table-column
            prop="M0009_PILENUMBER_YEAR"
            label="归属年份"
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
                @click="handleInfo(scope.row)"
              >查看</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="handleEdit(scope.row)"
              >编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="table-page"
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="meterspile.currentPage"
          :page-sizes="[10, 50, 100]"
          :page-size="meterspile.showCount"
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
      <table class="add-table">
        <tr>
          <td class="bg-td">高速名称：</td>
          <td>
            <el-input
              v-model.trim="addForm.words"
              size="small"
            ></el-input>
          </td>
          <td class="bg-td">所属路段： </td>
          <td>
            <el-input
              v-model.trim="addForm.words"
              size="small"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">桩号： </td>
          <td>
            <el-input
              v-model.trim="addForm.words"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
          <td class="bg-td">方向：</td>
          <td>
            <el-radio-group v-model="addForm.d">
              <el-radio :label="1">上行线</el-radio>
              <el-radio :label="2">下行线</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td class="bg-td">经度： </td>
          <td>
            <el-input
              v-model.trim="addForm.words"
              size="small"
            ></el-input>
          </td>
          <td class="bg-td">纬度：</td>
          <td>
            <el-input
              v-model.trim="addForm.words"
              size="small"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">归属年份： </td>
          <td>
            <el-date-picker
              v-model="addForm.value3"
              type="year"
              placeholder="选择年"
              style="width: 100%"
            >
            </el-date-picker>
          </td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addShow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      title=">> 修改百米桩号配置"
      :visible.sync="editShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <table class="add-table">
        <tr>
          <td class="bg-td">高速名称：</td>
          <td>
            <el-input
              v-model.trim="editForm.words"
              size="small"
            ></el-input>
          </td>
          <td class="bg-td">所属路段： </td>
          <td>
            <el-input
              v-model.trim="editForm.words"
              size="small"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">桩号： </td>
          <td>
            <el-input
              v-model.trim="editForm.M0009_PILENUMBER_NAME"
              size="small"
              maxlength="20"
            ></el-input>
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
          <td class="bg-td">经度： </td>
          <td>
            <el-input
              v-model.trim="editForm.M0009_PILENUMBER_PRECI"
              size="small"
            ></el-input>
          </td>
          <td class="bg-td">纬度：</td>
          <td>
            <el-input
              v-model.trim="editForm.M0009_PILENUMBER_LATI"
              size="small"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">归属年份： </td>
          <td>
            <el-date-picker
              v-model="editForm.M0009_PILENUMBER_YEAR"
              type="year"
              placeholder="选择年"
              style="width: 100%"
            >
            </el-date-picker>
          </td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editShow = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
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
            {{ infoForm.words }}
          </td>
          <td class="bg-td">所属路段： </td>
          <td>
            {{ infoForm.words }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">桩号： </td>
          <td>
            {{ infoForm.M0009_PILENUMBER_NAME }}
          </td>
          <td class="bg-td">方向：</td>
          <td>
            {{ infoForm.M0009_PILENUMBER_DREICT }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">经度： </td>
          <td>
            {{ infoForm.M0009_PILENUMBER_PRECI }}
          </td>
          <td class="bg-td">纬度：</td>
          <td>
            {{ infoForm.M0009_PILENUMBER_LATI }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">归属年份： </td>
          <td>
            {{ infoForm.M0009_PILENUMBER_YEAR }}
          </td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <div
        slot="footer"
        class="dialog-footer"
      >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      assetList: [],
      loading: false,
      addShow: false,
      editShow: false,
      infoShow: false,
      editForm: {},
      addForm: {},
      infoForm: {},
      meterspile: {
        showCount: 10,
        currentPage: 1
      },
      tableData: [
        {
          M0009_PILENUMBER_NAME: 'K692+200',
          M0009_PILENUMBER_DREICT: 1,
          M0009_PILENUMBER_PRECI: '34.96355213',
          M0009_PILENUMBER_LATI: '34.96355213',
          M0009_PILENUMBER_YEAR: '2010'
        }
      ],
      total: 0,
      selectList: []
    }
  },
  methods: {
    // 分页
    sizeChange (val) {
      this.meterspile.showCount = val
    },
    currentChange (val) {
      this.meterspile.currentPage = val
    },
    selectTable (selection) {
      this.selectList = selection
    },
    selectAll (selection) {
      this.selectList = selection
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
    delListFun () {}
  }
}
</script>
<style lang="scss">
.meterspile-wrap {
  .title-p {
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
        padding: 4px 8px;
      }
    }
    .div-btn {
      margin: 10px 0;
    }
  }
  .serach-span {
    margin-left: 20px;
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
  .el-table {
    td,
    th {
      text-align: center;
    }
  }
  .dialog-div {
    width: 1000px;
  }
}
</style>
