import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//引入axios
import axios from 'axios';
//把axios挂载在Vue上
Vue.prototype.axios=axios;
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';//引入css样式

//引入base样式
import "@/common/css/base.css";
//暴露出去
Vue.use(ElementUI);
// 阻止生产提示
Vue.config.productionTip = false;
//创建实列对象
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
