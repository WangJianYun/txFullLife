/*
 * @Author: liuhaosheng
 * @Description：历年费用收支详情
 */
<template>
  <div id="yhCostMap">
    <p class="title-p">
      <span style="display:inline-block;margin-bottom:20px;">>> 历年费用收支详情</span>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addFun"
      >增加养护费用收支</el-button>
    </p>
    <div class="content">
      <el-row :gutter="20">
        <el-form
          label-position="right"
          label-width="80px"
          :model="searchMap"
        >
          <el-col :span="4">
            <el-form-item label="资产类别">
              <el-select
                v-model="searchMap.T0001_ID"
                style="width:100%"
                @change="changeSelect"
              >
                <el-option
                  v-for="item in assetTypeList"
                  :key="item.T0001_ID"
                  :label="item.T0001_ASSETTYPE_NAME"
                  :value="item.T0001_ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="养护工程">
              <el-select
                v-model="searchMap.T0005_ENGIN_MAINT"
                style="width:100%"
              >
                <el-option
                  v-for="item in projectList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="起点桩号">
              <el-select
                v-model="searchMap.T0002_START_PILE"
                style="width:100%"
              >
                <el-option
                  v-for="item in pileList"
                  :key="item.T0002_ID"
                  :label="item.T0002_START_PILE"
                  :value="item.T0002_START_PILE"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="终点桩号">
              <el-select
                v-model="searchMap.T0002_END_PILE"
                style="width:100%"
              >
                <el-option
                  v-for="item in pileList"
                  :key="item.T0002_ID"
                  :label="item.T0002_END_PILE"
                  :value="item.T0002_END_PILE"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="起止日期">
              <el-date-picker
                style="width:100%"
                v-model="searchMap.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="div-btn">
        <el-button
          type="primary"
          @click="searchFun"
        >搜索</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button
          type="primary"
          icon="el-icon-delete"
          @click="delListFun"
        >批量删除</el-button>
        <span class="serach-span"> 您的检索：
          <span v-show="!isSearch"> 无 </span>
          <span> {{searchVal}} </span>
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
            prop="T0002_ASSET_NAME"
            label="资产名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="T0001_ASSETTYPE_NAME"
            label="资产类别"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="T0005_COSTBUDGET_MONEY"
            label="费用（万元）"
          >
          </el-table-column>
          <el-table-column
            prop="T0005_ENGIN_MAINT"
            label="养护工程"
            :formatter="enginFmt"
          >
          </el-table-column>
          <el-table-column
            prop="T0002_START_PILE"
            label="起点桩号"
          >
          </el-table-column>
          <el-table-column
            prop="T0002_END_PILE"
            label="终点桩号"
          >
          </el-table-column>
          <el-table-column
            prop="T0002_LOAD_NAME"
            label="所属路段"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="T0005_COSTBUDGET_TIME"
            label="费用发生时间"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="票据查看"
            align="center"
            width="80"
          >
            <template slot-scope="scope">
              <el-image
                style="width: 50px; height: 18px"
                :src="scope.row.pic"
                :preview-src-list="scope.row.srcList"
              >
                <div
                  slot="error"
                  class="image-slot"
                >
                  无
                </div>
              </el-image>
            </template>
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
          :current-page="currentPage"
          :page-sizes="[10, 50, 100]"
          :page-size="showCount"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!--  新增 -->
    <el-dialog
      title=">> 养护费用收支录入"
      :visible.sync="addShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <el-row :gutter="10">
        <el-form
          label-position="right"
          label-width="80px"
          :model="addSearch"
        >
          <el-col :span="5">
            <el-form-item label="资产类别">
              <el-select
                v-model="addSearch.T0001_ID"
                style="width:100%"
                @change="addSearchChange"
              >
                <el-option
                  v-for="item in assetTypeList"
                  :key="item.T0001_ID"
                  :label="item.T0001_ASSETTYPE_NAME"
                  :value="item.T0001_ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="起点桩号">
              <el-select
                v-model="addSearch.T0002_START_PILE"
                style="width:100%"
              >
                <el-option
                  v-for="item in searchPileList"
                  :key="item.T0002_ID"
                  :label="item.T0002_START_PILE"
                  :value="item.T0002_START_PILE"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="终点桩号">
              <el-select
                v-model="addSearch.T0002_END_PILE"
                style="width:100%"
              >
                <el-option
                  v-for="item in searchPileList"
                  :key="item.T0002_ID"
                  :label="item.T0002_END_PILE"
                  :value="item.T0002_END_PILE"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="关键字">
              <el-input v-model.trim="addSearch.SEARCH_KEY"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button
              type="primary"
              @click="addSearchFun"
            >搜索</el-button>
            <el-button @click="addReset">重置</el-button>
          </el-col>
        </el-form>
      </el-row>
      <p> 您的检索：<span v-show="!isAddSearch"> 无 </span>
        <span> {{addSearchVal}} </span> </p>
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addFormRef"
      >
        <table class="add-table">
          <tr>
            <td class="bg-td">请选择资产：</td>
            <td>
              <el-form-item prop="T0002_ID">
                <el-select
                  v-model="addForm.T0002_ID"
                  style="width:100%"
                  size="small"
                >
                  <el-option
                    v-for="item in assetDataList"
                    :key="item.T0002_ID"
                    :label="item.T0002_ASSET_NAME"
                    :value="item.T0002_ID"
                  ></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="bg-td">金额（万元）： </td>
            <td>
              <el-form-item prop="T0005_COSTBUDGET_MONEY">
                <el-input
                  v-model.trim="addForm.T0005_COSTBUDGET_MONEY"
                  size="small"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">养护工程选择： </td>
            <td>
              <el-form-item prop="T0005_ENGIN_MAINT">
                <el-select
                  v-model="addForm.T0005_ENGIN_MAINT"
                  style="width:100%"
                  size="small"
                >
                  <el-option
                    v-for="item in projectList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="bg-td">工程时间区间：</td>
            <td>
              <el-form-item prop="time">
                <el-date-picker
                  size="small"
                  style="width:100%"
                  v-model="addForm.time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">票据上传：</td>
            <td colspan="3">
              <el-upload
                class="avatar-uploader"
                :headers="header"
                accept="image/*"
                name="image"
                :on-change="imgChange"
                action
                :show-file-list="false"
                :auto-upload="false"
                style="display: inline"
              >
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  class="avatar"
                />
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
              <ul class="ul-img">
                <li
                  class="avatar-uploader"
                  v-for="(item, index) in  imageList"
                  :key="index"
                >
                  <img
                    :src="item.FILE_URL"
                    class="el-upload avatar"
                  />
                  <span class="actions-item">
                    <span>
                      <i
                        class="el-icon-zoom-in"
                        @click.stop="clickImgFun(item)"
                      ></i>
                    </span>
                    <span>
                      <i
                        class="el-icon-delete"
                        @click.stop="clickDeleteFun(item)"
                      ></i>
                    </span>
                  </span>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td class="bg-td">费用况详情（备注）：</td>
            <td colspan="3">
              <el-form-item prop="T0005_COSTBUDGET_REMARK">
                <el-input
                  type="textarea"
                  v-model="addForm.T0005_COSTBUDGET_REMARK"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addShow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addSaveFun"
        >保 存</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      title=">> 修改养护费用收支"
      :visible.sync="editShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <el-row :gutter="10">
        <el-form
          label-position="right"
          label-width="80px"
          :model="addSearch"
        >
          <el-col :span="5">
            <el-form-item label="资产类别">
              <el-select
                v-model="addSearch.T0001_ID"
                style="width:100%"
                @change="addSearchChange"
              >
                <el-option
                  v-for="item in assetTypeList"
                  :key="item.T0001_ID"
                  :label="item.T0001_ASSETTYPE_NAME"
                  :value="item.T0001_ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="起点桩号">
              <el-select
                v-model="addSearch.T0002_START_PILE"
                style="width:100%"
              >
                <el-option
                  v-for="item in searchPileList"
                  :key="item.T0002_ID"
                  :label="item.T0002_START_PILE"
                  :value="item.T0002_START_PILE"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="终点桩号">
              <el-select
                v-model="addSearch.T0002_END_PILE"
                style="width:100%"
              >
                <el-option
                  v-for="item in searchPileList"
                  :key="item.T0002_ID"
                  :label="item.T0002_END_PILE"
                  :value="item.T0002_END_PILE"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="关键字">
              <el-input v-model.trim="addSearch.SEARCH_KEY"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button
              type="primary"
              @click="addSearchFun"
            >搜索</el-button>
            <el-button @click="addReset">重置</el-button>
          </el-col>
        </el-form>
      </el-row>
      <p> 您的检索： <span v-show="!isAddSearch"> 无 </span>
        <span> {{addSearchVal}} </span> </p>
      <el-form
        :model="editForm"
        :rules="rules"
        ref="editFormRef"
      >
        <table class="add-table">
          <tr>
            <td class="bg-td">请选择资产：</td>
            <td>
              <el-form-item prop="T0002_ID">
                <el-select
                  v-model="editForm.T0002_ID"
                  style="width:100%"
                  size="small"
                >
                  <el-option
                    v-for="item in assetDataList"
                    :key="item.T0002_ID"
                    :label="item.T0002_ASSET_NAME"
                    :value="item.T0002_ID"
                  ></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="bg-td">金额（万元）： </td>
            <td>
              <el-form-item prop="T0005_COSTBUDGET_MONEY">
                <el-input
                  v-model.trim="editForm.T0005_COSTBUDGET_MONEY"
                  size="small"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">养护工程选择： </td>
            <td>
              <el-form-item prop="T0005_ENGIN_MAINT">
                <el-select
                  v-model="editForm.T0005_ENGIN_MAINT"
                  style="width:100%"
                  size="small"
                >
                  <el-option
                    v-for="item in projectList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="bg-td">工程时间区间：</td>
            <td>
              <el-form-item prop="time">
                <el-date-picker
                  size="small"
                  style="width:100%"
                  v-model="editForm.time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">票据上传：</td>
            <td colspan="3">
              <el-upload
                class="avatar-uploader"
                :headers="header"
                accept="image/*"
                name="image"
                :on-change="imgChange"
                action
                :show-file-list="false"
                :auto-upload="false"
                style="display: inline"
              >
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  class="avatar"
                />
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
              <ul class="ul-img">
                <li
                  class="avatar-uploader"
                  v-for="(item, index) in  imageList"
                  :key="index"
                >
                  <img
                    :src="item.FILE_URL"
                    class="el-upload avatar"
                  />
                  <span class="actions-item">
                    <span>
                      <i
                        class="el-icon-zoom-in"
                        @click.stop="clickImgFun(item)"
                      ></i>
                    </span>
                    <span>
                      <i
                        class="el-icon-delete"
                        @click.stop="clickDeleteFun(item)"
                      ></i>
                    </span>
                  </span>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td class="bg-td">费用况详情（备注）：</td>
            <td colspan="3">
              <el-input
                type="textarea"
                v-model="editForm.T0005_COSTBUDGET_REMARK"
              ></el-input>
            </td>
          </tr>
        </table>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editShow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editSaveFun"
        >保 存</el-button>
      </div>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog
      title="查看养护费用收支"
      :visible.sync="infoShow"
      custom-class="dialog-div"
    >
      <table class="add-table">
        <tr>
          <td class="bg-td">资产名称：</td>
          <td>
            {{ infoForm.T0002_ASSET_NAME }}
          </td>
          <td class="bg-td">金额（万元）： </td>
          <td>
            {{ infoForm.T0005_COSTBUDGET_MONEY }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">养护工程： </td>
          <td>
            {{ infoForm.T0005_ENGIN_MAINT }}
          </td>
          <td class="bg-td">工程时间区间：</td>
          <td>
            {{ infoForm.T0005_START_TIME}} ——— {{ infoForm.T0005_END_TIME}}
          </td>
        </tr>
        <tr>
          <td class="bg-td">票据</td>
          <td colspan="3">
            <ul class="ul-img">
              <li
                class="avatar-uploader"
                v-for="(item, index) in  imageList"
                :key="index"
              >
                <img
                  :src="item.FILE_URL"
                  class="el-upload avatar"
                />
                <span class="actions-item">
                  <span>
                    <i
                      class="el-icon-zoom-in"
                      @click.stop="clickImgFun(item)"
                    ></i>
                  </span>
                </span>
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td class="bg-td">费用况详情（备注）：</td>
          <td colspan="3">
            {{ infoForm.T0005_COSTBUDGET_REMARK }}
          </td>
        </tr>
      </table>
    </el-dialog>
    <!-- 图片预览 -->
    <el-dialog
      :visible.sync="imgShow"
      title="图片预览"
    >
      <div style="text-align: center;">
        <el-image :src="imgShowUrl">
          <div
            slot="placeholder"
            class="image-slot"
          >
            加载中<span class="dot">...</span>
          </div>
          <div
            slot="error"
            class="image-slot"
          >
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    const validNum = (rule, value, callback) => {
      let reg = /^\d+.?\d{0,2}$/
      if (!reg.test(value)) {
        callback(new Error('金额不能是负数并且小数点后最多两位'))
      } else {
        callback()
      }
    }
    return {
      imageList: [],
      imgShow: false,
      imgShowUrl: '', // 预览图片
      imageUrl: '',
      header: {
        TokenId: sessionStorage.getItem('TokenId') // 上传文件token
      },
      dataParams: {
        ID: '',
        TABLE_NAME: 'COST_BUDGET'
      },
      addShow: false,
      editShow: false,
      infoShow: false,
      loading: true,
      selectList: [],
      addForm: {
        T0002_ID: '',
        T0005_COSTBUDGET_MONEY: '',
        T0005_ENGIN_MAINT: '',
        T0005_START_TIME: '',
        T0005_END_TIME: '',
        T0005_COSTBUDGET_REMARK: '',
        time: []
      },
      // 表单验证规则
      rules: {
        T0002_ID: [
          { required: true, message: '请选择资产', trigger: 'change' }
        ],
        T0005_COSTBUDGET_MONEY: [
          { required: true, message: '请填写金额', trigger: 'change' },
          { validator: validNum, trigger: 'blur' }
        ],
        T0005_ENGIN_MAINT: [
          { required: true, message: '请选择养护工程', trigger: 'change' }
        ],
        time: [
          {
            required: true,
            message: '请选择起止时间',
            trigger: 'blur',
            type: 'array'
          }
        ]
      },
      addSearch: {
        T0001_ID: '',
        SEARCH_KEY: '',
        T0002_START_PILE: '',
        T0002_END_PILE: ''
      },
      editSearch: {
        T0001_ID: '',
        SEARCH_KEY: ''
      },
      editForm: {},
      infoForm: {},
      rulesForm: {},
      showCount: 10,
      currentPage: 1,
      total: 0,
      searchMap: {
        T0001_ID: '',
        T0005_ENGIN_MAINT: '',
        time: [],
        T0005_START_TIME: '',
        T0005_END_TIME: '',
        T0002_START_PILE: '',
        T0002_END_PILE: ''
      },
      projectList: [
        {
          code: 1,
          name: '日常养护'
        },
        {
          code: 2,
          name: '小修保养'
        },
        {
          code: 3,
          name: '中修工程'
        },
        {
          code: 4,
          name: '大修工程'
        }
      ],
      tableData: [],
      assetTypeList: [], // 资产类别
      assetDataList: [],
      pileList: [], // 起点，终点桩号 list
      searchPileList: [], // 新增/修改的 起点，终点桩号 list
      searchVal: '', // 搜索内容
      isSearch: false, // 列表是否搜索
      addSearchVal: '', // 新建 修改搜索内容
      isAddSearch: false // 新建 修改 是否搜索
    }
  },
  methods: {
    // 请求所有的起点 / 终点桩号
    assetDataFun () {
      this.$api.post('/cycle/assetData/listAll', {}, null, r => {
        this.pileList = r.data
      })
    },
    // 根据 资产类别 请求 起点 / 终点桩号
    changeSelect (val) {
      let _data = {
        T0001_ID: val
      }
      this.searchMap.T0002_START_PILE = ''
      this.searchMap.T0002_END_PILE = ''
      this.$api.post('/cycle/assetData/listAll', _data, null, r => {
        this.pileList = r.data
      })
    },
    // 搜索
    searchFun () {
      this.isSearch = true
      this.getCostBudgetList()
    },
    // 重置
    reset () {
      this.isSearch = false
      this.pileList = []
      this.searchMap.T0001_ID = ''
      this.searchMap.T0005_ENGIN_MAINT = ''
      this.searchMap.T0005_START_TIME = ''
      this.searchMap.T0005_END_TIME = ''
      this.searchMap.T0002_START_PILE = ''
      this.searchMap.T0002_END_PILE = ''
      this.searchMap.time = []
      this.showCount = 10
      this.currentPage = 1
      this.getCostBudgetList()
    },
    enginFmt (row) {
      for (let i = 0; i < this.projectList.length; i++) {
        if (this.projectList[i].code === row.T0005_ENGIN_MAINT) {
          return this.projectList[i].name
        }
      }
    },
    // 分页
    sizeChange (val) {
      this.showCount = val
      this.getCostBudgetList()
    },
    currentChange (val) {
      this.currentPage = val
      this.getCostBudgetList()
    },
    selectTable (selection) {
      this.selectList = selection
    },
    selectAll (selection) {
      this.selectList = selection
    },
    addFun () {
      this.imageUrl = ''
      this.dataParams.ID = ''
      this.imageList = []
      this.addShow = true
      this.addReset()
      this.$nextTick(() => {
        this.$refs['addFormRef'].resetFields()
      })
      this.$api.post(`/cycle/utilData/getId`, {}, null, r => {
        this.dataParams.ID = r.data
        this.addForm.T0005_ID = r.data
      })
      this.$api.post('/cycle/assetData/listAll', {}, null, r => {
        this.searchPileList = r.data
      })
    },
    // 新建 选中 资产类别
    addSearchChange (val) {
      let _data = {
        T0001_ID: val
      }
      this.addSearch.T0002_START_PILE = ''
      this.addSearch.T0002_END_PILE = ''
      this.addForm.T0002_ID = ''
      this.editForm.T0002_ID = ''
      // 请求 资产类别 对应的 资产信息  和起点，终点桩号
      this.$api.post(`/cycle/assetData/listAll`, _data, null, r => {
        this.searchPileList = r.data
        this.assetDataList = r.data
      })
    },
    // 新建 / 修改 搜索
    addSearchFun () {
      this.isAddSearch = true
      this.$api.post(`/cycle/assetData/listAll`, this.addSearch, null, r => {
        this.assetDataList = r.data
        this.addSearchVal = r.search_val
      })
    },
    // 新建/ 修改 重置
    addReset () {
      this.addSearchVal = ''
      this.isAddSearch = false
      this.searchPileList = []
      this.addSearch.T0001_ID = ''
      this.addSearch.SEARCH_KEY = ''
      this.addSearch.T0002_START_PILE = ''
      this.addSearch.T0002_END_PILE = ''
      this.getAssetDataList()
    },
    // 新建保存
    addSaveFun () {
      this.$refs['addFormRef'].validate(valid => {
        if (valid) {
          this.addForm.T0005_START_TIME = this.addForm.time[0]
          this.addForm.T0005_END_TIME = this.addForm.time[1]
          this.$api.post('/cycle/costBudget/insert', this.addForm, null, r => {
            this.$message.success('新增成功')
            this.getCostBudgetList()
            this.addShow = false
          })
        }
      })
    },
    // 点击查看
    handleInfo (data) {
      this.imageList = []
      this.infoShow = true
      this.$api.post(
        `/cycle/costBudget/selectById?ID=${data.T0005_ID}`,
        {},
        null,
        r => {
          this.imageList = r.data.files
          this.infoForm = Object.assign({}, r.data)
          this.infoForm.T0002_ASSET_NAME = data.T0002_ASSET_NAME
          for (let i = 0; i < this.projectList.length; i++) {
            if (this.projectList[i].code === r.data.T0005_ENGIN_MAINT) {
              this.infoForm.T0005_ENGIN_MAINT = this.projectList[i].name
            }
          }
        }
      )
    },
    // 点击修改
    handleEdit (data) {
      this.$api.post('/cycle/assetData/listAll', {}, null, r => {
        this.searchPileList = r.data
      })
      this.imageList = []
      this.imageUrl = ''
      this.dataParams.ID = data.T0005_ID
      this.addReset()
      this.editShow = true
      this.$api.post(
        `/cycle/costBudget/selectById?ID=${data.T0005_ID}`,
        {},
        null,
        r => {
          this.editForm = Object.assign({}, r.data)
          let _arr = [
            this.editForm.T0005_START_TIME,
            this.editForm.T0005_END_TIME
          ]
          this.imageList = r.data.files
          this.$set(this.editForm, 'time', _arr)
        }
      )
    },
    // 修改保存
    editSaveFun () {
      this.$refs['editFormRef'].validate(valid => {
        if (valid) {
          this.editForm.T0005_START_TIME = this.editForm.time[0]
          this.editForm.T0005_END_TIME = this.editForm.time[1]
          this.$api.post(`/cycle/costBudget/update`, this.editForm, null, r => {
            this.$message.success('修改成功')
            this.editShow = false
            this.getCostBudgetList()
          })
        }
      })
    },
    // 获取资产类别 list
    getAssetTypeList () {
      this.$api.post(`/cycle/assetType/listAll`, {}, null, r => {
        this.assetTypeList = r.data
      })
    },
    // 获取资产信息 select 列表
    getAssetDataList () {
      this.$api.post(`/cycle/assetData/listAll`, {}, null, r => {
        this.assetDataList = r.data
      })
    },
    // 养护费用list
    getCostBudgetList () {
      if (this.searchMap.time.length > 0) {
        this.searchMap.T0005_START_TIME = this.searchMap.time[0]
        this.searchMap.T0005_END_TIME = this.searchMap.time[1]
      }
      let _data = {
        currentPage: this.currentPage,
        showCount: this.showCount,
        searchMap: this.searchMap
      }
      this.$api.post(`/cycle/costBudget/listPage`, _data, null, r => {
        this.loading = false
        for (let i = 0; i < r.data.returnParam.length; i++) {
          if (r.data.returnParam[i].files.length > 0) {
            r.data.returnParam[i].pic = r.data.returnParam[i].files[0].FILE_URL
            r.data.returnParam[i].srcList = []
            for (let k = 0; k < r.data.returnParam[i].files.length; k++) {
              r.data.returnParam[i].srcList.push(
                r.data.returnParam[i].files[k].FILE_URL
              )
            }
          } else {
            r.data.returnParam[i].pic = ''
          }
        }
        this.tableData = r.data.returnParam
        this.total = r.data.totalResult
        this.searchVal = r.search_val
      })
    },
    handleDelete (data) {
      this.$confirm('确定要删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post(
          `/cycle/costBudget/deleteById?ID=${data.T0005_ID}`,
          {},
          null,
          r => {
            this.$message.success('删除成功')
            this.getCostBudgetList()
          }
        )
      })
    },
    // 批量删除
    delListFun () {
      let _list = []
      if (this.selectList.length > 0) {
        for (let i = 0; i < this.selectList.length; i++) {
          _list.push(this.selectList[i].T0005_ID)
        }
        this.$confirm('确定要删除这些记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post(
            `/cycle/costBudget/deleteByIds?IDS=${_list}`,
            {},
            null,
            r => {
              this.$message.success('删除成功')
              this.getCostBudgetList()
              this.selectList = []
            }
          )
        })
      } else {
        this.$message.warning('请选择要删除的数据！')
      }
    },
    // 文件状态改变
    imgChange (file) {
      if (this.dataParams.ID === '') {
        this.$message.warning('请先新增资产技术等级')
        return false
      }
      this.imageUrl = URL.createObjectURL(file.raw)
      if (file.size > 5 * 1024 * 1024) {
        this.$message.warning('上传图片不能超过 5MB')
        return false
      }
      this.uploadImgFun(file)
    },
    // 上传文件
    uploadImgFun (file) {
      let param = new FormData()
      param.append('files', file.raw)
      param.append('ID', this.dataParams.ID)
      param.append('TABLE_NAME', this.dataParams.TABLE_NAME)
      this.$api.post(`/cycle/fileInfo/uploadFile`, param, null, r => {
        this.$message.success('上传图片成功')
        this.getCostBudgetList()
        this.imageUrl = ''
        this.imageList.push(Object.assign({}, r.data[0]))
      })
    },
    clickImgFun (data) {
      this.imgShowUrl = data.FILE_URL
      this.imgShow = true
    },
    clickDeleteFun (data) {
      this.$confirm('确定要删除该图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post(
          `/cycle/fileInfo/deleteById?ID=${data.M0013_ID}`,
          {},
          null,
          r => {
            this.$message.success('删除成功')
            this.getCostBudgetList()
            this.imageList = this.imageList.filter(item => {
              return item.M0013_ID !== data.M0013_ID
            })
          }
        )
      })
    }
  },
  created () {
    this.getAssetTypeList()
    this.getCostBudgetList()
    this.assetDataFun()
  }
}
</script>
<style  lang="scss">
#yhCostMap {
  .title-p {
    button {
      float: right;
    }
  }
  .table-page {
    text-align: center;
    margin-top: 10px;
  }
  .content {
    background: #fff;
    padding: 30px 20px;
    .el-form-item {
      margin-bottom: 0;
    }
    .div-btn {
      margin: 10px 0;
    }
  }
  .serach-span {
    margin-left: 10px;
  }
  .table-div {
    .el-button--mini {
      padding: 4px 5px;
    }
    td,
    th {
      text-align: center;
    }
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
        width: 280px;
      }
    }
    .bg-td {
      background: #f0f0f0;
      text-align: center;
      width: 160px;
    }
  }
}
</style >
<style lang="scss">
#yhCostMap {
  .dialog-div {
    width: 1000px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .el-range-separator{
    width: 25px;
  }
  .ul-img {
    display: inline;
    list-style: none;
    margin: 0;
  }
  .avatar-uploader {
    display: inline-block;
    margin-left: 10px;
    position: relative;
  }
  .actions-item {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    line-height: 110px;
    border-radius: 6px;
    span {
      display: inline-block;
      cursor: pointer;
    }
    span + span {
      margin-left: 15px;
    }
    i {
      font-size: 24px;
    }
  }
  .actions-item:hover {
    opacity: 1;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
}
</style >
