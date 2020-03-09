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
                        <td><el-input type="text" v-model="form.M0016_ID" :disabled="isEdit" size="small"></el-input></td>
                        <td class="bg-td">职务：</td>
                        <td><el-input type="text" v-model="form.M0015_ID" :disabled="isEdit" size="small"></el-input></td>
                    </tr>
                    <tr>
                        <td class="bg-td">电子邮箱：</td>
                        <td><el-input type="text" v-model="form.M0014_USER_EMAIL" :disabled="isEdit" size="small"></el-input></td>
                        <td class="bg-td">手机号：</td>
                        <td><el-input type="text" v-model="form.M0014_USER_TEL" :disabled="isEdit" size="small"></el-input></td>
                    </tr>
                    <tr>
                        <td class="bg-td">是否激活：</td>
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
                        <td><el-input type="text" v-model="form.nickName" :disabled="isEdit" size="small"></el-input></td>
                    </tr>
                    <tr>
                        <td>原始密码：</td>
                        <td><el-input type="password" v-model="form.oldpswd" :disabled="isEdit" size="small"></el-input></td>
                    </tr>
                    <tr>
                        <td>新密码：</td>
                        <td><el-input type="password" v-model="form.newpswd" :disabled="isEdit" size="small"></el-input></td>
                    </tr>
                    <tr>
                        <td>再次确认密码：</td>
                        <td><el-input type="password" v-model="form.confirmpswd" :disabled="isEdit" size="small"></el-input></td>
                    </tr>
                </table>
                <div style="text-align:center;margin-top:20px;">
                    <el-button type="primary" size="small">提交</el-button>
                    <el-button size="small">取消</el-button>
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
        authority: []
      },
      permisionListData: [],
      islook: true,
      tokenID: ''
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
    getPermission (id) {
      this.tokenID = sessionStorage.getItem('TokenId')
      console.log(this.tokenID)
      this.$api.post('/cycle/roleGroupManagement/getPermissionByTokenId?TokenId=' + this.tokenID, null, null, r => {
        this.permisionListData = r.data.filter(v => v.M0004_LEVEL === '1' || v.M0004_LEVEL === 1)
        this.permisionListData.forEach(v => {
          this.findChild(v, r.data)
        })
        this.setTableForm()
      })
      console.log(this.permisionListData)
    },
    setTableForm (send) {
      // 无send表示发送前，有send表示发送后
      this.listPromision = []
      this.permisionListData.forEach(v => {
        if (v.M0004_CHILD && v.M0004_CHILD.length > 0) {
          v.M0004_CHILD.forEach(v1 => {
            if (!send) {
              v1.tableForm = []
            }
            // 如果是我的桌面和大数据分析时选中的状态
            // if (!v.M0004_NAME === '我的桌面' && !v.M0004_NAME === '大数据分析') {
            //   v1.M0005_STATE = v1.tableForm.length > 0 ? 1 : 0
            // } else {
            //   v1.M0005_STATE = v1.M0004_CHECKED ? 1 : 0
            // }
            // 如果有第三级
            if (v1.M0004_CHILD && v1.M0004_CHILD.length > 0) {
              v1.M0004_CHILD.forEach(v2 => {
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
      console.log(this.permisionListData)
      // this.permisionListData = [...this.permisionListData]
    },
    changeAuths (currets) {
      this.setTableForm(true)
    },
    loadMsg () {
      let userId = JSON.parse(sessionStorage.getItem('currentUser')).UserId
      this.$api.post('/cycle/userManagement/selectById?ID=' + userId, {}, null, r => {
        console.log(r)
        if (r.data.M0014_IS_AVTIVE === 1) {
          r.data.M0014_IS_AVTIVE = true
        } else {
          r.data.M0014_IS_AVTIVE = false
        }
        this.form = r.data
      })
    }
    // changeAuths (txt) {
    //   switch (txt) {
    //     case 'book':
    //       console.log(this.form.mytb)
    //       break
    //     case 'bigdata':
    //       console.log(this.form.bigdata)
    //       break
    //     case 'yhcostin':
    //       console.log(this.form.yhCostIn)
    //       break
    //   }
    // }
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
