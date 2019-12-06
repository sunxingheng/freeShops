import Vue from 'vue'
import Vuex from 'vuex'
import persistedstate  from "vuex-persistedstate";

import manage from './modules/manage'
Vue.use(Vuex)


const options = {
  modules: {
    manage: manage,//其他组件
  },
  plugins :[persistedstate({ storage: window.sessionStorage })]
}

export default new Vuex.Store(options)
