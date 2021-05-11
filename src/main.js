import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入外部样式
import "assets/css/common.less"
Vue.prototype.$echarts = window.echarts
Vue.use(ElementUI);
//excel表格
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
