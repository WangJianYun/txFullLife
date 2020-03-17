<template>
    <div id="personal">
        <el-row style="line-height:20px;" class="tbTitle">
            <el-col :span="4">
                <span style="font-size:20px;">>> 我的资料</span>
            </el-col>
            <el-col :span="20" style="text-align:right;padding-right:30px;">
                <span style="cursor:pointer;color:#444;font-size:15px;" icon="el-icon-plus" @click="openDialog('add')"><i class="el-icon-edit-outline"></i> 编辑</span>
            </el-col>
        </el-row>
        <el-row class="tbWrap">
            <el-col :span="18" :offset="3">
                <table class="perstable">
                    <tr>
                        <td class="bg-td">昵称：</td>
                        <td><el-input type="text" v-model="form.M0014_USER_CODE" :disabled="isEdit" size="small"></el-input></td>
                        <td class="bg-td">真实姓名：</td>
                        <td><el-input type="text" v-model="form.M0014_USER_NAME" :disabled="isEdit" size="small"></el-input></td>
                    </tr>
                    <tr>
                        <td class="bg-td">归属机构：</td>
                        <td><el-input type="text" v-model="form.DEPART_NAME" :disabled="isEdit" size="small"></el-input></td>
                        <td class="bg-td">职务：</td>
                        <td><el-input type="text" v-model="form.DUTY_NAME" :disabled="isEdit" size="small"></el-input></td>
                    </tr>
                    <tr>
                        <td class="bg-td">电子邮箱：</td>
                        <td><el-input type="text" v-model="form.M0014_USER_EMAIL" :disabled="isEdit" size="small"></el-input></td>
                        <td class="bg-td">手机号：</td>
                        <td><el-input type="text" v-model="form.M0014_USER_TEL" :disabled="isEdit" size="small"></el-input></td>
                    </tr>
                    <tr>
                        <td class="bg-td" :disabled="isEdit">是否激活：</td>
                        <td>
                            <el-switch
                            v-model="form.M0014_IS_AVTIVE"
                            active-color="#409eff"
                             size="small"
                            inactive-color="#bbb">
                            </el-switch>
                        </td>
                        <td class="bg-td"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="bg-td">备注：</td>
                        <td colspan="3"><el-input type="textarea" rows="5" v-model="form.M0014_USER_REMARK" :disabled="isEdit" size="small"></el-input></td>
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
            <el-col :span="6" :offset="3">
                <table class="perstable">
                    <tr>
                        <td>账户名：</td>
                        <td><el-input type="text" v-model="form.nickName" size="small"></el-input></td>
                    </tr>
                    <tr>
                        <td>原始密码：</td>
                        <td><el-input type="password" v-model="form.oldpswd" size="small"></el-input></td>
                    </tr>
                    <tr>
                        <td>新密码：</td>
                        <td><el-input type="password" v-model="form.newpswd" size="small"></el-input></td>
                    </tr>
                    <tr>
                        <td>再次确认密码：</td>
                        <td><el-input type="password" v-model="form.confirmpswd" size="small"></el-input></td>
                    </tr>
                </table>
                <div style="text-align:center;margin-top:20px;">
                    <el-button type="primary" size="small" @click="save">提交</el-button>
                    <el-button size="small" @click="cancel">取消</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row style="line-height:20px;" class="tbTitle">
            <el-col :span="4">
                <span style="font-size:20px;">>> 我的权限</span>
            </el-col>
        </el-row>
        <el-row class="tbWrap">
            <el-col :span="18" :offset="3">
                <el-main id="authModel">
                    <p style="margin: 0 0 30px 0;">权限范围</p>
                    <div v-for="item of permisionListData"
                         :key="item.index">
                    <span class="tabs">{{item.M0004_NAME}}</span>
                    <table class="perstable authTable">
                        <thead><tr><th>序号</th><th>模块名称</th><th>权限节点</th></tr></thead>
                        <tbody>
                            <tr v-for="(child,index) of item.M0004_CHILD"
                               :key="index">
                                <td v-text="index+1">1</td>
                                <td>{{child.M0004_NAME}}</td>
                                <td>
                                    <el-checkbox-group v-model="child.tableForm"
                                      @change="changeAuths(child)">
                                        <el-checkbox v-for="item1 in child.M0004_CHILD" :key="item1.$index"
                            :label="item1.M0004_NAME"
                            :disabled="islook"></el-checkbox>
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
  data () {
    return {
      isEdit: true,
      auths: ['查看', '新增', '修改', '删除', '批量删除', '锁定', '启用'],
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
        M0018_ID: ''
      },
      permisionListData: [],
      islook: true,
      tokenID: '',
      userId: '',
      tip: ''

    }
  },
  mounted () {
    this.loadMsg()
    this.getPermission()
  },
  methods: {
    findChild (currentItem, list) {
      currentItem.M0004_CHILD = []
      // eslint-disable-next-line no-unneeded-ternary
      currentItem.M0004_CHECKED = (currentItem.M0005_STATE === '1' || currentItem.M0005_STATE === 1) ? true : false
      list.forEach(v => {
        if (currentItem.M0004_ID === v.M0004_PID) {
          if (v.M0004_LEVEL !== 3 && v.M0004_LEVEL !== '3' && !v.M0004_CHILD) {
            this.findChild(v, list)
          }
          currentItem.M0004_CHILD.push(v)
        }
      })
    },
    getPermission () {
      this.form.M0018_ID = sessionStorage.getItem('id')
      this.$api.post('/cycle/roleGroupManagement/getPermission', { 'M0018_ID': this.form.M0018_ID }, null, r => {
        this.permisionListData = r.data.filter(v => v.M0004_LEVEL === '1' || v.M0004_LEVEL === 1)
        this.permisionListData.forEach(v => {
          this.findChild(v, r.data)
        })
      })
    },
    save () {
      this.userId = JSON.parse(sessionStorage.getItem('currentUser')).UserId
      console.log(this.userId)
      this.$api.post('/cycle/userManagement/updatePassword?userId=' + this.userId + '&oldPassword=' + this.form.oldpswd + '&newPassword=' + this.form.newpswd, {}, null, r => {
        console.log(r)
        this.$nextTick(() => {
          if (r.msg === 'success') {
            Message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
          } else {
            Message({
              showClose: true,
              message: '密码错误',
              type: 'success'
            })
          }
        })
      })
    },
    cancel () {
      this.form = {}
    },
    loadMsg () {
      let userId = JSON.parse(sessionStorage.getItem('currentUser')).UserId
      this.$api.post('/cycle/userManagement/selectById?ID=' + userId, {}, null, r => {
        if (r.data.M0014_IS_AVTIVE === 1) {
          r.data.M0014_IS_AVTIVE = true
        } else {
          r.data.M0014_IS_AVTIVE = false
        }
        this.form = r.data
      })
    }
  }
}
</script>
<style lang="scss">
    #personal{
        .tbTitle{padding: 0 30px;}
        .tabs{padding: 8px 30px;background: rgb(76, 195, 165);color: #fff;}
        .authTable{margin: 20px 0 30px 0;}
        .tbWrap{
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
                td,th {
                    border: 1px solid #dcdfe6;
                    padding: 5px 10px;
                    text-align: center;
                }
            }
            .bg-td {
                background: #f0f0f0;
                text-align: center;
            }
        }
    }
</style>
