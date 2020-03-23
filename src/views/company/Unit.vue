/*
 * @Description：下属单位管理
 */
<template>
  <div class="assets-wrap">
    <p class="title-p">
      <span style="display:inline-block;margin-bottom:20px;"> >> 单位列表 </span>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="openDialog('add')"
      >添加单位</el-button>
    </p>
    <div class="content">
      <el-row :gutter="10">
        <el-form
          label-position="right"
          label-width="110px"
          :model="form"
        >
          <el-col :span="5">
            <el-form-item label="请选择下属单位">
              <el-select
                v-model="searchMap.M0018_ID"
                style="width:100%"
              >
                <el-option
                  v-for="item in listNameList"
                  :key="item.M0018_ID"
                  :label="item.M0018_SIMPLE_NAME"
                  :value="item.M0018_ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="请输入关键字">
              <el-input
                placeholder="请输入关键字"
                v-model="searchMap.SEARCH_KEY"
                style="width:100%"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
              <el-button
          type="primary"
          @click="searchFun"
        >搜索</el-button>
        <el-button @click="reset">重置</el-button>
            </el-col>
        </el-form>
      </el-row>
      <div class="div-btn">
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
            prop="M0018_SIMPLE_NAME"
            label="单位简称"
            show-overflow-tooltip
          >
          </el-table-column>
           <el-table-column
            prop="M0008_HIGHSPEED_ABBR"
            label="管辖高速"
          >
          </el-table-column>
          <el-table-column
            label="位置"
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
            prop="M0018_COMPANY_ADRESS"
            label="地址"
          >
          </el-table-column>
          <el-table-column
            prop="M0018_SENIOR_USER"
            label="高级管理员"
          >
          </el-table-column>
          <el-table-column
            prop="M0018_REAL_NAME"
            label="真实姓名"
          >
          </el-table-column>
           <el-table-column
            prop="M0018_USER_EMAIL"
            label="邮箱"
          >
          </el-table-column>
           <el-table-column
            prop="M0018_USER_TEL"
            label="手机号"
          >
          </el-table-column>
          <el-table-column
            prop="M0018_DATA_UPDATE"
            label="启用时间"
            width="120"
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
          > 小贴士 </td>
        </tr>
        <tr>
          <td class="title-info"> 各下属单位高级管理员由集团高级管理员分配；即在创建该下属公司的同时，分配该单位管理员； </td>
        </tr>
      </table>
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
            <td class="bg-td">单位名称：</td>
            <td>
              <el-form-item prop="M0018_COMPANY_NAME">
                <el-input
                  v-model.trim="form.M0018_COMPANY_NAME"
                  size="small"
                  maxlength="50"
                   :disabled="islook"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">简称 </td>
            <td>
              <el-form-item prop="M0018_SIMPLE_NAME">
                <el-input
                  v-model.trim="form.M0018_SIMPLE_NAME"
                  size="small"
                  maxlength="50"
                   :disabled="islook"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">管辖高速</td>
            <td>
              <!-- <el-form-item prop="M0008_HIGHSPEED_ABBR"> -->
                <el-select
                  v-model="form.M0008_ID"
                  style="width:100%"
                  size="small"
                   :disabled="islook"
                >
                  <el-option
                    v-for="(item,index ) in assetTypeList"
                    :key="index"
                    :label="item.M0008_HIGHSPEED_ABBR"
                    :value="item.M0008_ID"
                  >
                  </el-option>
                </el-select>
              <!-- </el-form-item> -->
            </td>

            <td class="bg-td">是否激活：</td>
                <td>
                  <el-switch
                    v-model="form.isBlue"
                    active-color="#409eff"
                    inactive-color="#bbb"
                    :disabled="islook"
                    @change="isBlueChange"
                  >
                  </el-switch>
                </td>

          </tr>
          <tr>
            <td class="bg-td">高级管理员用户名</td>
            <td>
              <el-form-item prop="M0018_SENIOR_USER">
                <el-input
                  v-model.trim="form.M0018_SENIOR_USER"
                  size="small"
                  maxlength="20"
                  @change="isHaveName"
                   :disabled="islook"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">真实姓名</td>
            <td>
              <el-form-item prop="M0018_REAL_NAME">
                <el-input
                  v-model.trim="form.M0018_REAL_NAME"
                  size="small"
                  maxlength="20"
                   :disabled="islook"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">邮箱</td>
            <td>
              <el-form-item prop="M0018_USER_EMAIL">
                <el-input
                  v-model.trim="form.M0018_USER_EMAIL"
                  size="small"
                   :disabled="islook"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td"> 手机号 </td>
            <td>
              <el-form-item prop="M0018_USER_TEL">
                <el-input
                  v-model.trim="form.M0018_USER_TEL"
                  size="small"
                  maxlength="20"
                   :disabled="islook"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
           <tr>
            <td class="bg-td">经度： </td>
            <td>
              <el-form-item prop="M0018_COMPANY_PRECI">
                <el-input
                  v-model.trim="form.M0018_COMPANY_PRECI"
                  size="small"
                   :disabled="islook"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td"> 纬度： </td>
            <td>
              <el-form-item prop="M0018_COMPANY_LATI">
                <el-input
                  v-model.trim="form.M0018_COMPANY_LATI"
                  size="small"
                   :disabled="islook"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">地址 </td>
            <td colspan="3">
              <el-form-item prop="M0018_COMPANY_ADRESS">
                <el-input
                  v-model.trim="form.M0018_COMPANY_ADRESS"
                  size="small"
                  maxlength="50"
                   :disabled="islook"
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
                 :disabled="islook"
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
            <td class="bg-td">简介（备注）：</td>
            <td colspan="3">
              <el-input
                type="textarea"
                :rows="6"
                v-model="form.M0018_COMPANY_REMARK"
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
    <!-- 查看单位 -->
    <!--  -->
    <!--  -->
    <!--  -->
    <el-dialog
      :title="dialogName"
      :visible.sync="lookShow"
       :before-close="closeDialog"
      custom-class="dialog-div"
    >
    <!-- // 图片 -->
      <el-image :src="imgShowUrl" style='width:48%;float:right' v-if="this.imgShowUrl">
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
        <!-- 地图 -->
        <div style="height: 350px;width:48%;float:left;margin-bottom:60px">
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
      <!-- 表单 -->
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
      >
        <table class="add-table">
          <tr>
            <td class="bg-td">单位名称：</td>
            <td>{{this.form.M0018_COMPANY_NAME}}
            </td>
            <td class="bg-td">简称 </td>
            <td>{{this.form.M0018_SIMPLE_NAME}}
            </td>
          </tr>
          <tr>
            <td class="bg-td">管辖高速</td>
            <td>{{this.form.M0008_HIGHSPEED_ABBR}}
            </td>
            <td class="bg-td">地址 </td>
            <td>{{this.form.M0018_COMPANY_ADRESS}}
            </td>

          </tr>
          <tr>
            <td class="bg-td">高级管理员用户名</td>
            <td>{{this.form.M0018_SENIOR_USER}}
            </td>
            <td class="bg-td">真实姓名</td>
            <td>{{this.form.M0018_REAL_NAME}}
            </td>
          </tr>
          <tr>
            <td class="bg-td">邮箱</td>
            <td>{{this.form.M0018_USER_EMAIL}}
            </td>
            <td class="bg-td"> 手机号 </td>
            <td>{{this.form.M0018_USER_TEL}}
            </td>
          </tr>
           <tr>
            <td class="bg-td">经度： </td>
            <td>{{this.form.M0018_COMPANY_PRECI}}
            </td>
            <td class="bg-td"> 纬度： </td>
            <td>{{this.form.M0018_COMPANY_LATI}}
            </td>
          </tr>
          <tr>
            <td class="bg-td">启用时间 </td>
            <td>{{this.form.M0018_DATA_UPDATE}}
            </td>
             <td class="bg-td">状态</td>
                <td>
                  <!-- <template slot-scope="scope"> -->
                  <el-switch
                    v-model="form.isBlue"
                    active-color="#409eff"
                    inactive-color="#bbb"
                    :disabled="islook"
                  >
                  </el-switch>
                  <!-- </template> -->
                </td>
          </tr>
          <tr>
            <td class="bg-td">简介（备注）：</td>
            <td colspan="3">{{this.form.M0018_COMPANY_REMARK}}
          </td>
          </tr>
        </table>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
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
      dialogName: '新增单位',
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
      islook: false,
      isBlue: false,
      imageList: [],
      imgShow: false,
      imgShowUrl: '', // 预览图片
      imageUrl: '',
      header: {
        TokenId: sessionStorage.getItem('TokenId') // 上传文件token
      },
      dataParams: {
        ID: '',
        TABLE_NAME: 'COMPANY'
      },
      loading: true,
      addShow: false,
      lookShow: false,
      form: {
        M0018_USER_EMAIL: '',
        M0018_COMPANY_REMARK: '',
        M0008_HIGHSPEED_ABBR: '',
        M0018_COMPANY_LATI: '',
        M0008_ID: '',
        M0018_COMPANY_PRECI: '',
        M0018_SIMPLE_NAME: '',
        M0018_REAL_NAME: '',
        M0008_END_PILE: '',
        M0008_START_PILE: '',
        M0018_SENIOR_USER: '',
        M0018_DATA_UPDATE: '',
        M0018_COMPANY_ADRESS: '',
        M0018_USER_TEL: '',
        M0018_ID: '',
        M0018_DATA_STATE: true,
        isBlue: true
      },
      rules: {
        M0018_COMPANY_NAME: [
          { required: true, message: '请填写单位名称', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/, message: '单位名称不支持特殊字符', trigger: 'blur' }
        ],
        M0018_SIMPLE_NAME: [
          { required: true, message: '请填写单位简称', trigger: 'blur' }
        ],
        // M0008_HIGHSPEED_ABBR: [
        //   { required: true, message: '请选择管辖高速', trigger: 'change' }
        // ],
        M0018_SENIOR_USER: [
          { required: true, message: '请填写高级管理员用户名', trigger: 'blur' }
          // { validator: validPile, trigger: 'blur' }
        ],
        M0018_REAL_NAME: [
          { required: true, message: '请填写真实姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          // { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/, message: '姓名不支持特殊字符', trigger: 'blur' }
          { pattern: /^[\u4E00-\u9FA5]+$/, message: '用户名只能为中文' }
        ],
        M0018_USER_EMAIL: [
          { required: true, message: '请填写邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        M0018_COMPANY_ADRESS: [
          { required: true, message: '请填写地址', trigger: 'blur' }
        ],
        M0018_USER_TEL: [
          { required: true, message: '请填写联系电话', trigger: 'blur' },
          { validator: validTel, trigger: 'blur' }
        ],
        M0018_COMPANY_PRECI: [
          { required: true, message: '请填写经度', trigger: 'blur' },
          { validator: validPreci, trigger: 'blur' }
        ],
        M0018_COMPANY_LATI: [
          { required: true, message: '请填写纬度', trigger: 'blur' },
          { validator: validLati, trigger: 'blur' }
        ]
      },
      showCount: 10,
      currentPage: 1,
      total: 0,
      searchMap: {
        M0018_ID: '',
        SEARCH_KEY: ''
      },
      SEARCH_KEY: '',
      tableData: [],
      selectList: [],
      assetTypeList: [], // 管辖高速
      listNameList: [],
      pileList: [], // 起点 / 终点桩号
      isSearch: false, // 是否搜索
      searchVal: '' // 显示搜索内容
    }
  },
  methods: {

    // 搜索
    searchFun () {
      this.isSearch = true
      let _data = {
        currentPage: this.currentPage,
        showCount: this.showCount,
        searchMap: this.searchMap
      }
      console.log(_data)
      this.$api.post('/cycle/companyManager/listPage', _data, null, r => {
        console.log(r)
        this.loading = false
        this.tableData = r.data.returnParam
        this.total = r.data.totalResult
        this.searchVal = r.search_val
      })
    },
    // 重置
    reset () {
      this.isSearch = false
      this.pileList = []
      this.searchMap = {}
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
    // 列表页
    getAssetList () {
      // this.searchMap.M0018_ID = sessionStorage.getItem('id')
      let _data = {
        currentPage: this.currentPage,
        showCount: this.showCount,
        searchMap: this.searchMap
      }
      this.$api.post('/cycle/companyManager/listPage', _data, null, r => {
        this.loading = false
        this.tableData = r.data.returnParam
        this.tableData.forEach(v => {
          v.isBlue = !!((v.M0018_DATA_STATE === '1' || v.M0018_DATA_STATE === 1))
        })
        this.total = r.data.totalResult
        this.searchVal = r.search_val
      })
    },
    isBlueChange () {
      this.$forceUpdate()
    },
    isHaveName () {
      this.$api.post('/cycle/userManagement/isExist?userName=' + this.form.M0018_SENIOR_USER, {}, null, r => {
        if (r.data === true) {
          this.$message.warning('用户名已存在，请重新输入')
          this.form.M0018_SENIOR_USER = ''
        }
      })
    },
    openDialog (type, row) {
      this.imageUrl = ''
      this.imageList = []
      if (type === 'add') {
        this.addShow = true
        this.dialogName = '新增单位'
        this.form.M0018_DATA_STATE = this.form.isBlue
        this.dialogType = 'new'
        this.dataParams.ID = ''
        this.$api.post(`/cycle/utilData/getId`, {}, null, r => {
          this.dataParams.ID = r.data
          this.form.M0018_ID = r.data
        })
      }
      if (type === 'edit') {
        this.addShow = true
        this.dialogName = '编辑单位'
        this.form = row

        this.form.isBlue = !!((this.form.M0018_DATA_STATE === '1' || this.form.M0018_DATA_STATE === 1))
        // this.form.isBlue = Object.assign({}, row.isBlue)

        console.log(this.form)
        // this.form.M0018_DATA_STATE = this.form.isBlue
        this.dialogType = 'edit'
        this.dataParams.ID = row.M0018_ID
        this.$api.post(
          `/cycle/companyManager/selectById?ID=${row.M0018_ID}`,
          {},
          null,
          r => {
            this.imageList = r.data.files
          }
        )
      }
      if (type === 'look') {
        this.lookShow = true
        this.dialogName = '查看单位'
        this.form = row
        this.islook = true
        // 地图显示
        this.mapData.position = [row.M0018_COMPANY_PRECI, row.M0018_COMPANY_LATI]
        this.mapData.title.push(row.M0018_COMPANY_NAME)
        this.$api.post(
          `/cycle/companyManager/selectById?ID=${row.M0018_ID}`,
          {},
          null,
          r => {
            this.imageList = r.data.files
            // 图片显示
            this.imageList.forEach(v => {
              this.imgShowUrl = v.FILE_URL
            })
          }
        )
      }
    },
    save () {
      // this.form.M0018_ID = sessionStorage.getItem('id')
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.M0008_ID === '') {
            this.form.M0008_ID = '0'
          }
          if (this.dialogType === 'new') {
            this.$api.post('/cycle/companyManager/insert', this.form, '新增成功', r => {
              this.closeDialog()
            })
          }
          if (this.dialogType === 'edit') {
            this.form.M0018_DATA_STATE = this.form.isBlue ? 1 : 0
            if (this.form.M0008_ID === '0') {
              this.form.M0008_ID = ''
            }
            this.$api.post('/cycle/companyManager/update', this.form, '编辑成功', r => {
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
        this.$api.post('/cycle/companyManager/deleteById?ID=' + row.M0018_ID, {}, '删除成功', r => {
          this.getAssetList()
        })
      })
    },
    closeDialog () {
      this.$refs['form'].resetFields()
      this.addShow = false
      this.lookShow = false
      this.islook = false
      this.form = {}
      this.mapData.title = []
      this.imgShowUrl = ''
      this.getAssetList()
    },
    resetDialog () {
      this.addShow = false
      this.lookShow = false
      this.$refs['form'].resetFields()
      this.closeDialog()
    },
    // 获取管辖高速
    getAssetTypeList () {
      this.$api.post(`/cycle/highspeed/listAll`, { 'M0018_ID': this.form.M0018_ID }, null, r => {
        console.log(r)
        this.assetTypeList = r.data
        console.log(this.assetTypeList)
      })
    },
    // 获取选择下属单位
    getListNameList () {
      this.$api.post('/cycle/companyManager/listAll', { 'M0018_ID': this.form.M0018_ID }, null, r => {
        console.log(r.data)
        this.listNameList = r.data
      })
    },

    // 批量删除
    delListFun () {
      let _list = []
      if (this.selectList.length > 0) {
        for (let i = 0; i < this.selectList.length; i++) {
          _list.push(this.selectList[i].M0018_ID)
        }
        this.$confirm('确定要删除这些记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post(
            `/cycle/companyManager/deleteByIds?IDS=${_list}`,
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
        this.$message.warning('请先增加单位')
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
    // 点击图片
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
    },
    // 点击地图
    locationFun (data) {
      this.mapData.title = []
      this.mapShow = true
      this.mapData.position = [data.M0018_COMPANY_PRECI, data.M0018_COMPANY_LATI]
      this.mapData.title.push(data.M0018_COMPANY_NAME)
    }
  },
  created () {
    this.getAssetTypeList()
    this.getAssetList()
    this.getListNameList()
  }
}
</script>
<style lang="scss">
.assets-wrap {
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
      text-align: left ;
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
        padding: 20px 10px;
      }
    }
    .bg-td {
      background: #f0f0f0;
      text-align: center;
      width:20%;
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
//   .el-table td {
//     border-bottom: none;
// }
.el-table .cell{
  padding-right:0;
}
}
</style>
