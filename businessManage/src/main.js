// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router.js';
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
  components: { App },
  template: '<App/>'
})