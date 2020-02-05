import Vue from 'vue'
import VueBus from 'vue-bus'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import api from './api/api.js'
import global from './components/Global.vue'
import iconPicker from 'vue-fontawesome-elementui-icon-picker'
import 'font-awesome/scss/font-awesome.scss'
import AMap from 'vue-amap'
import echarts from 'echarts/dist/echarts.min.js'

Vue.prototype.$echarts = echarts
Vue.use(VueBus)
Vue.use(AMap)
Vue.use(global)
Vue.use(echarts)
Vue.use(iconPicker)
Vue.prototype.$api = api
Vue.config.productionTip = false

let that = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: 'dc60f7077b6e538fb4470f6c9f7c93c2',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation']
})
export default that
