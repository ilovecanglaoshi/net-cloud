import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import DefaultLayout from './layout/layout.vue'
import './assets/scss/style.scss'
import './assets/iconfont/iconfont.css'
Vue.config.productionTip = false
// Vue.component('DefaultLayout', DefaultLayout)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
