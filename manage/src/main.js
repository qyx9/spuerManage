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


//路由守卫
router.beforeEach((to,from,next)=>{
  // alert("我是路由守卫");
  // 允许携带cookie
  axios.defaults.withCredentials=true;
  //定义一个浏览器状态
  let islogin;

  //检测用户是否登录
  axios.get('http://127.0.0.1:3000/users/checklogin')
  .then(response=>{
    islogin=response.data.islogin;
    if(!islogin){
      if(to.path !=='/login'){
         return next({"path":"/login"});
      }else{
        next();
      }
     }else{
   //放行
      next();
    }
    // console.log(response.data);
  })
  //放行
  next();
})
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
