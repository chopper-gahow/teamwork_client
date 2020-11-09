import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    realname:sessionStorage.getItem('realname'),
    headimg:sessionStorage.getItem('headimg'),
    username:sessionStorage.getItem('username'),
    password:sessionStorage.getItem('password'),
    isLogin:sessionStorage.getItem('isLogin'),
    jurisdiction:sessionStorage.getItem('jurisdiction'),
    role:sessionStorage.getItem('role'),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
