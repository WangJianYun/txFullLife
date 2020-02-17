<template>
  <el-container>
    <el-aside width="300px">
      <el-scrollbar style="height:100%">
        <el-row class="title">
          <span>铜旬全生命周期管理平台</span>
        </el-row>
        <el-row>
          <div class="userBack">
            <el-avatar :size="120" :src="currentUserImg"></el-avatar>
          </div>
        </el-row>
        <el-row>
          <div class="userWel">
            <span>尊敬的用户、{{currentUser.name}}：您好！</span>
          </div>
        </el-row>
        <el-row>
          <div class="userDesc">
            <el-button size="small" type="danger" round>预警</el-button>
            <el-button size="small" type="warning" round>代办</el-button>
          </div>
        </el-row>
        <el-row>
          <el-menu
            :default-active="defaultActiveMenu"
            background-color="#32323c"
            text-color="#ffffff"
            @select="handleSelect"
            :collapse="false"
          >
            <label v-for="item in this.menuOptions" :key="item.url">
              <el-submenu :index="item.url">
                <template v-if="item.children">
                  <template slot="title" style="width:50%;text-align:left;">
                    <i :class="item.icon"></i>
                    <span style="font-size:16px;">{{item.name}}</span>
                  </template>
                  <el-menu-item
                    :index="subItem.url"
                    v-for="subItem in item.children"
                    :key="subItem.url"
                    style="font-size:14px;"
                  >
                    <span style="margin-left:50px"></span>
                    {{subItem.name}}
                  </el-menu-item>
                </template>
                <template slot="title" v-else>
                  <el-menu-item :index="item.url">
                    <i :class="item.icon"></i>
                    <span style="font-size:16px;">{{item.name}}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
            </label>
          </el-menu>
        </el-row>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header height="60px">
        <el-row>
          <el-col :span="18">
            <span>欢迎光临铜旬全生命周期管理平台，当前时间：{{currentTime}}</span>
          </el-col>
          <el-col :span="6" class="tools">
            <el-button size="mini" icon="el-icon-switch-button" circle @click="logout"></el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-scrollbar style="height:100%;background:#efefef;">
          <el-row class="local">
            <el-col :span="12">
              <div class="location">当前位置：{{this.$route.name}}</div>
            </el-col>
            <el-col :span="12">
              <div class="weather" style="text-align:right;"><iframe width="220" scrolling="no" height="22" frameborder="0" allowtransparency="true" src="//i.tianqi.com/index.php?c=code&id=1&icon=1&wind=0&num=1&site=14"></iframe></div>
            </el-col>
          </el-row>
        <el-main style="padding-top:0;">
          <el-row>
            <el-col :span="24">
              <router-view />
            </el-col>
          </el-row>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menuOptions: [],
      defaultActiveMenu: '',
      currentTime: '', // 获取当前时
      currentUserImg: '',
      currentUser: []
    }
  },
  mounted () {
    this.getMenu()
    this.timer()
    this.changeActive()
    // this.defaultActiveMenu = '/workBanch'

    // if (sessionStorage.getItem('currentUser') === null) {
    //   this.$router.push('/')
    // }
    // this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
    // this.currentUserImg = 'api' + this.currentUser.avatarUrl
  },
  methods: {
    timer () {
      let that = this
      setInterval(function () {
        that.currentTime = // 修改数据date
          new Date().getFullYear() +
          '-' +
          (new Date().getMonth() + 1) +
          '-' +
          new Date().getDate() +
          ' ' +
          new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ': ' +
          new Date().getSeconds()
      }, 1000)
    },
    logout () {
      //   this.$api.post('user/logout', null, '您已退出登录', r => {
      this.$router.push('/')
      //   })
    },
    handleSelect (key) {
      this.$router.push({ path: key })
    },
    getMenu () {
      let menuData = [
        { id: '1', name: '我的桌面', icon: '', url: '/workBanch', lvl: '1', children: [], isNotFinal: false },
        { id: '2', name: '大数据分析', icon: '', url: '/bigData', lvl: '1', children: [] },
        { id: '3', name: '养护费用', icon: '', url: '1', lvl: '1', children: [] },
        { id: '4', name: '费用管理', icon: '', url: '/yhCostList', lvl: '2', parentId: '3' },
        { id: '16', name: '日常费用', icon: '', url: '2', lvl: '1', children: [] },
        { id: '5', name: '费用管理', icon: '', url: '/dailyCost', lvl: '2', parentId: '16' },
        { id: '17', name: '技术等级', icon: '', url: '3', lvl: '1', children: [] },
        { id: '7', name: '等级管理', icon: '', url: '/techGrade', lvl: '2', parentId: '17' },
        // { id: '6', name: '状况管理', icon: '', url: '/techStatus', lvl: '2', parentId: '17' },
        { id: '18', name: '公路资产', icon: '', url: '4', lvl: '1', children: [] },
        { id: '8', name: '资产管理', icon: '', url: '/Assets', lvl: '2', parentId: '18' },
        // { id: '9', name: '类别管理', icon: '', url: '/assetsClass', lvl: '2', parentId: '18' },
        { id: '19', name: '基础数据', icon: '', url: '5', lvl: '1', children: [] },
        { id: '10', name: '百米桩', icon: '', url: '/metersPile', lvl: '2', parentId: '19' },
        { id: '11', name: '管辖路段', icon: '', url: '/Jurisdiction', lvl: '2', parentId: '19' },
        // { id: '12', name: '高速管理', icon: '', url: '/highway', lvl: '2', parentId: '19' },
        { id: '20', name: '系统配置', icon: '', url: '6', lvl: '1', children: [] },
        { id: '13', name: '部门管理', icon: '', url: '/department', lvl: '2', parentId: '20' },
        { id: '14', name: '管理员', icon: '', url: '/manager', lvl: '2', parentId: '20' },
        { id: '15', name: '职务', icon: '', url: '/Position', lvl: '2', parentId: '20' },
        { id: '22', name: '权限配置', icon: '', url: '/Authority', lvl: '2', parentId: '20' },
        { id: '21', name: '个人中心', icon: '', url: '7', lvl: '1', children: [] },
        { id: '23', name: '我的资料', icon: '', url: '/Personal', lvl: '2', parentId: '21' }
      ]
      // this.$api.post('sys/res/by/user/list', [], null, r => {
      menuData.forEach(val => {
        if (val.lvl === '1') {
          this.menuOptions.push({
            id: val.id,
            name: val.name,
            icon: val.icon,
            url: val.url
          })
        }
      })
      this.menuOptions.forEach(val => {
        /* 获取根节点下的所有子节点 使用getChild方法 */
        let childList = this.findChild(val.id, menuData)
        if (childList.length !== 0) {
          val.children = childList
        }
      })
      for (let key in menuData) {
        if (menuData[key].isNotFinal === false) {
          this.defaultActiveMenu = menuData[key].url
          this.$router.push(this.defaultActiveMenu)
          break
        }
      }
      // })
    },
    findChild (id, allRes) {
      let childList = []
      allRes.forEach(val => {
        if (val.parentId === id) {
          childList.push({
            id: val.id,
            name: val.name,
            icon: val.icon,
            url: val.url
          })
        }
      })
      // 递归
      childList.forEach(val => {
        let list = this.findChild(val.id, allRes)
        if (list.length !== 0) {
          val.children = list
        }
      })

      // 如果节点下没有子节点，返回一个空List（递归退出）
      if (childList.length === 0) {
        return []
      }
      return childList
    },
    changeActive () {
      let that = this
      this.$nextTick(() => {
        this.$bus.$on('changeActMenu', function (text) {
          that.defaultActiveMenu = text
          // console.log(that.defaultActiveMenu)
        })
      })
    }
  }
}
</script>

