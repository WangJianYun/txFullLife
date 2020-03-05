import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Manage from '../views/Manage.vue'
import bigData from '../views/bigData.vue'
import workBanch from '../views/workBanch.vue'
import yhCostList from '../views/yhCostList.vue'
import dailyCost from '../views/dailyCost.vue'
import techStatus from '../views/techStatus.vue'
import techGrade from '../views/techGrade.vue'
import Assets from '../views/Assets.vue'
import assetsClass from '../views/assetsClass.vue'
import metersPile from '../views/metersPile.vue'
import Jurisdiction from '../views/Jurisdiction.vue'
import highway from '../views/highway.vue'
import department from '../views/department.vue'
import manager from '../views/manager.vue'
import Position from '../views/Position.vue'
import Authority from '../views/Authority.vue'
import Personal from '../views/Personal.vue'

Vue.use(VueRouter)

// 解决左侧菜单栏时，点击路由跳转相同地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
  path: '/',
  name: 'login',
  component: Login
}, {
  path: '/Manage',
  name: 'Manage',
  component: Manage,
  children: [{
    path: '/workBanch',
    name: '工作台',
    component: workBanch
  }, {
    path: '/bigData',
    name: '大数据分析',
    component: bigData
  }]
}, {
  path: '/Manage',
  name: 'Manage',
  component: Manage,
  children: [{
    path: '/yhCostList',
    name: '养护费用管理',
    component: yhCostList
  }]

}, {
  path: '/Manage',
  name: 'Manage',
  component: Manage,
  children: [{
    path: '/dailyCost',
    name: '日常费用收支管理',
    component: dailyCost
  }]

}, {
  path: '/Manage',
  name: 'Manage',
  component: Manage,
  children: [{
    path: '/techStatus',
    name: '路产技术状况',
    component: techStatus
  }, {
    path: '/techGrade',
    name: '路产技术等级',
    component: techGrade
  }]

}, {
  path: '/Manage',
  name: 'Manage',
  component: Manage,
  children: [{
    path: '/Assets',
    name: '公路资产管理',
    component: Assets
  }, {
    path: '/assetsClass',
    name: '公路资产类别管理',
    component: assetsClass
  }]

}, {
  path: '/Manage',
  name: 'Manage',
  component: Manage,
  children: [{
    path: '/metersPile',
    name: '百米桩管理',
    component: metersPile
  }, {
    path: '/Jurisdiction',
    name: '分公司管辖路段',
    component: Jurisdiction
  }, {
    path: '/highway',
    name: '高速管理',
    component: highway
  }]

}, {
  path: '/Manage',
  name: 'Manage',
  component: Manage,
  children: [{
    path: '/department',
    name: '部门管理',
    component: department
  }, {
    path: '/manager',
    name: '管理员管理',
    component: manager
  }, {
    path: '/Position',
    name: '职务管理',
    component: Position
  }, {
    path: '/Authority',
    name: '权限配置',
    component: Authority
  }]

}, {
  path: '/Manage',
  name: 'Manage',
  component: Manage,
  children: [{
    path: '/Personal',
    name: '个人中心',
    component: Personal
  }]

}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
