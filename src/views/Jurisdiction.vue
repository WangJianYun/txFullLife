/* * @Author: liuhaosheng * @Description：分公司管辖路段列表 */
<template>
  <div class="jurisdiction-wrap">
    <p class="title-p">
      <span style="display:inline-block;margin-bottom:20px;"
        >>> 分公司管辖路段列表</span
      >
      <el-button type="primary" icon="el-icon-plus" @click="addFun"
        >分公司管辖路段配置</el-button
      >
    </p>
    <div class="content">
      <el-form :model="searchMap" label-width="80px" :inline="true">
        <el-form-item label="所属路段">
          <el-select v-model="searchMap.M0010_LOAD_NAME" placeholder="请选择">
            <el-option
              v-for="(item, index) in listNameList"
              :key="index"
              :label="item.M0010_LOAD_NAME"
              :value="item.M0010_LOAD_NAME"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchFun">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <p class="div-btn">
        <el-button type="primary" icon="el-icon-delete" @click="delListFun"
          >批量删除</el-button
        >
        <span class="serach-span">
          您的检索：
          <span v-show="!isSearch"> 无 </span>
          <span> {{ searchVal }} </span>
        </span>
      </p>
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
            prop="M0010_LOAD_NAME"
            label="路段名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="M0010_CURING_UNIT"
            label="管理公司"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="M0010_START_PILE" label="起点桩号">
          </el-table-column>
          <el-table-column prop="M0010_END_PILE" label="终点桩号">
          </el-table-column>
          <el-table-column prop="M0010_LOAD_PRECI" label="经度">
          </el-table-column>
          <el-table-column prop="M0010_LOAD_LATI" label="纬度">
          </el-table-column>
          <el-table-column label="图片" align="center" width="80">
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
    <!-- 新增 -->
    <el-dialog
      title=">> 增加分公司管辖路段"
      :visible.sync="addShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <el-form :model="addForm" :rules="rules" ref="addFormRef">
        <table class="add-table">
          <tr>
            <td class="bg-td">路段名称：</td>
            <td>
              <el-form-item prop="M0010_LOAD_NAME">
                <el-input
                  v-model.trim="addForm.M0010_LOAD_NAME"
                  size="small"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">养管单位名称：</td>
            <td>
              <el-form-item prop="M0010_CURING_UNIT">
                <el-input
                  v-model.trim="addForm.M0010_CURING_UNIT"
                  size="small"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">起点桩号：</td>
            <td>
              <el-form-item prop="M0010_START_PILE">
                <el-input
                  v-model.trim="addForm.M0010_START_PILE"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">终点桩号：</td>
            <td>
              <el-form-item prop="M0010_END_PILE">
                <el-input
                  v-model.trim="addForm.M0010_END_PILE"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">经度：</td>
            <td>
              <el-form-item prop="M0010_LOAD_PRECI">
                <el-input
                  v-model.trim="addForm.M0010_LOAD_PRECI"
                  size="small"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">纬度：</td>
            <td>
              <el-form-item prop="M0010_LOAD_LATI">
                <el-input
                  v-model.trim="addForm.M0010_LOAD_LATI"
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
            <td class="bg-td">简介（备注）：</td>
            <td colspan="3">
              <el-form-item prop="M0010_LOAD_REMARK">
                <el-input
                  type="textarea"
                  maxlength="500"
                  v-model="addForm.M0010_LOAD_REMARK"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addShow = false">取 消</el-button>
        <el-button type="primary" @click="addSaveFun">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      title=">> 修改分公司管辖路段"
      :visible.sync="editShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <el-form :model="editForm" :rules="rules" ref="editFormRef">
        <table class="add-table">
          <tr>
            <td class="bg-td">路段名称：</td>
            <td>
              <el-form-item prop="M0010_LOAD_NAME">
                <el-input
                  v-model.trim="editForm.M0010_LOAD_NAME"
                  size="small"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">养管单位名称：</td>
            <td>
              <el-form-item prop="M0010_CURING_UNIT">
                <el-input
                  v-model.trim="editForm.M0010_CURING_UNIT"
                  size="small"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">起点桩号：</td>
            <td>
              <el-form-item prop="M0010_START_PILE">
                <el-input
                  v-model.trim="editForm.M0010_START_PILE"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">终点桩号：</td>
            <td>
              <el-form-item prop="M0010_END_PILE">
                <el-input
                  v-model.trim="editForm.M0010_END_PILE"
                  size="small"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">经度：</td>
            <td>
              <el-form-item prop="M0010_LOAD_PRECI">
                <el-input
                  v-model.trim="editForm.M0010_LOAD_PRECI"
                  size="small"
                ></el-input>
              </el-form-item>
            </td>
            <td class="bg-td">纬度：</td>
            <td>
              <el-form-item prop="M0010_LOAD_LATI">
                <el-input
                  v-model.trim="editForm.M0010_LOAD_LATI"
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
            <td class="bg-td">简介（备注）：</td>
            <td colspan="3">
              <el-form-item prop="M0010_LOAD_REMARK">
                <el-input
                  type="textarea"
                  maxlength="500"
                  v-model="editForm.M0010_LOAD_REMARK"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editShow = false">取 消</el-button>
        <el-button type="primary" @click="editSaveFun">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog
      title=">> 查看分公司管辖路段"
      :visible.sync="infoShow"
      custom-class="dialog-div"
    >
      <table class="add-table">
        <tr>
          <td class="bg-td">路段名称：</td>
          <td>
            {{ infoForm.M0010_LOAD_NAME }}
          </td>
          <td class="bg-td">养管单位名称：</td>
          <td>
            {{ infoForm.M0010_CURING_UNIT }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">起点桩号：</td>
          <td>
            {{ infoForm.M0010_START_PILE }}
          </td>
          <td class="bg-td">终点桩号：</td>
          <td>
            {{ infoForm.M0010_END_PILE }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">经度：</td>
          <td>
            {{ infoForm.M0010_LOAD_PRECI }}
          </td>
          <td class="bg-td">纬度：</td>
          <td>
            {{ infoForm.M0010_LOAD_LATI }}
          </td>
        </tr>
        <tr>
          <td class="bg-td">图片：</td>
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
          <td class="bg-td">简介（备注）：</td>
          <td colspan="3">
            {{ infoForm.M0010_LOAD_REMARK }}
          </td>
        </tr>
      </table>

      <div slot="footer"></div>
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
    // 不能输入文本
    const validNoText = (rule, value, callback) => {
      let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
      if (reg.test(value)) {
        callback(new Error('不能输入文本'))
      } else {
        callback()
      }
    }
    // 经度正则表达式（-180 至 180）
    const validPreci = (rule, value, callback) => {
      let reg = /^-?((0|1?[0-8]?[0-9]?)(([.][0-9]{1,10})?)|180(([.][0]{1,10})?))$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的经度'))
      } else {
        callback()
      }
    }
    // 纬度正则表达式(-90 至 90)
    const validLati = (rule, value, callback) => {
      let reg = /^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,10})?)|90(([.][0]{1,10})?))$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的纬度'))
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
        TABLE_NAME: 'LOAD'
      },
      loading: true,
      addShow: false,
      infoShow: false,
      editShow: false,
      addForm: {
        M0010_LOAD_NAME: '',
        M0010_CURING_UNIT: '',
        M0010_START_PILE: '',
        M0010_END_PILE: '',
        M0010_LOAD_PRECI: '',
        M0010_LOAD_LATI: '',
        M0010_LOAD_REMARK: ''
      },
      editForm: {},
      infoForm: {},
      rules: {
        M0010_LOAD_NAME: [
          { required: true, message: '请填写路段名称', trigger: 'blur' }
        ],
        M0010_CURING_UNIT: [
          { required: true, message: '请填写养管单位名称', trigger: 'blur' }
        ],
        M0010_START_PILE: [
          { required: true, message: '请填写起点桩号', trigger: 'blur' },
          { validator: validNoText, trigger: 'blur' }
        ],
        M0010_END_PILE: [
          { required: true, message: '请填写终点桩号', trigger: 'blur' },
          { validator: validNoText, trigger: 'blur' }
        ],
        M0010_LOAD_PRECI: [
          { required: true, message: '请填写经度', trigger: 'blur' },
          { validator: validPreci, trigger: 'blur' }
        ],
        M0010_LOAD_LATI: [
          { required: true, message: '请填写纬度', trigger: 'blur' },
          { validator: validLati, trigger: 'blur' }
        ]
      },
      tableData: [],
      showCount: 10,
      currentPage: 1,
      total: 0,
      searchMap: {
        M0010_LOAD_NAME: ''
      },
      selectList: [],
      listNameList: [],
      isSearch: false, // 是否搜索
      searchVal: '' // 搜索内容
    }
  },
  methods: {
    // 搜索
    searchFun() {
      this.isSearch = true
      this.getLoadList()
    },
    // 重置
    reset() {
      this.isSearch = false
      this.searchMap.M0010_LOAD_NAME = ''
      this.getLoadList()
    },
    // 分页
    sizeChange(val) {
      this.showCount = val
      this.getLoadList()
    },
    currentChange(val) {
      this.currentPage = val
      this.getLoadList()
    },
    selectTable(selection) {
      this.selectList = selection
    },
    selectAll(selection) {
      this.selectList = selection
    },
    // 点击查看
    handleInfo(data) {
      this.imageList = []
      this.infoShow = true
      this.infoForm = Object.assign({}, data)
      this.imageList = data.files
    },
    // 点击修改
    handleEdit(data) {
      this.imageList = []
      this.editShow = true
      this.imageUrl = ''
      this.dataParams.ID = data.M0010_ID
      this.$api.post(
        `/cycle/load/selectById?ID=${data.M0010_ID}`,
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
      this.$refs['editFormRef'].validate(valid => {
        if (valid) {
          this.$api.post(`/cycle//load/update`, this.editForm, null, r => {
            this.$message.success('修改成功')
            this.editShow = false
            this.getLoadList()
          })
        }
      })
    },
    // 请求select 的所属路段
    getListNameList() {
      this.$api.post('/cycle/load/listLoadName', {}, null, r => {
        this.listNameList = r.data
      })
    },
    // 点击新增
    addFun() {
      this.addShow = true
      this.dataParams.ID = ''
      this.imageList = []
      this.imageUrl = ''
      this.$nextTick(() => {
        this.$refs['addFormRef'].resetFields()
      })
      this.$api.post(`/cycle/utilData/getId`, {}, null, r => {
        this.dataParams.ID = r.data
        this.addForm.M0010_ID = r.data
      })
    },
    // 新增保存
    addSaveFun() {
      this.$refs['addFormRef'].validate(valid => {
        if (valid) {
          this.$api.post('/cycle/load/insert', this.addForm, null, r => {
            this.$message.success('新增成功')
            this.addShow = false
            this.getLoadList()
          })
        }
      })
    },
    //  管辖路段 列表
    getLoadList() {
      let _data = {
        currentPage: this.currentPage,
        showCount: this.showCount,
        searchMap: this.searchMap
      }
      this.$api.post(`/cycle/load/listPage`, _data, null, r => {
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
    // 点击删除
    handleDelete(data) {
      this.$confirm('确定要删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post(
          `/cycle/load/deleteById?ID=${data.M0010_ID}`,
          {},
          null,
          r => {
            this.$message.success('删除成功')
            this.getLoadList()
            this.getListNameList()
          }
        )
      })
    },
    // 批量删除
    delListFun() {
      let _list = []
      if (this.selectList.length > 0) {
        for (let i = 0; i < this.selectList.length; i++) {
          _list.push(this.selectList[i].M0010_ID)
        }
        this.$confirm('确定要删除这些记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post(
            `/cycle/load/deleteByIds?IDS=${_list}`,
            {},
            null,
            r => {
              this.$message.success('删除成功')
              this.getLoadList()
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
        this.$message.warning('请先新建管辖路段')
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
        this.getLoadList()
        this.imageUrl = ''
        this.imageList.push(Object.assign({}, r.data[0]))
      })
    },
    clickImgFun(data) {
      this.imgShowUrl = data.FILE_URL
      this.imgShow = true
    },
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
            this.getLoadList()
            this.imageList = this.imageList.filter(item => {
              return item.M0013_ID !== data.M0013_ID
            })
          }
        )
      })
    }
  },
  created() {
    this.getLoadList()
    this.getListNameList()
  }
}
</script>
<style lang="scss">
.jurisdiction-wrap {
  .ul-img {
    display: inline;
    list-style: none;
    margin: 0;
  }
  .div-btn {
    margin: 10px 0;
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
