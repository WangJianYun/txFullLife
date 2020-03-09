import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Manage from '../views/Manage.vue'
import bigData from '../views/bigData.vue'
import workBanch from '../views/workBanch.vue'
import yhCostList from '../views/yhCostList.vue'
import dailyCost from '../views/dailyCost.vue'
import techGrade from '../views/techGrade.vue'
import Assets from '../views/Assets.vue'
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
    name: '我的桌面',
    component: workBanch
  }, {
    path: '/bigData',
    name: '大数据分析',
    component: bigData
  }]
}, {
  path: '/yhCost',
  name: '养护费用',
  component: Manage,
  children: [{
    path: '/yhCostList',
    name: '费用列表',
    component: yhCostList
  }]

}, {
  path: '/dailyCost',
  name: '日常费用',
  component: Manage,
  children: [{
    path: '/dailyCostList',
    name: '费用列表',
    component: dailyCost
  }]

}, {
  path: '/techGrade',
  name: '资产技术等级',
  component: Manage,
  children: [{
    path: '/techGradeList',
    name: '资产技术等级列表',
    component: techGrade
  }]

}, {
  path: '/Assets',
  name: '公路资产',
  component: Manage,
  children: [{
    path: '/AssetsList',
    name: '资产列表',
    component: Assets
  }]

}, {
  path: '/metersPile',
  name: '基础数据',
  component: Manage,
  children: [{
    path: '/metersPileList',
    name: '百米桩号列表',
    component: metersPile
  }, {
    path: '/Jurisdiction',
    name: '管辖路段列表',
    component: Jurisdiction
  }, {
    path: '/highway',
    name: '高速管理',
    component: highway
  }]

}, {
  path: '/SystemConfig',
  name: '系统配置',
  component: Manage,
  children: [{
    path: '/department',
    name: '部门列表',
    component: department
  }, {
    path: '/manager',
    name: '管理员列表',
    component: manager
  }, {
    path: '/Position',
    name: '职务列表',
    component: Position
  }, {
    path: '/Authority',
    name: '权限组配置',
    component: Authority
  }]

}, {
  path: '/Personal',
  name: '个人中心',
  component: Manage,
  children: [{
    path: '/PersonalInfo',
    name: '我的资料',
    component: Personal
  }]

}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
