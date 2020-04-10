<template>
  <div id="personal">
    <!-- <el-row style="line-height:20px;" class="tbTitle">
      <el-col :span="4">
        <span style="font-size:20px;">>> 我的资料</span>
      </el-col>
      
    </el-row>
    <el-row class="tbWrap">
      <el-col :span="18" :offset="3">
        <table class="perstable">
          <tr>
            <td class="bg-td">昵称：</td>
            <td>
              <el-input
                type="text"
                v-model="form.M0014_USER_CODE"
                :disabled="isEdit"
                size="small"
              ></el-input>
            </td>
            <td class="bg-td">真实姓名：</td>
            <td>
              <el-input
                type="text"
                v-model="form.M0014_USER_NAME"
                :disabled="isEdit"
                size="small"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg-td">归属机构：</td>
            <td>
              <el-input
                type="text"
                v-model="form.DEPART_NAME"
                :disabled="isEdit"
                size="small"
              ></el-input>
            </td>
            <td class="bg-td">职务：</td>
            <td>
              <el-input
                type="text"
                v-model="form.DUTY_NAME"
                :disabled="isEdit"
                size="small"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg-td">电子邮箱：</td>
            <td>
              <el-input
                type="text"
                v-model="form.M0014_USER_EMAIL"
                :disabled="isEdit"
                size="small"
              ></el-input>
            </td>
            <td class="bg-td">手机号：</td>
            <td>
              <el-input
                type="text"
                v-model="form.M0014_USER_TEL"
                :disabled="isEdit"
                size="small"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg-td" :disabled="isEdit">是否激活：</td>
            <td style="text-align:left">
              <el-switch
                v-model="form.M0014_IS_AVTIVE"
                active-color="#409eff"
                size="small"
                inactive-color="#bbb"
              >
              </el-switch>
            </td>
            <td class="bg-td"></td>
            <td></td>
          </tr>
          <tr>
            <td class="bg-td">备注：</td>
            <td colspan="3">
              <el-input
                type="textarea"
                rows="5"
                v-model="form.M0014_USER_REMARK"
                :disabled="isEdit"
                size="small"
              ></el-input>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <el-row style="line-height:20px;" class="tbTitle">
      <el-col :span="4">
        <span style="font-size:20px;">>> 修改密码</span>
      </el-col>
    </el-row>
    <el-row class="tbWrap">
      <el-col :span="10" :offset="3">
        <table class="perstable">
          <tr>
            <td>账户名：</td>
            <td>
              <el-input
                type="text"
                v-model="form.M0014_USER_CODE"
                :disabled="isEdit"
                size="small"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>原始密码：</td>
            <td>
              <el-input
                type="password"
                v-model="form.oldpswd"
                size="small"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>新密码：</td>
            <td>
              <el-input
                type="password"
                v-model="form.newpswd"
                size="small"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>再次确认密码：</td>
            <td>
              <el-input
                type="password"
                v-model="form.confirmpswd"
                size="small"
              ></el-input>
            </td>
          </tr>
        </table>
        <div style="text-align:center;margin-top:20px;">
          <el-button type="primary" size="small" @click="save">提交</el-button>
          <el-button size="small" @click="cancel">取消</el-button>
        </div>
      </el-col>
    </el-row> -->
    <!-- 修改个人资料弹框 -->
    <el-dialog
      title=">> 修改个人资料"
      :visible.sync="addShow"
      :close-on-click-modal="false"
      custom-class="dialog-div"
    >
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        size="small"
        class="demo-form-inline"
      >
        <table class="perstable">
          <tr>
            <td class="bg-td">昵称：</td>
            <td>
              <el-input
                type="text"
                v-model="form.M0014_USER_CODE"
                :disabled="isEdit"
                size="small"
              ></el-input>
            </td>
            <td class="bg-td">真实姓名：</td>
            <td>
              <el-input
                type="text"
                v-model="form.M0014_USER_NAME"
                :disabled="isEdit"
                size="small"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg-td">归属机构：</td>
            <td>
              <el-input
                type="text"
                v-model="form.DEPART_NAME"
                :disabled="isEdit"
                size="small"
              ></el-input>
            </td>
            <td class="bg-td">职务：</td>
            <td>
              <el-input
                type="text"
                v-model="form.DUTY_NAME"
                :disabled="isEdit"
                size="small"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg-td">电子邮箱：</td>
            <td>
              <el-input
                type="text"
                v-model="form.M0014_USER_EMAIL"
                size="small"
              ></el-input>
            </td>
            <td class="bg-td">手机号：</td>
            <td>
              <el-input
                type="text"
                v-model="form.M0014_USER_TEL"
                size="small"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg-td">是否激活：</td>
            <td style="text-align:left">
              <el-switch
                v-model="form.M0014_IS_AVTIVE"
                active-color="#409eff"
                size="small"
                inactive-color="#bbb"
                :disabled="isEdit"
              >
              </el-switch>
            </td>
            <td class="bg-td">原始密码</td>
            <td>
              <el-input
                type="password"
                v-model="form.oldpswd"
                size="small"
                show-password
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="bg-td">新密码：</td>
            <td>
              <el-input
                type="password"
                v-model="form.newpswd"
                size="small"
                show-password
              ></el-input>
            </td>
            <td class="bg-td">再次确认新密码：</td>
            <td>
              <el-form-item prop="confirmpswd">
                <el-input
                  type="password"
                  v-model="form.confirmpswd"
                  size="small"
                  show-password
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="bg-td">备注：</td>
            <td colspan="3">
              <el-input
                type="textarea"
                rows="5"
                v-model="form.M0014_USER_REMARK"
                size="small"
              ></el-input>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">确 认</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 我的权限列表 -->
    <el-row style="line-height:20px;" class="tbTitle">
      <el-col :span="4">
        <span style="font-size:20px;">>> 我的权限</span>
      </el-col>
      <el-col :span="20" style="text-align:right;padding-right:30px;">
        <span
          style="cursor:pointer;color:#444;font-size:15px;"
          icon="el-icon-plus"
          @click="openDialog()"
          ><i class="el-icon-edit-outline"></i> 个人资料编辑</span
        >
      </el-col>
    </el-row>
    <el-row class="tbWrap">
      <el-col :span="18" :offset="3">
        <el-main id="authModel">
          <p style="margin: 0 0 30px 0;">权限范围</p>
          <div v-for="item of permisionListData" :key="item.index">
            <span class="tabs">{{ item.M0004_NAME }}</span>
            <table class="perstable authTable">
              <thead>
                <tr>
                  <th width="8%">序号</th>
                  <th width="40%">模块名称</th>
                  <th>权限节点</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(child, index) of item.M0004_CHILD" :key="index">
                  <td v-text="index + 1">1</td>
                  <td class="chakan">
                    <el-checkbox
                      v-model="child.M0004_CHECKED"
                      @change="changeCheck(child)"
                      :disabled="islook"
                      >{{ child.M0004_NAME }}</el-checkbox
                    >
                    <!-- <el-checkbox v-model="child.M0004_CHECKED"></el-checkbox>  @change="handleCheckAllChange" :indeterminate="isIndeterminate"-->
                  </td>
                  <td>
                    <el-checkbox-group
                      v-model="child.tableForm"
                      @change="changeAuths(child)"
                    >
                      <el-checkbox
                        v-for="item1 in child.M0004_CHILD"
                        :key="item1.$index"
                        :label="item1.M0004_NAME"
                        :disabled="islook"
                      ></el-checkbox>
                    </el-checkbox-group>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-main>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { Message } from 'element-ui'
