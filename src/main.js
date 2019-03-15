// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Index from './components/index'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/base.styl'
import axios from 'axios'
import store from './store'
import vueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(Mint)
Vue.use(vueLazyLoad,{
  error:'./assets/img/logo.png',
  loading:'./assets/img/logo.png'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { Index },
  template: '<Index/>'
})
