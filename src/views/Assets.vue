/*
 * @Author: liuhaosheng
 * @Description：资产列表管理
 */
<template>
  <div class="assets-wrap">
    <p class="title-p">
      <span style="display:inline-block;margin-bottom:20px;"> >> 资产列表管理 </span>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addFun"
      >添加资产</el-button>
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
          <el-col :span="5">
            <el-form-item label="年份选择">
              <el-date-picker
                style="width:100%"
                v-model="searchMap.YEAR"
                type="year"
                value-format="yyyy"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="关键字">
              <el-input
                placeholder="请输入关键字"
                v-model="searchMap.SEARCH_KEY"
              >
              </el-input>
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
            prop="T0002_ASSET_AMOUNT"
            label="数量（个/座/片）"
          >
          </el-table-column>
          <el-table-column
            prop="T0002_LOAD_NAME"
            label="所属路段"
          >
          </el-table-column>
          <el-table-column
            label="图片"
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
            prop="T0002_TECH_STATE"
            label="技术状况"
          >
          </el-table-column>
          <el-table-column
            prop="T0002_ASSET_DATE"
            label="归属年份"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="地图位置"
            width="80"
          >
            <template slot-scope="scope">
              <i
                class="el-icon-location"
                @click="locationFun(scope.row)"
                style="font-size: 30px;color: red; cursor: pointer;"
              ></i>
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
    <!-- 新建 -->
    <el-dialog
      title=">> 增加资产"
      :visible.sync="addShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addFormRef"
      >
        <table class="add-table">
          <tr>
            <td class="bg-td">资产名称：</td>
            <td>
              <el-form-item prop="T0002_ASSET_NAME">
                <el-input
                  v-model.trim="addForm.T0002_ASSET_NAME"
                  size="small"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">资产类别： </td>
            <td>
              <el-form-item prop="T0001_ID">
                <el-select
                  v-model="addForm.T0001_ID"
                  style="width:100%"
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
            </td>
          </tr>
          <tr>
            <td class="bg-td">所属路段：</td>
            <td>
              <el-form-item prop="T0002_LOAD_NAME">
                <el-select
                  v-model="addForm.T0002_LOAD_NAME"
                  style="width:100%"
                  size="small"
                >
                  <el-option
                    v-for="(item,index ) in listNameList"
                    :key="index"
                    :label="item.M0010_LOAD_NAME"
                    :value="item.M0010_LOAD_NAME"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
            <td> </td>
            <td> </td>
          </tr>
          <tr>
            <td class="bg-td">起点桩号： </td>
            <td>
              <el-form-item prop="T0002_START_PILE">
                <el-input
                  v-model.trim="addForm.T0002_START_PILE"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">终点桩号：</td>
            <td>
              <el-form-item prop="T0002_END_PILE">
                <el-input
                  v-model.trim="addForm.T0002_END_PILE"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">数量： </td>
            <td>
              <el-form-item prop="T0002_ASSET_AMOUNT">
                <el-input
                  v-model.trim="addForm.T0002_ASSET_AMOUNT"
                  size="small"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">归属年份：</td>
            <td>
              <el-form-item prop="T0002_ASSET_DATE">
                <el-date-picker
                  v-model="addForm.T0002_ASSET_DATE"
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
            <td class="bg-td">归属公司： </td>
            <td>
              {{ addForm.T0002_ASSET_COMPANY }}
            </td>
            <td class="bg-td"> 所属养管公司： </td>
            <td>
              <el-form-item prop="T0002_CURING_UNIT">
                <el-input
                  v-model.trim="addForm.T0002_CURING_UNIT"
                  size="small"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">责任人： </td>
            <td>
              <el-form-item prop="T0002_DUTY_PERSON">
                <el-input
                  v-model.trim="addForm.T0002_DUTY_PERSON"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td"> 联系电话： </td>
            <td>
              <el-form-item prop="T0002_TOUCH_TEL">
                <el-input
                  v-model.trim="addForm.T0002_TOUCH_TEL"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">经度： </td>
            <td>
              <el-form-item prop="T0002_ASSET_PRECI">
                <el-input
                  v-model.trim="addForm.T0002_ASSET_PRECI"
                  size="small"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td"> 纬度： </td>
            <td>
              <el-form-item prop="T0002_ASSET_LATI">
                <el-input
                  v-model.trim="addForm.T0002_ASSET_LATI"
                  size="small"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">图片上传：</td>
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
                v-model="addForm.T0002_ASSET_REAMRK"
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
      title=">> 修改资产"
      :visible.sync="editShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <el-form
        :model="editForm"
        :rules="rules"
        ref="editFormRef"
      >
        <table class="add-table">
          <tr>
            <td class="bg-td">资产名称：</td>
            <td>
              <el-form-item prop="T0002_ASSET_NAME">
                <el-input
                  v-model.trim="editForm.T0002_ASSET_NAME"
                  size="small"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">资产类别： </td>
            <td>
              <el-form-item prop="T0001_ID">
                <el-select
                  v-model="editForm.T0001_ID"
                  style="width:100%"
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
            </td>
          </tr>
          <tr>
            <td class="bg-td">所属路段：</td>
            <td>
              <el-form-item prop="T0002_LOAD_NAME">
                <el-select
                  v-model="editForm.T0002_LOAD_NAME"
                  style="width:100%"
                  size="small"
                >
                  <el-option
                    v-for="(item,index ) in listNameList"
                    :key="index"
                    :label="item.M0010_LOAD_NAME"
                    :value="item.M0010_LOAD_NAME"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
            <td> </td>
            <td> </td>
          </tr>
          <tr>
            <td class="bg-td">起点桩号： </td>
            <td>
              <el-form-item prop="T0002_START_PILE">
                <el-input
                  v-model.trim="editForm.T0002_START_PILE"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">终点桩号：</td>
            <td>
              <el-form-item prop="resource">
                <el-input
                  v-model.trim="editForm.T0002_END_PILE"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">数量： </td>
            <td>
              <el-form-item prop="T0002_ASSET_AMOUNT">
                <el-input
                  v-model.trim="editForm.T0002_ASSET_AMOUNT"
                  size="small"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">归属年份：</td>
            <td>
              <el-form-item prop="T0002_ASSET_DATE">
                <el-date-picker
                  v-model="editForm.T0002_ASSET_DATE"
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
            <td class="bg-td">归属公司： </td>
            <td>
              {{ editForm.T0002_ASSET_COMPANY }}
            </td>
            <td class="bg-td"> 所属养管公司： </td>
            <td>
              <el-form-item prop="T0002_CURING_UNIT">
                <el-input
                  v-model.trim="editForm.T0002_CURING_UNIT"
                  size="small"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">责任人： </td>
            <td>
              <el-form-item prop="resource">
                <el-input
                  v-model.trim="editForm.T0002_DUTY_PERSON"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td"> 联系电话： </td>
            <td>
              <el-form-item prop="T0002_TOUCH_TEL">
                <el-input
                  v-model.trim="editForm.T0002_TOUCH_TEL"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">经度： </td>
            <td>
              <el-form-item prop="T0002_ASSET_PRECI">
                <el-input
                  v-model.trim="editForm.T0002_ASSET_PRECI"
                  size="small"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td"> 纬度： </td>
            <td>
              <el-form-item prop="T0002_ASSET_LATI">
                <el-input
                  v-model.trim="editForm.T0002_ASSET_LATI"
                  size="small"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">图片上传：</td>
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
                v-model="editForm.T0002_ASSET_REAMRK"
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
      title=">> 查看资产"
      :visible.sync="infoShow"
      custom-class="dialog-div"
    >
      <table class="add-table">
        <tr>
          <td class="bg-td">资产名称：</td>
          <td>
            {{ infoForm.T0002_ASSET_NAME }}
          </td>
          <td class="bg-td">资产类别： </td>
          <td>
            {{ infoForm.T0001_ASSETTYPE_NAME }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">所属路段：</td>
          <td>
            {{ infoForm.T0002_LOAD_NAME }}
          </td>
          <td> </td>
          <td> </td>
        </tr>
        <tr>
          <td class="bg-td">起点桩号： </td>
          <td>
            {{ infoForm.T0002_START_PILE }}
          </td>
          <td class="bg-td">终点桩号：</td>
          <td>
            {{ infoForm.T0002_END_PILE }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">数量： </td>
          <td>
            {{ infoForm.T0002_ASSET_AMOUNT }}
          </td>
          <td class="bg-td">归属年份：</td>
          <td>
            {{ infoForm.T0002_ASSET_DATE }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">归属公司： </td>
          <td>
            {{ infoForm.T0002_ASSET_COMPANY }}
          </td>
          <td class="bg-td"> 所属养管公司： </td>
          <td>
            {{ infoForm.T0002_CURING_UNIT }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">责任人： </td>
          <td>
            {{ infoForm.T0002_DUTY_PERSON }}
          </td>
          <td class="bg-td"> 联系电话： </td>
          <td>
            {{ infoForm.T0002_TOUCH_TEL }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">经度： </td>
          <td>
            {{ infoForm.T0002_ASSET_PRECI }}
          </td>
          <td class="bg-td"> 纬度： </td>
          <td>
            {{ infoForm.T0002_ASSET_LATI }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">图片：</td>
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
            {{ infoForm.T0002_ASSET_REAMRK }}
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
    <!-- 地图 -->
    <el-dialog
      :visible.sync="mapShow"
      custom-class="dialog-div"
      title="地图位置"
    >
      <div style="height: 400px;">
        <el-amap
          vid="amapDiv"
          :center="mapData.position"
          :zoom="mapData.zoom"
          class="amap-demo"
        >
          <el-amap-marker
            vid="component-marker"
            :position="mapData.position"
            :content-render="mapData.contentRender"
          ></el-amap-marker>
        </el-amap>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    const validOrder = (rule, value, callback) => {
      let reg = /^[1-9]\d*$/
      if (!reg.test(value)) {
        callback(new Error('数量必须是正整数'))
      } else {
        callback()
      }
    }
    // 电话验证
    const validTel = (rule, value, callback) => {
      let regPhone = /^1[3456789]\d{9}$/ // 手机
      // let regTel = /^((0\d{2,3}-\d{7,8})|(1{2}]\d{9}))$/ // 固定
      if (!regPhone.test(value)) {
        callback(new Error('请输入正确的11位联系电话'))
      } else {
        callback()
      }
    }
    // 起点终点桩号
    const validPile = (rule, value, callback) => {
      let reg = /[0-9a-zA-Z]|[+,-]/
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
      mapShow: false, // 地图是否显示
      mapData: {
        zoom: 12, // 当前地图缩放比列
        position: [],
        title: [],
        contentRender: (h, instance) => {
          return h(
            'div',
            {
              style: { background: '#80cbc4', whiteSpace: 'nowrap' }
            },
            this.mapData.title
          )
        }
      },
      imageList: [],
      imgShow: false,
      imgShowUrl: '', // 预览图片
      imageUrl: '',
      header: {
        TokenId: sessionStorage.getItem('TokenId') // 上传文件token
      },
      dataParams: {
        ID: '',
        TABLE_NAME: 'ASSET_DATA'
      },
      loading: true,
      addShow: false,
      editShow: false,
      infoShow: false,
      editForm: {},
      addForm: {
        T0002_ASSET_NAME: '',
        T0001_ID: '',
        T0002_LOAD_NAME: '',
        T0002_START_PILE: '',
        T0002_END_PILE: '',
        T0002_ASSET_AMOUNT: '',
        T0002_ASSET_DATE: '',
        T0002_ASSET_COMPANY: '',
        T0002_CURING_UNIT: '',
        T0002_DUTY_PERSON: '',
        T0002_TOUCH_TEL: '',
        T0002_ASSET_PRECI: '',
        T0002_ASSET_LATI: '',
        T0002_ASSET_REAMRK: ''
      },
      rules: {
        T0002_ASSET_NAME: [
          { required: true, message: '请填写资产名称', trigger: 'blur' }
        ],
        T0001_ID: [
          { required: true, message: '请选择资产类别', trigger: 'change' }
        ],
        T0002_LOAD_NAME: [
          { required: true, message: '请选择所属路段', trigger: 'change' }
        ],
        T0002_START_PILE: [
          { required: true, message: '请填写起点桩号', trigger: 'blur' },
          { validator: validPile, trigger: 'blur' }
        ],
        T0002_END_PILE: [
          { required: true, message: '请填写起点桩号', trigger: 'blur' },
          { validator: validPile, trigger: 'blur' }
        ],
        T0002_ASSET_AMOUNT: [
          { required: true, message: '请填写数量', trigger: 'blur' },
          { validator: validOrder, trigger: 'blur' }
        ],
        T0002_ASSET_DATE: [
          {
            required: true,
            message: '请选择归属年份',
            trigger: 'change'
          }
        ],
        T0002_CURING_UNIT: [
          { required: true, message: '请填写所属养管公司', trigger: 'blur' }
        ],
        T0002_DUTY_PERSON: [
          { required: true, message: '请填写责任人', trigger: 'blur' }
        ],
        T0002_TOUCH_TEL: [
          { required: true, message: '请填写联系电话', trigger: 'blur' },
          { validator: validTel, trigger: 'blur' }
        ],
        T0002_ASSET_PRECI: [
          { required: true, message: '请填写经度', trigger: 'blur' },
          { validator: validPreci, trigger: 'blur' }
        ],
        T0002_ASSET_LATI: [
          { required: true, message: '请填写纬度', trigger: 'blur' },
          { validator: validLati, trigger: 'blur' }
        ]
      },
      infoForm: {},
      showCount: 10,
      currentPage: 1,
      total: 0,
      searchMap: {
        T0001_ID: '',
        YEAR: '',
        SEARCH_KEY: '',
        T0002_START_PILE: '',
        T0002_END_PILE: ''
      },
      tableData: [],
      selectList: [],
      assetTypeList: [], // 资产类别
      listNameList: [], // 所属路段
      pileList: [], // 起点 / 终点桩号
      isSearch: false, // 是否搜索
      searchVal: '' // 显示搜索内容
    }
  },
  methods: {
    // 请求所有的起点 / 终点桩号
    assetDataFun () {
      this.$api.post('/cycle/assetData/listAll', {}, null, r => {
        this.pileList = r.data
      })
    },
    // 点击地图
    locationFun (data) {
      this.mapData.title = []
      this.mapShow = true
      this.mapData.position = [data.T0002_ASSET_PRECI, data.T0002_ASSET_LATI]
      this.mapData.title.push(data.T0002_ASSET_NAME)
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
      this.getAssetList()
    },
    // 重置
    reset () {
      this.isSearch = false
      this.pileList = []
      this.searchMap.T0001_ID = ''
      this.searchMap.YEAR = ''
      this.searchMap.SEARCH_KEY = ''
      this.searchMap.T0002_START_PILE = ''
      this.searchMap.T0002_END_PILE = ''
      this.showCount = 10
      this.currentPage = 1
      this.getAssetList()
    },
    // 分页
    sizeChange (val) {
      this.showCount = val
      this.getAssetList()
    },
    currentChange (val) {
      this.currentPage = val
      this.getAssetList()
    },
    selectTable (selection) {
      this.selectList = selection
    },
    selectAll (selection) {
      this.selectList = selection
    },
    addFun () {
      this.addShow = true
      this.imageUrl = ''
      this.dataParams.ID = ''
      this.imageList = []
      this.$nextTick(() => {
        this.$refs['addFormRef'].resetFields()
      })
      this.$api.post(`/cycle/utilData/getId`, {}, null, r => {
        this.dataParams.ID = r.data
        this.addForm.T0002_ID = r.data
      })
    },
    // 新增保存
    addSaveFun () {
      this.$refs['addFormRef'].validate(valid => {
        if (valid) {
          this.$api.post(`/cycle/assetData/insert`, this.addForm, null, r => {
            this.$message.success('新增成功')
            this.getAssetList()
            this.addShow = false
          })
        }
      })
    },
    handleInfo (data) {
      this.infoShow = true
      this.imageList = []
      this.$api.post(
        `/cycle/assetData/selectById?ID=${data.T0002_ID}`,
        {},
        null,
        r => {
          this.imageList = r.data.files
          this.infoForm = Object.assign({}, r.data)
        }
      )
    },
    handleEdit (data) {
      this.editShow = true
      this.imageUrl = ''
      this.imageList = []
      this.dataParams.ID = data.T0002_ID
      this.$api.post(
        `/cycle/assetData/selectById?ID=${data.T0002_ID}`,
        {},
        null,
        r => {
          this.imageList = r.data.files
          this.editForm = Object.assign({}, r.data)
        }
      )
    },
    // 修改保存
    editSaveFun () {
      this.$refs['editFormRef'].validate(valid => {
        if (valid) {
          this.$api.post(`/cycle/assetData/update`, this.editForm, null, r => {
            this.$message.success('修改成功')
            this.editShow = false
            this.getAssetList()
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
    // 请求select 的所属路段
    getListNameList () {
      this.$api.post('/cycle/load/listLoadName', {}, null, r => {
        this.listNameList = r.data
      })
    },
    // 资产信息list
    getAssetList () {
      let _data = {
        currentPage: this.currentPage,
        showCount: this.showCount,
        searchMap: this.searchMap
      }
      this.$api.post(`/cycle/assetData/listPage`, _data, null, r => {
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
          `/cycle/assetData/deleteById?ID=${data.T0002_ID}`,
          {},
          null,
          r => {
            this.$message.success('删除成功')
            this.getAssetList()
          }
        )
      })
    },
    // 批量删除
    delListFun () {
      let _list = []
      if (this.selectList.length > 0) {
        for (let i = 0; i < this.selectList.length; i++) {
          _list.push(this.selectList[i].T0002_ID)
        }
        this.$confirm('确定要删除这些记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post(
            `/cycle/assetData/deleteByIds?IDS=${_list}`,
            {},
            null,
            r => {
              this.$message.success('删除成功')
              this.getAssetList()
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
        this.$message.warning('请先增加资产信息')
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
        this.imageUrl = ''
        this.getAssetList()
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
            this.getAssetList()
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
    this.getAssetList()
    this.getListNameList()
    this.assetDataFun()
  }
}
</script>
<style lang="scss">
.assets-wrap {
  .title-p {
    margin-bottom: 10px;
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
