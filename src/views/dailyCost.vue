/* * @Author: liuhaosheng * @Description：日常费用收支列表 */
<template>
  <div id="dailycost">
    <p class="title-p">
      <span style="display:inline-block;margin-bottom:20px;">
        >> 日常费用收支列表
      </span>
      <el-button type="primary" icon="el-icon-plus" @click="addFun"
        >增加日常费用收支
      </el-button>
    </p>
    <div class="content">
      <el-row :gutter="10">
        <el-form label-position="right" label-width="80px" :model="searchMap">
          <el-col :span="4">
            <el-form-item label="资产类别">
              <el-select
                v-model="searchMap.T0001_ID"
                style="width:100%"
                @change="changeSelect"
                size="small"
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
            <el-form-item label="费用收支">
              <el-select
                v-model="searchMap.T0004_CURINGCOST_TYPE"
                style="width:100%"
                size="small"
              >
                <el-option
                  v-for="item in curincostList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="起点桩号">
              <el-select
                v-model="searchMap.T0002_START_PILE"
                style="width:100%"
                size="small"
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
                size="small"
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
          <el-col :span="5">
            <el-form-item label="起止日期">
              <el-date-picker
                style="width:100%"
                size="small"
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
          <el-col :span="4" style="padding-top:4px;padding-left:5px">
            <el-button type="primary" @click="searchFun" size="small"
              >搜索</el-button
            >
            <el-button @click="reset" size="small">重置</el-button>
          </el-col>
        </el-form>
      </el-row>
      <div class="div-btn">
        <!-- <el-button type="primary" @click="searchFun">搜索</el-button>
        <el-button @click="reset">重置</el-button> -->
        <el-button
          type="primary"
          icon="el-icon-delete"
          @click="delListFun"
          size="small"
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
            prop="T0004_CURINGCOST_NAME"
            label="费用名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="T0004_CURINGCOST_MONEY"
            label="收入（元）"
            :formatter="incomeFmt"
          >
          </el-table-column>
          <el-table-column
            prop="T0004_CURINGCOST_MONEY"
            label="支出（元）"
            :formatter="expensesFmt"
          >
          </el-table-column>
          <el-table-column
            prop="T0002_START_PILE"
            label="起点桩号"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="T0002_END_PILE"
            label="终点桩号"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="T0002_LOAD_NAME"
            label="所属路段"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="T0004_CURINGCOST_TIME"
            label="费用发生时间"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="票据查看" align="center" width="80">
            <template slot-scope="scope">
              <el-image
                style="width: 50px; height: 18px"
                :src="scope.row.pic"
                :preview-src-list="scope.row.srcList"
              >
                <div slot="error" class="image-slot">
                  无
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column fixed="right" width="190" label="操作">
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
      title=">> 日常费用录入"
      :visible.sync="addShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <el-row :gutter="10">
        <el-form label-position="right" label-width="80px" :model="addSearch">
          <el-col :span="5">
            <el-form-item label="资产类别">
              <el-select
                v-model="addSearch.T0001_ID"
                style="width:100%"
                @change="addSearchChange"
                size="small"
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
                size="small"
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
                size="small"
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
              <el-input
                v-model.trim="addSearch.SEARCH_KEY"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3.5" style="margin-top:5px;padding-left:10px;">
            <el-button type="primary" @click="addSearchFun" size="small"
              >搜索</el-button
            >
            <el-button @click="addReset" size="small">重置</el-button>
          </el-col>
        </el-form>
      </el-row>
      <p style="padding:20px 10px">
        您的检索：
        <span v-show="!isAddSearch" style="font-size:12px;color:#999">
          无
        </span>
        <span style="font-size:12px;color:#999"> {{ addSearchVal }} </span>
      </p>
      <el-form :model="addForm" :rules="rules" ref="addFormRef">
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
            
            <td class="bg-td">费用名称：</td>
            <td>
              <el-form-item prop="T0004_CURINGCOST_NAME">
                <el-input
                  v-model.trim="addForm.T0004_CURINGCOST_NAME"
                  size="small"
                ></el-input>
              </el-form-item>
            </td>
            <!-- <td class="bg-td"></td> -->
            <!-- <td colspan="2"></td> -->
          </tr>
          <tr>
            <td class="bg-td">金额（元）：</td>
            <td>
              <el-form-item prop="T0004_CURINGCOST_MONEY">
                <el-input
                  v-model.trim="addForm.T0004_CURINGCOST_MONEY"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">费用发生时间：</td>
            <td>
              <el-form-item prop="T0004_CURINGCOST_TIME">
                <el-date-picker
                  v-model="addForm.T0004_CURINGCOST_TIME"
                  type="date"
                  size="small"
                  style="width:100%"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">收支选择：</td>
            <td colspan="3">
              <el-radio-group v-model="addForm.T0004_CURINGCOST_TYPE">
                <el-radio :label="1">收入</el-radio>
                <el-radio :label="2">支出</el-radio>
              </el-radio-group>
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
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <ul class="ul-img">
                <li
                  class="avatar-uploader"
                  v-for="(item, index) in imageList"
                  :key="index"
                >
                  <img :src="item.FILE_URL" class="el-upload avatar" />
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
                v-model="addForm.T0004_CURINGCOST_REMARK"
                maxlength="500"
              ></el-input>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSaveFun">确 定</el-button>
        <el-button @click="addShow = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      title=">> 修改日常费用"
      :visible.sync="editShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <!-- <el-row :gutter="10">
        <el-form label-position="right" label-width="80px" :model="addSearch">
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
              <el-select v-model="addSearch.T0002_END_PILE" style="width:100%">
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
            <el-button type="primary" @click="addSearchFun" size="small"
              >搜索</el-button
            >
            <el-button @click="addReset" size="small">重置</el-button>
          </el-col>
        </el-form>
      </el-row>
      <p style="padding:20px 10px">
        您的检索：
        <span v-show="!isAddSearch"> 无 </span>
        <span> {{ addSearchVal }} </span>
      </p> -->
      <el-form :model="editForm" :rules="rules" ref="editFormRef">
        <table class="add-table">
          <tr>
            <td class="bg-td">请选择资产：</td>
            <td>
              <el-form-item prop="T0002_ID">
                <el-select
                  v-model="editForm.T0002_ID"
                  style="width:100%"
                  size="small"
                  disabled="disabled"
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
            <td class="bg-td">费用名称：</td>
            <td>
              <el-form-item prop="T0004_CURINGCOST_NAME">
                <el-input
                  v-model.trim="editForm.T0004_CURINGCOST_NAME"
                  size="small"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">金额（元）：</td>
            <td>
              <el-form-item prop="T0004_CURINGCOST_MONEY">
                <el-input
                  v-model.trim="editForm.T0004_CURINGCOST_MONEY"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </td>
             <td class="bg-td">费用发生时间：</td>
            <td>
              <el-form-item prop="T0004_CURINGCOST_TIME">
                <el-date-picker
                  v-model="editForm.T0004_CURINGCOST_TIME"
                  type="date"
                  size="small"
                  style="width:100%"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">收支选择：</td>
            <td colspan="3">
              <el-radio-group v-model="editForm.T0004_CURINGCOST_TYPE">
                <el-radio :label="1">收入</el-radio>
                <el-radio :label="2">支出</el-radio>
              </el-radio-group>
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
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <ul class="ul-img">
                <li
                  class="avatar-uploader"
                  v-for="(item, index) in imageList"
                  :key="index"
                >
                  <img :src="item.FILE_URL" class="el-upload avatar" />
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
                v-model="editForm.T0004_CURINGCOST_REMARK"
                maxlength="500"
              ></el-input>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editSaveFun">确 定</el-button>
        <el-button @click="editShow = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog
      title=">> 查看日常费用"
      :visible.sync="infoShow"
      custom-class="dialog-div"
    >
      <table class="add-table">
        <tr>
          <td class="bg-td">资产名称：</td>
          <td colspan="3">
            {{ infoForm.T0002_ASSET_NAME }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">费用名称：</td>
          <td>
            {{ infoForm.T0004_CURINGCOST_NAME }}
          </td>
          <td class="bg-td">金额（元）：</td>
          <td>
            {{ infoForm.T0004_CURINGCOST_MONEY }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">收支选择：</td>
          <td>
            {{ infoForm.T0004_CURINGCOST_TYPE }}
          </td>
          <td class="bg-td">费用发生时间：</td>
          <td>
            {{ infoForm.T0004_CURINGCOST_TIME }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">票据</td>
          <td colspan="3">
            <ul class="ul-img">
              <li
                class="avatar-uploader"
                v-for="(item, index) in imageList"
                :key="index"
              >
                <img :src="item.FILE_URL" class="el-upload avatar" />
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
            {{ infoForm.T0004_CURINGCOST_REMARK }}
          </td>
        </tr>
      </table>

      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
    <!-- 图片预览 -->
    <el-dialog :visible.sync="imgShow" title="图片预览">
      <div style="text-align: center;">
        <el-image :src="imgShowUrl">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
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
        TABLE_NAME: 'CURING_COST'
      },
      dailycost: {},
      assetList: [],
      assetTypeList: [], // 资产类别 list
      assetDataList: [],
      loading: true,
      addShow: false,
      editShow: false,
      infoShow: false,
      editForm: {},
      addForm: {
        T0002_ID: '',
        T0004_CURINGCOST_NAME: '',
        T0004_CURINGCOST_MONEY: '',
        T0004_CURINGCOST_TYPE: 1,
        T0004_CREATE_TIME: '',
        T0004_CURINGCOST_REMARK: '',
        T0004_CURINGCOST_TIME:''
      },
      // 表单验证规则
      // rules1: {
      //   T0001_ID: [
      //     { required: true, message: '请选择资产类别', trigger: 'change' }
      //   ]
      // },
      rules: {
        T0002_ID: [
          { required: true, message: '请选择资产', trigger: 'change' }
        ],
        T0004_CURINGCOST_NAME: [
          { required: true, message: '请填写费用名称', trigger: 'change' }
        ],
        T0004_CURINGCOST_MONEY: [
          { required: true, message: '请填写金额', trigger: 'change' },
          { validator: validNum, trigger: 'blur' }
        ],
        T0004_CURINGCOST_TIME: [
          {
            required: true,
            message: '请选择归属时间',
            trigger: 'change'
          }
        ]
      },
      infoForm: {},
      tableData: [],
      showCount: 10,
      currentPage: 1,
      total: 0,
      searchMap: {
        T0001_ID: '',
        T0004_CURINGCOST_TYPE: '',
        T0002_START_PILE: '',
        T0002_END_PILE: '',
        time: [],
        START_TIME: '',
        END_TIME: ''
      },
      addSearch: {
        T0001_ID: '',
        SEARCH_KEY: '',
        T0002_START_PILE: '',
        T0002_END_PILE: ''
      },
      selectList: [],
      curincostList: [
        {
          name: '收入',
          valve: 1
        },
        {
          name: '支出',
          valve: 2
        }
      ],
      pileList: [],
      searchPileList: [],
      isSearch: false,
      searchVal: '',
      addSearchVal: '', // 新建 修改搜索内容
      isAddSearch: false // 新建 修改 是否搜索
    }
  },
  methods: {
      getDateTime(){
          let nDate=new Date()
          let str=''
          str=nDate.getFullYear()+'-'+(nDate.getMonth()+1)+'-'+nDate.getDate()
          this.addForm.T0004_CURINGCOST_TIME=str
      },
    // 请求所有的起点 / 终点桩号
    assetDataFun() {
      this.$api.post('/cycle/assetData/getPileList', {}, null, r => {
        this.pileList = r.data
      })
    },
    // 根据 资产类别 请求 起点 / 终点桩号
    changeSelect(val) {
      let _data = {
        T0001_ID: val
      }
      this.searchMap.T0002_START_PILE = ''
      this.searchMap.T0002_END_PILE = ''
      this.$api.post('/cycle/assetData/getPileList', _data, null, r => {
        this.pileList = r.data
      })
    },
    // 搜索
    searchFun() {
      this.isSearch = true
      this.getCuringList()
    },
    // 重置
    reset() {
      this.isSearch = false
      this.searchMap.T0001_ID = ''
      this.searchMap.T0004_CURINGCOST_TYPE = ''
      this.searchMap.T0002_START_PILE = ''
      this.searchMap.T0002_END_PILE = ''
      this.searchMap.time = []
      this.searchMap.START_TIME = ''
      this.searchMap.END_TIME = ''
      this.showCount = 10
      this.currentPage = 1
      this.getCuringList()
    },
    // 收入
    incomeFmt(row) {
      if (row.T0004_CURINGCOST_TYPE === 1) {
        return row.T0004_CURINGCOST_MONEY
      } else {
        return '--'
      }
    },
    // 支出
    expensesFmt(row) {
      if (row.T0004_CURINGCOST_TYPE === 2) {
        return row.T0004_CURINGCOST_MONEY
      } else {
        return '--'
      }
    },
    // 分页
    sizeChange(val) {
      this.showCount = val
      this.getCuringList()
    },
    currentChange(val) {
      this.currentPage = val
      this.getCuringList()
    },
    // table  选中
    selectTable(selection) {
      this.selectList = selection
    },
    // table  选中
    selectAll(selection) {
      this.selectList = selection
    },
    // 点击新建
    addFun() {
      this.imageUrl = ''
      this.dataParams.ID = ''
      this.imageList = []
      this.addShow = true
      this.addReset()
      this.$nextTick(() => {
        this.$refs['addFormRef'].resetFields()
        // this.$refs['searchForm'].resetFields()
      })
      this.$api.post(`/cycle/utilData/getId`, {}, null, r => {
        this.dataParams.ID = r.data
        this.addForm.T0004_ID = r.data
      })
      this.$api.post('/cycle/assetData/listAll', {}, null, r => {
        this.searchPileList = r.data
      })
    },
    // 新建 选中 资产类别
    addSearchChange(val) {
      let _data = {
        T0001_ID: val
      }
      this.addSearch.T0002_START_PILE = ''
      this.addSearch.T0002_END_PILE = ''
      this.addForm.T0002_ID = ''
      this.editForm.T0002_ID = ''
      this.$api.post(`/cycle/assetData/listAll`, _data, null, r => {
        this.searchPileList = r.data
        this.assetDataList = r.data
      })
    },
    // 新建 / 修改 搜索
    addSearchFun() {
      this.isAddSearch = true
      this.$api.post(`/cycle/assetData/listAll`, this.addSearch, null, r => {
        this.assetDataList = r.data
        this.addSearchVal = r.search_val
      })
    },
    // 新建/ 修改 重置
    addReset() {
      this.addSearchVal = ''
      this.isAddSearch = false
      this.addSearch.T0001_ID = ''
      this.addSearch.SEARCH_KEY = ''
      this.addSearch.T0002_START_PILE = ''
      this.addSearch.T0002_END_PILE = ''
      this.getAssetDataList()
    },
    // 新增保存
    addSaveFun() {
      // this.$refs['searchForm'].validate(valid => {
      //   if (valid) {
      this.addForm.T0004_CREATE_TIME = this.addForm.T0004_CURINGCOST_TIME
      this.$refs['addFormRef'].validate(valid => {
        if (valid) {
          this.$api.post('/cycle/curingCost/insert', this.addForm, null, r => {
            this.$message.success('新增成功')
            this.addShow = false
            this.getCuringList()
          })
        }
      })
      //   }
      // })
    },
    // 获取资产类别 list
    getAssetTypeList() {
      this.$api.post(`/cycle/assetType/listAll`, {}, null, r => {
        // console.log(r)
        r.data.forEach(ele => {
          if (ele.T0001_PID !== '0') {
            ele.T0001_ASSETTYPE_NAME = '--' + ele.T0001_ASSETTYPE_NAME
          }
        })
        this.assetTypeList = r.data
      })
    },
    // 获取资产信息 select 列表
    getAssetDataList() {
      this.$api.post(`/cycle/assetData/listAll`, {}, null, r => {
        this.assetDataList = r.data
      })
    },
    // 日常费用 list
    getCuringList() {
      if (this.searchMap.time.length > 0) {
        this.searchMap.START_TIME = this.searchMap.time[0]
        this.searchMap.END_TIME = this.searchMap.time[1]
      }
      let _data = {
        currentPage: this.currentPage,
        showCount: this.showCount,
        searchMap: this.searchMap
      }
      this.$api.post(`/cycle/curingCost/listPage`, _data, null, r => {
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
    handleInfo(data) {
      this.infoShow = true
      this.imageList = []
      this.$api.post(
        `/cycle/curingCost/selectById?ID=${data.T0004_ID}`,
        {},
        null,
        r => {
          if (r.data.T0004_CURINGCOST_TYPE === 1) {
            r.data.T0004_CURINGCOST_TYPE = '收入'
          } else {
            r.data.T0004_CURINGCOST_TYPE = '支出'
          }
          this.imageList = r.data.files
          this.infoForm = Object.assign({}, r.data)
          this.infoForm.T0002_ASSET_NAME = data.T0002_ASSET_NAME
        }
      )
    },
    // 点击修改
    handleEdit(data) {
      this.$api.post('/cycle/assetData/listAll', {}, null, r => {
        this.searchPileList = r.data
      })
      this.addReset()
      this.imageUrl = ''
      this.imageList = []
      this.dataParams.ID = data.T0004_ID
      this.editShow = true
      this.$api.post(
        `/cycle/curingCost/selectById?ID=${data.T0004_ID}`,
        {},
        null,
        r => {
          this.imageList = r.data.files
          this.editForm = Object.assign({}, r.data)
        }
      )
    },
    // 修改保存
    editSaveFun() {
      this.editForm.T0004_CREATE_TIME = this.editForm.T0004_CURINGCOST_TIME
      this.$refs['editFormRef'].validate(valid => {
        if (valid) {
          this.$api.post(`/cycle/curingCost/update`, this.editForm, null, r => {
            this.$message.success('修改成功')
            this.editShow = false
            this.getCuringList()
          })
        }
      })
    },
    // 点击删除
    handleDelete(data) {
      this.$confirm('确定要删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post(
          `/cycle/curingCost/deleteById?ID=${data.T0004_ID}`,
          {},
          null,
          r => {
            this.$message.success('删除成功')
            this.getCuringList()
          }
        )
      })
    },
    // 批量删除
    delListFun() {
      let _list = []
      if (this.selectList.length > 0) {
        for (let i = 0; i < this.selectList.length; i++) {
          _list.push(this.selectList[i].T0004_ID)
        }
        this.$confirm('确定要删除这些记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post(
            `/cycle/curingCost/deleteByIds?IDS=${_list}`,
            {},
            null,
            r => {
              this.$message.success('删除成功')
              this.getCuringList()
              this.selectList = []
            }
          )
        })
      } else {
        this.$message.warning('请选择要删除的数据！')
      }
    },
    // 文件状态改变
    imgChange(file) {
      if (this.dataParams.ID === '') {
        this.$message.warning('请先增加日常费用')
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
    uploadImgFun(file) {
      let param = new FormData()
      param.append('files', file.raw)
      param.append('ID', this.dataParams.ID)
      param.append('TABLE_NAME', this.dataParams.TABLE_NAME)
      this.$api.post(`/cycle/fileInfo/uploadFile`, param, null, r => {
        this.$message.success('上传图片成功')
        this.getCuringList()
        this.imageUrl = ''
        this.imageList.push(Object.assign({}, r.data[0]))
      })
    },
    // 查看图片
    clickImgFun(data) {
      this.imgShowUrl = data.FILE_URL
      this.imgShow = true
    },
    // 删除图片
    clickDeleteFun(data) {
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
            this.getCuringList()
            this.imageList = this.imageList.filter(item => {
              return item.M0013_ID !== data.M0013_ID
            })
          }
        )
      })
    }
  },
  created() {
    this.getCuringList()
    this.getAssetTypeList()
    this.assetDataFun()
  }
}
</script>
<style lang="scss">
#dailycost {
  .add-table tr td {
    padding: 5px 10px !important;
  }
  .el-dialog__header {
    background: #f5f5f5;
  }
  // .el-dialog__title {
  //   color: #fff;
  // }
  // .el-dialog__headerbtn .el-dialog__close {
  //   color: #fff;
  // }
  .el-col-4 {
    width: 15%;
  }
  .el-col-2 {
    width: 8%;
  }
  .el-input--suffix .el-input__inner {
    height: 32px;
  }
  .title-p {
    margin-bottom: 10px;
    button {
      float: right;
    }
  }
  .el-range-separator {
    width: 25px;
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
    .table-div {
      .el-button--mini {
        padding: 4px 5px;
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
        padding: 8px 10px;
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
</style>