export default {
  data() {
    return {
      addShow: false,
      isEdit: true,
      form: {
        M0014_USER_CODE: '',
        M0014_USER_NAME: '',
        M0016_ID: '',
        M0015_ID: '',
        M0014_USER_EMAIL: '',
        M0014_USER_TEL: '',
        M0014_IS_AVTIVE: false,
        M0014_USER_REMARK: '',
        oldpswd: '',
        newpswd: '',
        confirmpswd: '',
        mytb: true,
        bigdata: false,
        yhCostIn: [],
        yhCostXq: [],
        dayCostIn: [],
        dayCostXq: [],
        techLevel: [],
        assetList: [],
        meters: [],
        highway: [],
        department: [],
        position: [],
        manager: [],
        authority: [],
        M0018_ID: '',
        M0014_ID: '',
      },
      permisionListData: [],
      islook: true,
      tokenID: '',
      userId: '',
      tip: '',
      rules: {
        newpswd: [
          {
            min: 6,
            max: 50,
            message: '密码长度在 6 到 50 个字符',
            trigger: 'blur',
          },
          {
            pattern: /^(\w){6,50}$/,
            message: '只能输入6-50个字母、数字、下划线',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  mounted() {
    this.getPermission()
  },
  methods: {
    findChild(currentItem, list) {
      currentItem.M0004_CHILD = []
      // eslint-disable-next-line no-unneeded-ternary
      currentItem.M0004_CHECKED =
        currentItem.M0005_STATE === '1' || currentItem.M0005_STATE === 1
          ? true
          : false
      list.forEach((v) => {
        if (currentItem.M0004_ID === v.M0004_PID) {
          if (v.M0004_LEVEL !== 3 && v.M0004_LEVEL !== '3' && !v.M0004_CHILD) {
            this.findChild(v, list)
          }
          currentItem.M0004_CHILD.push(v)
        }
      })
    },
    getPermission() {
      this.form.M0018_ID = sessionStorage.getItem('id')
      // this.userId = JSON.parse(sessionStorage.getItem('currentUser')).UserId
      // this.$api.post('/cycle/roleGroupManagement/getPermissionByRoleId?ID=' + this.userId, {}, null, r => {
      //   this.permisionListData = r.data.filter(v => v.M0004_LEVEL === '1' || v.M0004_LEVEL === 1)
      //   this.permisionListData.forEach(v => {
      //     this.findChild(v, r.data)
      //   })
      // })
      this.$api.post(
        '/cycle/roleGroupManagement/getPermissionByTokenId',
        { M0018_ID: this.form.M0018_ID },
        null,
        (r) => {
          this.permisionListData = r.data.filter(
            (v) => v.M0004_LEVEL === '1' || v.M0004_LEVEL === 1
          )
          this.permisionListData.forEach((v) => {
            this.findChild(v, r.data)
          })
          this.setTableForm()
          // console.log(this.permisionListData)
        }
      )
    },
    setTableForm(send) {
      // 无send表示发送前，有send表示发送后
      this.listPromision = []
      this.permisionListData.forEach((v) => {
        if (v.M0004_CHILD && v.M0004_CHILD.length > 0) {
          v.M0004_CHILD.forEach((v1) => {
            if (!send) {
              v1.tableForm = []
            }
            if (v1.M0004_CHILD && v1.M0004_CHILD.length > 0) {
              v1.M0004_CHILD.forEach((v2) => {
                if (!send && (v2.M0005_STATE === '1' || v2.M0005_STATE === 1)) {
                  v1.tableForm.push(v2.M0004_NAME)
                }
                v2.M0005_STATE = v1.tableForm.includes(v2.M0004_NAME) ? 1 : 0
                v1.M0005_STATE = v1.tableForm.length > 0 ? 1 : 0
                v1.M0004_CHECKED = !!v1.M0005_STATE
                v.M0005_STATE = v1.M0005_STATE
                this.listPromision.push(v2)
              })
            }
            this.listPromision.push(v1)
          })
          this.listPromision.push(v)
        }
      })
    },
    save() {
      this.form.M0014_ID = JSON.parse(
        sessionStorage.getItem('currentUser')
      ).UserId
      // this.$refs['form'].validate(valid => {
      //   if (valid) {
      if (this.form.newpswd === this.form.confirmpswd) {
        // this.$api.post('/cycle/userManagement/updatePassword?userId=' +this.userId +'&oldPassword=' +this.form.oldpswd +'&newPassword=' +this.form.newpswd,
        this.$api.post(
          '/cycle/userManagement/updateInformation',
          this.form,
          null,
          (r) => {
            console.log(r)
            if (r.msg === 'success') {
              Message({
                showClose: true,
                message: '修改成功',
                type: 'success',
              })
              this.cancel()
            } else {
              Message({
                showClose: true,
                message: '原密码错误',
                type: 'warning',
              })
            }
          }
        )
      } else {
        Message({
          showClose: true,
          message: '两次密码不一致',
          type: 'warning',
        })
        return false
      }
      //   } else {
      //     return false
      //   }
      // })
    },
    openDialog() {
      this.addShow = true
      let userId = JSON.parse(sessionStorage.getItem('currentUser')).UserId
      this.$api.post(
        '/cycle/userManagement/selectById?ID=' + userId,
        {},
        null,
        (r) => {
          if (r.data.M0014_IS_AVTIVE === 1) {
            r.data.M0014_IS_AVTIVE = true
          } else {
            r.data.M0014_IS_AVTIVE = false
          }
          this.form = r.data
        }
      )
    },
    cancel() {
      this.form = {}
      this.addShow = false
    },
  },
}
</script>
<style lang="scss">
#personal {
  .el-dialog__header {
    background: #f5f5f5;
  }
  .tbTitle {
    padding: 0 30px;
  }
  .tabs {
    padding: 8px 30px;
    background: rgb(76, 195, 165);
    color: #fff;
  }
  .authTable {
    margin: 20px 0 30px 0;
  }
  .tbWrap {
    background: #fff;
    padding: 30px 0;
    margin: 20px 0 50px 0;
  }
  .perstable {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #dcdfe6;
    tr {
      border: 1px solid #dcdfe6;
      td,
      th {
        border: 1px solid #dcdfe6;
        padding: 5px 10px;
        text-align: left !important;
      }
    }
    .bg-td {
      background: #f0f0f0;
      text-align: center;
    }
  }
}
</style>
