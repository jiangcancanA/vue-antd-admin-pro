import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/reset.css'

// 引入组件库
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// mock数据
import '@/mock'

// 权限控制
import '@/permission'

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
