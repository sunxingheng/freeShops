// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import './utils/mock'
//此部分引入的是我们所编写的mockjs文档用来拦截请求
import router from './router.js';
import store from "./store";

import routerBefore from './utils/beforeEach.js'
import '@/assets/css/public.css';
import '@/assets/css/rule.css';
import '@/assets/css/replenishCss.css';

import  VueResource  from 'vue-resource'

Vue.use(VueResource)
Vue.use(ElementUI);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
