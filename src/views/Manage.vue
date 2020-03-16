<template>
  <el-container>
    <el-aside>
      <el-scrollbar style="height:100%">
        <el-row class="title">
          <span>全生命周期管理平台</span>
        </el-row>
        <el-row>
          <div class="userBack">
            <el-avatar :size="120" :src="currentUserImg"></el-avatar>
          </div>
        </el-row>
        <el-row>
          <div class="userWel">
            <span>尊敬的用户、{{ currentUser.UserName }}：您好！</span>
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
            <label v-for="item in menulist1" :key="item.$index">
              <!-- <el-submenu :index="item.M0004_URL"> -->
                <el-submenu :index="item.M0004_URL" v-if="item.M0005_STATE==='1'||item.M0005_STATE===1">
                <template
                  v-if="item.M0004_CHILD.length > 0 &&!['我的桌面', '大数据分析'].includes(item.M0004_NAME)">
                  <template slot="title" style="width:50%;text-align:left;">
                    <i :class="item.icon"></i>
                    <span style="font-size:16px;">{{ item.M0004_NAME }}</span>
                  </template>
                  <el-menu-item
                    :index="subItem.M0004_URL"
                    v-for="subItem in item.M0004_CHILD"
                    :key="subItem.$index"
                    style="font-size:14px;"
                  >
                    <!-- <span style="margin-left:50px">{{ subItem.M0004_NAME }}</span> -->
                    <span style="margin-left:50px" v-if="subItem.M0005_STATE==='1'||subItem.M0005_STATE===1">{{ subItem.M0004_NAME }}</span>
                  </el-menu-item>
                </template>
                <template slot="title" v-else>
                  <el-menu-item :index="item.M0004_URL">
                    <i :class="item.icon"></i>
                    <span style="font-size:16px;">{{ item.M0004_NAME }}</span>
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
            <span
              >欢迎光临高速公路全生命周期管理平台，当前时间：{{ currentTime }}</span
            >
          </el-col>
          <el-col :span="6" class="tools">
            <el-button
              size="mini"
              icon="el-icon-switch-button"
              circle
              @click="logout"
            ></el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-scrollbar style="height:100%;background:#efefef;">
        <el-row class="local">
          <el-col :span="12">
            <div class="location">当前位置：{{ this.$route.name }}</div>
          </el-col>
          <el-col :span="12">
            <div class="weather" style="text-align:right;">
              <iframe
                width="300"
                scrolling="no"
                height="22"
                frameborder="0"
                allowtransparency="true"
                src="//i.tianqi.com/index.php?c=code&id=1&icon=1&wind=0&num=1&site=14"
              ></iframe>
            </div>
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
// eslint-disable-next-line no-unused-vars
import { routes1, routes2 } from '../router/index.js'
export default {
  data () {
    return {
      form: {
        userName: 'admin',
        password: '1'
      },
      menuOptions: [],
      defaultActiveMenu: '',
      currentTime: '', // 获取当前时
      currentUserImg: '',
      currentUser: [],
      menuList: [],
      routes: [],
      pathBox: [],
      pathitem: '',
      menulist1: [],
      menulist2: []
    }
  },
  mounted () {
    this.getMenu()
    this.timer()
    this.changeActive()
    // this.defaultActiveMenu = '/workBanch'
    if (sessionStorage.getItem('currentUser').TokenId === null) {
      this.$router.push('/')
    }
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  },
  created () {},
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
      if (this.$route.path !== key) {
        this.$router.push({ path: key })
      }
    },
    findKid (currentItem, list, pItem = {}) {
      currentItem.M0004_CHILD = []
      if (
        !currentItem.M0004_URL &&
        (currentItem.M0004_LEVEL !== 3 || currentItem.M0004_LEVEL !== '3')
      ) {
        currentItem.M0004_URL = this.findPath(
          currentItem.M0004_NAME,
          pItem.M0004_NAME,
          this.routes
        )
      }
      list.forEach(v => {
        if (currentItem.M0004_ID === v.M0004_PID) {
          if (v.M0004_LEVEL !== 3 && v.M0004_LEVEL !== '3' && !v.M0004_CHILD) {
            this.findKid(v, list, currentItem)
          }
          currentItem.M0004_CHILD.push(v)
        }
      })
    },
    findPath (name, pName, list, listName) {
      let result = ''
      for (const rt of list) {
        if (name === rt.name && (!pName || pName === listName)) {
          result = rt.path
          break
        } else {
          if (rt.children && !result) {
            result = this.findPath(name, pName, rt.children, rt.name)
          }
        }
      }
      return result
    },
    getMenu () {
      // 写死的菜单
      // let menuData = [
      //   { id: '1', name: '我的桌面', icon: '', url: '/workBanch', lvl: '1', children: [], isNotFinal: false },
      //   { id: '2', name: '大数据分析', icon: '', url: '/bigData', lvl: '1', children: [] },
      //   { id: '3', name: '养护费用', icon: '', url: '1', lvl: '1', children: [] },
      //   { id: '4', name: '费用列表', icon: '', url: '/yhCostList', lvl: '2', parentId: '3' },
      //   { id: '16', name: '日常费用', icon: '', url: '2', lvl: '1', children: [] },
      //   { id: '5', name: '费用列表', icon: '', url: '/dailyCost', lvl: '2', parentId: '16' },
      //   { id: '17', name: '资产技术等级', icon: '', url: '3', lvl: '1', children: [] },
      //   { id: '7', name: '资产技术等级列表', icon: '', url: '/techGrade', lvl: '2', parentId: '17' },
      //   // { id: '6', name: '状况管理', icon: '', url: '/techStatus', lvl: '2', parentId: '17' },
      //   { id: '18', name: '公路资产', icon: '', url: '4', lvl: '1', children: [] },
      //   { id: '8', name: '资产管理', icon: '', url: '/Assets', lvl: '2', parentId: '18' },
      //   // { id: '9', name: '类别管理', icon: '', url: '/assetsClass', lvl: '2', parentId: '18' },
      //   { id: '19', name: '基础数据', icon: '', url: '5', lvl: '1', children: [] },
      //   { id: '10', name: '百米桩', icon: '', url: '/metersPile', lvl: '2', parentId: '19' },
      //   { id: '11', name: '管辖路段', icon: '', url: '/Jurisdiction', lvl: '2', parentId: '19' },
      //   { id: '12', name: '高速管理', icon: '', url: '/highway', lvl: '2', parentId: '19' },
      //   { id: '20', name: '系统配置', icon: '', url: '6', lvl: '1', children: [] },
      //   { id: '13', name: '部门管理', icon: '', url: '/department', lvl: '2', parentId: '20' },
      //   { id: '14', name: '管理员', icon: '', url: '/manager', lvl: '2', parentId: '20' },
      //   { id: '15', name: '职务管理', icon: '', url: '/Position', lvl: '2', parentId: '20' },
      //   { id: '22', name: '权限配置', icon: '', url: '/Authority', lvl: '2', parentId: '20' },
      //   { id: '21', name: '个人中心', icon: '', url: '7', lvl: '1', children: [] },
      //   { id: '23', name: '我的资料', icon: '', url: '/Personal', lvl: '2', parentId: '21' }
      // ]
      this.menuList = JSON.parse(this.$route.params.menu)
      this.menulist1 = this.menuList.filter(
        v => v.M0004_LEVEL === '1' || v.M0004_LEVEL === 1
      )
      // 根据menuType来判断是集团公司还是分公司菜单
      if (parseInt(this.$route.params.menuType) === 1) { // 分公司
        this.routes = routes1
      }
      if (parseInt(this.$route.params.menuType) === 0) { // 集团公司
        this.routes = routes2
      }
      try {
        this.menulist1.forEach(v => {
          this.findKid(v, this.menuList)
        })
        console.log(this.menulist1)
        for (const v of this.menulist1) {
          if (v.M0005_STATE === 1 || v.M0005_STATE === '1') {
            // this.$router.push((v.M0004_CHILD && v.M0004_CHILD.length > 0) ? v.M0004_CHILD[0].M0004_URL : v.M0004_URL)
            if (v.M0004_CHILD && v.M0004_CHILD.length > 0 && v.M0004_CHILD[0].M0004_URL) {
              this.$router.push(v.M0004_CHILD[0].M0004_URL)
            } else {
              // eslint-disable-next-line no-unused-expressions
              v.M0004_URL ? this.$router.push(v.M0004_URL) : ''
            }
            break
          }
        }
      } catch (error) {
        console.log(error)
      }
      // this.menulist1.forEach(val => {
      //   this.menuOptions.push({
      //     id: val.M0004_ID,
      //     name: val.M0004_NAME,
      //     icon: '',
      //     url: val.M0004_URL
      //   })
      // })
      // this.menuOptions.forEach(val => {
      // /* 获取根节点下的所有子节点 使用getChild方法 */
      //   let childList = this.findChild(val.id, menuData)
      //   if (childList.length !== 0) {
      //     val.children = childList
      //   }
      // })
      // 设置默认路由
      // for (let key in menuData) {
      //   console.log(menuData[key])
      //   if (menuData[key].isNotFinal === false) {
      //     this.defaultActiveMenu = menuData[key].url
      //     this.$router.push(this.defaultActiveMenu)
      //     break
      //   }
      // }
      // console.log(this.defaultActiveMenu)
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
    width:300px;
  }
  @media screen and ( max-width: 1600px ){
     .el-aside {
      width:200px;
    }
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
    padding:10px;
    height:40px;
    text-align:center;
    margin-bottom:20px;
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
