import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入按需导入的配置文件
import '@/utils/vant-ui'
import '@/style/common.less'

// 导入所有组件
// import Vant from 'vant'
// import 'vant/lib/index.css'
// // 插件安装初始化，内部会将所有的vant组件进行导入注册
// Vue.use(Vant)

// 按需导入，由于以后要使用的组件可能很多，所以抽取成单独一个配置文件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
