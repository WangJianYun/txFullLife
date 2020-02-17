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
                        <td><el-input type="text" v-model="form.nickName" :disabled="isEdit" size="small"></el-input></td>
                        <td class="bg-td">真实姓名：</td>
                        <td><el-input type="text" v-model="form.name" :disabled="isEdit" size="small"></el-input></td>
                    </tr>
                    <tr>
                        <td class="bg-td">归属机构：</td>
                        <td><el-input type="text" v-model="form.govment" :disabled="isEdit" size="small"></el-input></td>
                        <td class="bg-td">职务：</td>
                        <td><el-input type="text" v-model="form.workName" :disabled="isEdit" size="small"></el-input></td>
                    </tr>
                    <tr>
                        <td class="bg-td">电子邮箱：</td>
                        <td><el-input type="text" v-model="form.email" :disabled="isEdit" size="small"></el-input></td>
                        <td class="bg-td">手机号：</td>
                        <td><el-input type="text" v-model="form.phone" :disabled="isEdit" size="small"></el-input></td>
                    </tr>
                    <tr>
                        <td class="bg-td">是否激活：</td>
                        <td>
                            <el-switch
                            v-model="form.switch"
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
                        <td colspan="3"><el-input type="textarea" rows="5" v-model="form.remark" :disabled="isEdit" size="small"></el-input></td>
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
                    <span class="tabs">机构详情</span>
                    <table class="perstable authTable">
                        <thead><tr><th>序号</th><th>模块名称</th><th>权限节点</th></tr></thead>
                        <tbody>
                            <tr><td>1</td><td>我的桌面</td><td><el-checkbox v-model="form.mytb" @change="changeAuths('book')">查看</el-checkbox></td></tr>
                            <tr><td>2</td><td>大数据分析</td><td><el-checkbox v-model="form.bigdata" @change="changeAuths('bigdata')">查看</el-checkbox></td></tr>
                        </tbody>
                    </table>
                    <span class="tabs">养护费用</span>
                    <table class="perstable authTable">
                        <thead><tr><th>序号</th><th>模块名称</th><th>权限节点</th></tr></thead>
                        <tbody>
                            <tr><td>1</td><td>费用录入</td>
                                <td>
                                    <el-checkbox-group v-model="form.yhCostIn" @change="changeAuths('yhcostin')">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                            <tr><td>2</td><td>费用详情</td>
                                <td>
                                    <el-checkbox-group v-model="form.yhCostXq">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <span class="tabs">日常费用</span>
                    <table class="perstable authTable">
                        <thead><tr><th>序号</th><th>模块名称</th><th>权限节点</th></tr></thead>
                        <tbody>
                            <tr><td>1</td><td>费用录入</td>
                                <td>
                                    <el-checkbox-group v-model="form.dayCostIn" @change="changeAuths('yhcostin')">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                            <tr><td>2</td><td>费用详情</td>
                                <td>
                                    <el-checkbox-group v-model="form.dayCostXq">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <span class="tabs">资产技术等级</span>
                    <table class="perstable authTable">
                        <thead><tr><th>序号</th><th>模块名称</th><th>权限节点</th></tr></thead>
                        <tbody>
                            <tr><td>1</td><td>资产技术等级列表</td>
                                <td>
                                    <el-checkbox-group v-model="form.techLevel" @change="changeAuths('yhcostin')">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <span class="tabs">公路资产</span>
                    <table class="perstable authTable">
                        <thead><tr><th>序号</th><th>模块名称</th><th>权限节点</th></tr></thead>
                        <tbody>
                            <tr><td>1</td><td>资产列表</td>
                                <td>
                                    <el-checkbox-group v-model="form.assetList" @change="changeAuths('yhcostin')">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <span class="tabs">基础数据</span>
                    <table class="perstable authTable">
                        <thead><tr><th>序号</th><th>模块名称</th><th>权限节点</th></tr></thead>
                        <tbody>
                            <tr><td>1</td><td>百米桩号</td>
                                <td>
                                    <el-checkbox-group v-model="form.meters" @change="changeAuths('yhcostin')">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                            <tr><td>2</td><td>管辖路段</td>
                                <td>
                                    <el-checkbox-group v-model="form.highway">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <span class="tabs">系统配置</span>
                    <table class="perstable authTable">
                        <thead><tr><th>序号</th><th>模块名称</th><th>权限节点</th></tr></thead>
                        <tbody>
                            <tr><td>1</td><td>部门管理</td>
                                <td>
                                    <el-checkbox-group v-model="form.department" @change="changeAuths('yhcostin')">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                            <tr><td>2</td><td>职务管理</td>
                                <td>
                                    <el-checkbox-group v-model="form.position">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                            <tr><td>3</td><td>管理员管理</td>
                                <td>
                                    <el-checkbox-group v-model="form.manager">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                            <tr><td>4</td><td>权限组配置</td>
                                <td>
                                    <el-checkbox-group v-model="form.authority">
                                        <el-checkbox v-for="item in auths" :key="item.$index" :label="item"></el-checkbox>
                                    </el-checkbox-group>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
        nickName: '',
        name: '',
        govment: '',
        workName: '',
        email: '',
        phone: '',
        switch: false,
        remark: '',
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
      }
    }
  },
  methods: {
    changeAuths (txt) {
      switch (txt) {
        case 'book':
          console.log(this.form.mytb)
          break
        case 'bigdata':
          console.log(this.form.bigdata)
          break
        case 'yhcostin':
          console.log(this.form.yhCostIn)
          break
      }
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
