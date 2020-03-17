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
        @click="addFun"
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
            prop="main"
            label="主类别"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="son"
            label="从属子类别"
            align="center"
          >
          <template slot-scope="scope">
           <div class="button_box" v-for="(item,index) of scope.row.son" :key="index">
              <span class="tip">{{item}}</span>
              <div class="buttons" v-if="scope.row.son.length>0">
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
              </div>
           </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="desc"
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
      title=">> 增加资产类别"
      :visible.sync="addShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <table class="add-table">
        <tr>
          <td class="bg-td">请选择类别</td>
          <td>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </td>
          <td class="bg-td">类别名称</td>
            <td>
              <el-input v-model.trim="addForm.words" size="small" maxlength="30" ></el-input>
            </td>
        <tr>
          <td class="bg-td">备注</td>
          <td colspan="10">
            <el-input
              type="textarea"
              :rows="10"
              v-model="addForm.desc"
              maxlength="2000"
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
      title=">> 修改资产类别"
      :visible.sync="editShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <table class="add-table">
        <tr>
          <td class="bg-td">请选择类别</td>
          <td>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </td>
          <td class="bg-td">类别名称</td>
            <td>
              <el-input v-model.trim="editForm.words" size="small" maxlength="30" ></el-input>
            </td>
        <tr>
          <td class="bg-td">备注</td>
          <td colspan="10">
            <el-input
              type="textarea"
              :rows="10"
              v-model="editForm.desc"
              maxlength="2000"
            ></el-input>
          </td>
        </tr>
      </table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editShow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog
      title=">> 查看资产类别"
      :visible.sync="infoShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <table class="add-table">
        <tr>
          <td class="bg-td">请选择类别</td>
          <td>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </td>
          <td class="bg-td">类别名称</td>
            <td>
              <el-input v-model.trim="infoForm.words" size="small" maxlength="30" ></el-input>
            </td>
        <tr>
          <td class="bg-td">备注</td>
          <td colspan="10">
            <el-input
              type="textarea"
              :rows="10"
              v-model="infoShow.desc"
              maxlength="2000"
            ></el-input>
          </td>
        </tr>
      </table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="infoShow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >确 定</el-button>
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
          main: '交通安全设施',
          son: ['装饰型排水沟', '混合型排水沟', '功能型排水沟'],
          desc: '无'
        },
        {
          main: '排水沟',
          son: '',
          desc: '无'
        },
        {
          main: '标志牌',
          son: '',
          desc: '无'
        },
        {
          main: '桥梁',
          son: ['特大桥', '大桥', '中桥', '小桥'],
          desc: '无'
        }
      ],
      higway: {
        showCount: 10,
        currentPage: 1
      },
      total: 0,
      selectList: [],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
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
  .tip{
    width:60%;
    display: inline-block;
    text-align: center;
    // float: left;
  }
  .buttons{
    // float: right;
    position:absolute;
    top:-2px;
    left:250px;
  }
}
</style>
