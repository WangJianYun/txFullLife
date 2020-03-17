/*
 * @Author: liuhaosheng
 * @Description：资产技术等级列表
 */
<template>
  <div class="techgrade-wrap">
    <p class="title-p">
      <span style="display:inline-block;margin-bottom:20px;"> >> 资产技术等级列表 </span>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addFun"
      >增加资产技术等级</el-button>
    </p>
    <div class="content">
      <el-row :gutter="10">
        <el-form
          label-position="right"
          label-width="80px"
          :model="searchMap"
        >
          <el-col :span="5">
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
          <el-col :span="5">
            <el-form-item label="等级选择">
              <el-select
                v-model="searchMap.T0006_ID"
                style="width:100%"
              >
                <el-option
                  v-for="item in techTypeList"
                  :key="item.T0006_ID"
                  :label="item.T0006_TECHTYPE_NAME"
                  :value="item.T0006_ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
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
          <el-col :span="5">
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
          <el-col :span="4">
            <el-form-item label="年份选择">
              <el-date-picker
                style="width:100%"
                v-model="searchMap.YEAR"
                type="year"
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
            prop="T0006_TECHTYPE_NAME"
            label="技术状况"
          >
            <template slot-scope="scope">
              <div
                @click="clickTypeFun(scope.row)"
                style="cursor: pointer;"
                v-if="scope.row.T0006_TECHTYPE_NAME == '五类' || scope.row.T0006_TECHTYPE_NAME == '四类'"
              >
                {{ scope.row.T0006_TECHTYPE_NAME }} <span class="error-span"> 危 </span>
              </div>
              <div
                v-else
                @click="clickTypeFun(scope.row)"
                style="cursor: pointer;"
              >
                {{ scope.row.T0006_TECHTYPE_NAME }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="T0003_CHECK_TIME"
            label="检测时间"
            width="140"
          >
            <template slot-scope="scope">
              <div>
                {{ scope.row.T0003_CHECK_TIME }}
                <span
                  class="wraning-span"
                  v-if="scope.row.STATE == 1 "
                > 检 </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="T0003_CHECK_UNIT"
            label="检测单位"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="检测报告"
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
            prop="T0002_LOAD_NAME"
            label="所属路段"
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
          :current-page="currentPage"
          :page-sizes="[10, 50, 100]"
          :page-size="showCount"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <div>
        <table class="table-title add-table">
          <tr>
            <td
              class="bg-td"
              colspan="2"
            > 技术等级小贴士 </td>
          </tr>
          <tr>
            <td class="title-info"> 收费站等级 </td>
            <td> 各收费站按星级标准区分：一星级收费站、二星级收费站、三星级收费站、四星级收费站、五星级收费站。 </td>
          </tr>
          <tr>
            <td class="title-info"> 桥梁技术等级 </td>
            <td>
              <p>桥梁技术状况等级分为五类，分别为一类、二类、三类、四类、五类。 </p>
              <p> （1）一类桥梁为全新状态，功能完善。（2）二类桥梁为有轻微缺损，对桥梁使用功能无影响。（3）三类桥梁为有中等缺损，尚能维持正常使用功能。（4）四类桥梁为主要构件有大的缺损，严重影响桥梁使用功能，或影响承载能力，不能保证正常使用。（5）五类桥梁为主要构件存在严重缺损，不能正常使用，危及桥梁安全，桥梁处于危险状态。</p>
            </td>
          </tr>
          <tr>
            <td class="title-info"> 隧道技术等级 </td>
            <td> 隧道工程专业承包企业资质等级标准，是隧道工程专业承包企业资质分为一级、二级、三级。 </td>
          </tr>
          <tr>
            <td class="title-info"> 涵洞技术等级 </td>
            <td> 好、较好、较差、差、危险五类。 </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 新建 -->
    <el-dialog
      title=">> 新增资产技术等级"
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
                  :value="item.T0002_END_PILE"
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
        <span> {{addSearchVal}} </span></p>
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
            <td class="bg-td">技术等级分类： </td>
            <td>
              <el-form-item prop="T0006_ID">
                <el-select
                  v-model="addForm.T0006_ID"
                  style="width:100%"
                  size="small"
                  v-if="searchTechTypeList.length > 0 "
                >
                  <el-option
                    v-for="item in searchTechTypeList"
                    :key="item.T0006_ID"
                    :label="item.T0006_TECHTYPE_NAME"
                    :value="item.T0006_ID"
                  ></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">检测单位/评测单位： </td>
            <td>
              <el-form-item prop="T0003_CHECK_UNIT">
                <el-input
                  v-model.trim="addForm.T0003_CHECK_UNIT"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">检测/评测时间：</td>
            <td>
              <el-form-item prop="T0003_CHECK_TIME">
                <el-date-picker
                  v-model="addForm.T0003_CHECK_TIME"
                  type="date"
                  placeholder="选择年"
                  style="width: 100%"
                  size="small"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">检测/评测报告上传：</td>
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
            <td class="bg-td">详情备注：</td>
            <td colspan="3">
              <el-input
                type="textarea"
                v-model="addForm.T0003_TECH_REMARK"
                maxlength="500"
              ></el-input>
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
      title=">> 修改资产技术等级"
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
                  :value="item.T0002_END_PILE"
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
            <td class="bg-td">技术等级分类： </td>
            <td>
              <el-form-item prop="T0006_ID">
                <el-select
                  v-model="editForm.T0006_ID"
                  style="width:100%"
                  size="small"
                  v-if="searchTechTypeList.length > 0 "
                >
                  <el-option
                    v-for="item in searchTechTypeList"
                    :key="item.T0006_ID"
                    :label="item.T0006_TECHTYPE_NAME"
                    :value="item.T0006_ID"
                  ></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">检测单位/评测单位： </td>
            <td>
              <el-form-item prop="T0003_CHECK_UNIT">
                <el-input
                  v-model.trim="editForm.T0003_CHECK_UNIT"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">检测/评测时间：</td>
            <td>
              <el-form-item prop="T0003_CHECK_TIME">
                <el-date-picker
                  v-model="editForm.T0003_CHECK_TIME"
                  type="date"
                  placeholder="选择年"
                  style="width: 100%"
                  size="small"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">检测/评测报告上传：</td>
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
            <td class="bg-td">详情备注：</td>
            <td colspan="3">
              <el-input
                type="textarea"
                v-model="editForm.T0003_TECH_REMARK"
                maxlength="500"
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
      title=">> 查看资产技术等级"
      :visible.sync="infoShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <table class="add-table">
        <tr>
          <td class="bg-td">请选择资产：</td>
          <td>
            {{ infoForm.T0002_ASSET_NAME }}
          </td>
          <td class="bg-td">技术等级分类： </td>
          <td>
            {{ infoForm.T0006_TECHTYPE_NAME }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">检测单位/评测单位： </td>
          <td>
            {{ infoForm.T0003_CHECK_UNIT }}
          </td>
          <td class="bg-td">检测/评测时间：</td>
          <td>
            {{ infoForm.T0003_CHECK_TIME }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">检测/评测报告：</td>
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
          <td class="bg-td">详情备注：</td>
          <td colspan="3">
            {{ infoForm.T0003_TECH_REMARK }}
          </td>
        </tr>
      </table>
      <div
        slot="footer"
        class="dialog-footer"
      >
      </div>
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
    <!-- 查看资产历年技术检测信息 -->
    <el-dialog
      :visible.sync="typeShow"
      title="资产历年技术检测信息"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <el-table
        v-loading.body="typeLoading"
        :data="tableTypeData"
        border
        style="width: 100%"
        highlight-current-row
        :header-cell-style="{background:'#f0f0f0'}"
      >
        >
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
          prop="T0006_TECHTYPE_NAME"
          label="技术状况"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.T0006_TECHTYPE_NAME == '五类' || scope.row.T0006_TECHTYPE_NAME == '四类'">
              {{ scope.row.T0006_TECHTYPE_NAME }} <span class="error-span"> 危 </span>
            </div>
            <div v-else>
              {{ scope.row.T0006_TECHTYPE_NAME }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="T0003_CHECK_TIME"
          label="检测时间"
          width="140"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.T0003_CHECK_TIME }}
              <span
                class="wraning-span"
                v-if="scope.row.STATE == 1 "
              > 检 </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="T0003_CHECK_UNIT"
          label="检测单位"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="检测报告"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 70px; height: 40px; line-height: 45px;"
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
          prop="T0002_LOAD_NAME"
          label="所属路段"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        class="table-page"
        @size-change="sizeTypeChange"
        @current-change="currentTypeChange"
        :current-page="TypeCurrentPage"
        :page-sizes="[10, 50, 100]"
        :page-size="TypeShowCount"
        layout="total, sizes, prev, pager, next, jumper"
        :total="typeTotal"
      ></el-pagination>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imageList: [],
      imgShow: false,
      typeShow: false,
      typeLoading: true,
      typeData: {},
      tableTypeData: [],
      typeTotal: 0,
      TypeShowCount: 10,
      TypeCurrentPage: 1,
      imgShowUrl: '', // 预览图片
      imageUrl: '',
      header: {
        TokenId: sessionStorage.getItem('TokenId') // 上传文件token
      },
      dataParams: {
        ID: '',
        TABLE_NAME: 'TECH_DATA'
      },
      loading: true,
      addShow: false,
      editShow: false,
      infoShow: false,
      editForm: {},
      addSearch: {
        T0001_ID: '',
        SEARCH_KEY: '',
        T0002_START_PILE: '',
        T0002_END_PILE: ''
      },
      addForm: {
        T0002_ID: '',
        T0006_ID: '',
        T0003_CHECK_UNIT: '',
        T0003_CHECK_TIME: '',
        T0003_TECH_REMARK: ''
      },
      rules: {
        T0002_ID: [
          { required: true, message: '请选择资产', trigger: 'change' }
        ],
        T0006_ID: [
          { required: true, message: '请选择技术等级分类', trigger: 'change' }
        ],
        T0003_CHECK_UNIT: [
          {
            required: true,
            message: '请填写检测单位/评测单位',
            trigger: 'change'
          }
        ],
        T0003_CHECK_TIME: [
          {
            required: true,
            message: '请选择检测/评测时间',
            trigger: 'change'
          }
        ]
      },
      infoForm: {},
      techgrade: {},
      showCount: 10,
      currentPage: 1,
      total: 0,
      searchMap: {
        T0001_ID: '',
        T0006_ID: '',
        YEAR: '',
        T0002_START_PILE: '',
        T0002_END_PILE: ''
      },
      tableData: [],
      selectList: [],
      assetTypeList: [],
      assetDataList: [],
      techTypeList: [], // 技术类别 list
      pileList: [], /// / 起点 / 终点桩号 list
      searchPileList: [], // 新增/ 修改的 起点。终点 桩号 list
      searchTechTypeList: [], //  新增/ 修改的资产等级
      isSearch: false, // 是否搜索
      searchVal: '', // 搜索内容
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
      this.$api.post(`/cycle/techType/listAll`, _data, null, r => {
        this.techTypeList = r.data
      })
    },
    // 搜索
    searchFun () {
      this.isSearch = true
      this.getTechDataList()
    },
    // 重置
    reset () {
      this.searchVal = ''
      this.isSearch = false
      this.pileList = []
      this.searchMap.T0001_ID = ''
      this.searchMap.YEAR = ''
      this.searchMap.T0006_ID = ''
      this.searchMap.T0002_START_PILE = ''
      this.searchMap.T0002_END_PILE = ''
      this.showCount = 10
      this.currentPage = 1
      this.getTechDataList()
    },
    // 分页
    sizeChange (val) {
      this.showCount = val
      this.getTechDataList()
    },
    currentChange (val) {
      this.currentPage = val
      this.getTechDataList()
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
        this.addForm.T0003_ID = r.data
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
      this.addSearch.T0006_ID = ''
      this.addForm.T0002_ID = ''
      this.editForm.T0002_ID = ''
      // 选中 资产类别 查找对应 起点，终点桩号
      this.$api.post(`/cycle/assetData/listAll`, _data, null, r => {
        this.searchPileList = r.data
        this.assetDataList = r.data
      })
      // 选中 资产类别 查找对应 技术等级分类
      this.$api.post(`/cycle/techType/listAll`, _data, null, r => {
        this.searchTechTypeList = r.data
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
      this.searchTechTypeList = []
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
          this.$api.post(`/cycle/techData/insert`, this.addForm, null, r => {
            this.$message.success('新增成功')
            this.addShow = false
            this.getTechDataList()
          })
        }
      })
    },
    handleInfo (data) {
      this.imageList = []
      this.imageList = data.files
      this.infoShow = true
      this.infoForm = Object.assign({}, data)
    },
    // 点击修改
    handleEdit (data) {
      this.$api.post('/cycle/assetData/listAll', {}, null, r => {
        this.searchPileList = r.data
      })
      this.getAssetDataList()
      this.imageList = []
      this.imageUrl = ''
      this.dataParams.ID = data.T0003_ID
      this.editShow = true
      this.$api.post(
        `/cycle/techData/selectById?ID=${data.T0003_ID}`,
        {},
        null,
        r => {
          this.imageList = r.data.files
          this.editForm = Object.assign({}, r.data)
          let _data = {
            T0001_ID: r.data.T0001_ID
          }
          this.getTechTypeList(_data)
        }
      )
    },
    // 修改保存
    editSaveFun () {
      this.$refs['editFormRef'].validate(valid => {
        if (valid) {
          this.$api.post(`/cycle/techData/update`, this.editForm, null, r => {
            this.$message.success('修改成功')
            this.editShow = false
            this.getTechDataList()
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
    // 技术类别 select
    getTechTypeList (data) {
      this.$api.post(`/cycle/techType/listAll`, data, null, r => {
        this.searchTechTypeList = r.data
      })
    },
    // 获取资产技术等级list
    getTechDataList () {
      let _data = {
        currentPage: this.currentPage,
        showCount: this.showCount,
        searchMap: this.searchMap
      }
      this.$api.post(`/cycle/techData/listPage`, _data, null, r => {
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
          `/cycle/techData/deleteById?ID=${data.T0003_ID}`,
          {},
          null,
          r => {
            this.$message.success('删除成功')
            this.getTechDataList()
          }
        )
      })
    },
    // 批量删除
    delListFun () {
      let _list = []
      if (this.selectList.length > 0) {
        for (let i = 0; i < this.selectList.length; i++) {
          _list.push(this.selectList[i].T0003_ID)
        }
        this.$confirm('确定要删除这些记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post(
            `/cycle/techData/deleteByIds?IDS=${_list}`,
            {},
            null,
            r => {
              this.$message.success('删除成功')
              this.getTechDataList()
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
        this.getTechDataList()
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
            this.getTechDataList()
            this.imageList = this.imageList.filter(item => {
              return item.M0013_ID !== data.M0013_ID
            })
          }
        )
      })
    },
    // 查询检测报告列表
    clickTypeFun (data) {
      this.typeData.T0002_ID = data.T0002_ID
      this.typeData.T0002_ASSET_NAME = data.T0002_ASSET_NAME
      this.typeShow = true
      this.typeListFun()
    },
    typeListFun () {
      let _data = {
        currentPage: this.TypeCurrentPage,
        showCount: this.TypeShowCount,
        searchMap: this.typeData
      }
      this.$api.post(`/cycle/techData/listPage`, _data, null, r => {
        this.typeLoading = false
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
        this.tableTypeData = r.data.returnParam
        this.typeTotal = r.data.totalResult
      })
    },
    // 分页
    sizeTypeChange (val) {
      this.TypeShowCount = val
      this.typeListFun()
    },
    currentTypeChange (val) {
      this.TypeCurrentPage = val
      this.typeListFun()
    }
  },
  created () {
    this.getAssetTypeList()
    this.getTechDataList()
    this.assetDataFun()
  }
}
</script>
<style lang="scss">
.techgrade-wrap {
  .title-p {
    button {
      float: right;
    }
  }
  .table-title {
    margin-top: 25px;
    font-size: 13px;
    color: #666666;
    .title-info {
      width: 160px;
      text-align: center;
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
    .error-span {
      background: red;
      color: #fff;
      border-radius: 50%;
      padding: 1px 4px;
    }
    .wraning-span {
      background: #ff9800;
      color: #fff;
      border-radius: 50%;
      padding: 1px 4px;
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