<sytle scoped lang="less">
  .el-container{
    width:100%;
    height:100%;
  }
  .el-header{
    background-image: linear-gradient(to right,#1FB5AC, #32323c);
    padding-top:15px !important;
    color:#ffffff;
    font-size:14px;
  }
  .el-aside {
    height:100%;
    background-color:#32323c;
  }
  .el-scrollbar__wrap{
    overflow-x: hidden !important;
  }
  .title{
    padding-top:20px;
    height:70px;
    text-align:center;
    font-size:23px;
    color:#ffffff;
  }
  .el-menu {
    width:100%;
    text-align:center;
    border-right: solid 0px !important;
  }
  // .el-submenu__title{
  //   font-size:16px !important;
  // }
  .el-submenu .el-menu-item{
    border-top:1px solid #44444A;
    border-bottom:1px solid #44444A;
    font-size:14px;
  }
  .el-menu-item.is-active {
    background-color: #1FB5AC !important;
    color:#ffffff !important;
  }
  .userBack{
    padding-top:9px;
    width: 100%;
    height: 138px;
    text-align:center;
    background-image: url('../assets/avatarback.png');
  }
  .userWel{
    height:20px;
    text-align:center;
    color:#ffffff;
    font-size:12px;
  }
  .userDesc{
    padding-top:10px;
    height:40px;
    text-align:center;
  }
  .local{
    width:100%;
    padding:15px 30px;
    margin-bottom:20px;
    border-bottom:1px solid #4CC3A5;
    font-size:14px;
    font-weight:bolder;
    color:#909399;
  }

  .tools{
    text-align:right;
  }
</sytle>
