/*
 * @Author: liuhaosheng
 * @Description：高速管理
 */
<template>
  <div class="higway-wrap">
    <p class="title-p">
      <span style="display:inline-block;margin-bottom:20px;"> >> 高速管理 </span>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addFun"
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
            v-model="higway.a"
            style="width:240px"
          >
          </el-input>
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </p>
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
            prop="M0008_IS_ACTIVE"
            label="是否激活"
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
      title=">> 增加高速信息"
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
              maxlength="50"
            ></el-input>
          </td>
          <td class="bg-td">简称： </td>
          <td>
            <el-input
              v-model.trim="addForm.words"
              size="small"
              maxlength="30"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">编号： </td>
          <td>
            <el-input
              v-model.trim="addForm.words"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
          <td class="bg-td">里程（公里）：</td>
          <td>
            <el-input
              v-model.trim="addForm.words"
              size="small"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">起点： </td>
          <td>
            <el-input
              v-model.trim="addForm.words"
              size="small"
              maxlength="30"
            ></el-input>
          </td>
          <td class="bg-td">终点：</td>
          <td>
            <el-input
              v-model.trim="addForm.words"
              size="small"
              maxlength="30"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">起点桩号： </td>
          <td>
            <el-input
              v-model.trim="addForm.words"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
          <td class="bg-td">终点桩号：</td>
          <td>
            <el-input
              v-model.trim="addForm.words"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">是否激活：</td>
          <td colspan="3">
            <el-switch
              v-model="addForm.M0008_IS_ACTIVE"
              active-color="#2196f3"
              inactive-color="#dddddd"
            >
            </el-switch>
          </td>
        </tr>
        <tr>
          <td class="bg-td">费用况详情（备注）：</td>
          <td colspan="3">
            <el-input
              type="textarea"
              v-model="addForm.desc"
              maxlength="500"
            ></el-input>
          </td>
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
      title=">> 修改高速信息"
      :visible.sync="editShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <table class="add-table">
        <tr>
          <td class="bg-td">高速名称：</td>
          <td>
            <el-input
              v-model.trim="editForm.M0008_HIGHSPEED_NAME"
              size="small"
              maxlength="50"
            ></el-input>
          </td>
          <td class="bg-td">简称： </td>
          <td>
            <el-input
              v-model.trim="editForm.M0008_HIGHSPEED_ABBR"
              size="small"
              maxlength="30"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">编号： </td>
          <td>
            <el-input
              v-model.trim="editForm.M0008_HIGHSPEED_NUM"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
          <td class="bg-td">里程（公里）：</td>
          <td>
            <el-input
              v-model.trim="editForm.M0008_HIGHSPEED_KILO"
              size="small"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">起点： </td>
          <td>
            <el-input
              v-model.trim="editForm.M0008_START_POINT"
              size="small"
              maxlength="30"
            ></el-input>
          </td>
          <td class="bg-td">终点：</td>
          <td>
            <el-input
              v-model.trim="editForm.M0008_END_POINT"
              size="small"
              maxlength="30"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">起点桩号： </td>
          <td>
            <el-input
              v-model.trim="editForm.M0008_START_PILE"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
          <td class="bg-td">终点桩号：</td>
          <td>
            <el-input
              v-model.trim="editForm.M0008_END_PILE"
              size="small"
              maxlength="20"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td class="bg-td">是否激活：</td>
          <td colspan="3">
            <el-switch
              v-model="editForm.M0008_IS_ACTIVE"
              active-color="#2196f3"
              inactive-color="#dddddd"
            >
            </el-switch>
          </td>
        </tr>
        <tr>
          <td class="bg-td">费用况详情（备注）：</td>
          <td colspan="3">
            <el-input
              type="textarea"
              v-model="editForm.M0008_HIGHSPEED_REMARK"
              maxlength="500"
            ></el-input>
          </td>
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
    <!-- 查看 -->
    <el-dialog
      title=">> 查看高速信息"
      :visible.sync="infoShow"
      custom-class="dialog-div"
    >
      <table class="add-table">
        <tr>
          <td class="bg-td">高速名称：</td>
          <td>
            {{ infoForm.M0008_HIGHSPEED_NAME }}
          </td>
          <td class="bg-td">简称： </td>
          <td>
            {{ infoForm.M0008_HIGHSPEED_ABBR }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">编号： </td>
          <td>
            {{ infoForm.M0008_HIGHSPEED_NUM }}
          </td>
          <td class="bg-td">里程（公里）：</td>
          <td>
            {{ infoForm.M0008_HIGHSPEED_KILO }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">起点： </td>
          <td>
            {{ infoForm.M0008_START_POINT }}
          </td>
          <td class="bg-td">终点：</td>
          <td>
            {{ infoForm.M0008_END_POINT }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">起点桩号： </td>
          <td>
            {{ infoForm.M0008_START_PILE }}
          </td>
          <td class="bg-td">终点桩号：</td>
          <td>
            {{ infoForm.M0008_END_PILE }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">是否激活：</td>
          <td colspan="3">
            {{ infoForm.M0008_IS_ACTIVE }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">费用况详情（备注）：</td>
          <td colspan="3">
            {{ infoForm.M0008_HIGHSPEED_REMARK }}
          </td>
        </tr>
      </table>
      <div slot="footer">
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      addShow: false,
      editShow: false,
      infoShow: false,
      editForm: {},
      addForm: {},
      infoForm: {},
      tableData: [
        {
          M0008_HIGHSPEED_NAME: '连云港－霍尔果斯高速公路',
          M0008_HIGHSPEED_ABBR: '连霍高速',
          M0008_HIGHSPEED_NUM: 'G30',
          M0008_START_POINT: '连云港',
          M0008_END_POINT: '霍尔果斯',
          M0008_HIGHSPEED_KILO: '4395',
          M0008_IS_ACTIVE: true,
          M0008_START_PILE: 'K291+000',
          M0008_END_PILE: 'K900+960'
        }
      ],
      higway: {
        showCount: 10,
        currentPage: 1
      },
      total: 0,
      selectList: []
    }
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
      .el-button--mini {
        padding: 4px 8px;
      }
    }
  }
  .p-search {
    margin-left: 20px;
    display: inline-block;
    width: 600px;
    .el-button--primary {
      margin-left: 10px;
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
