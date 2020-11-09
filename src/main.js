import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

// axios.defaults.baseURL='http://47.102.107.15:90'   
axios.defaults.baseURL='http://localhost:6767'
axios.defaults.withCredentials = true; //配置为true
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
