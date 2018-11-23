import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
//z注册路由
Vue.use(Router)

//引入login模块
import login from "@/views/Login/login.vue";

//引入Index模块
import Index from "@/views/Index/Index.vue";
//引入系统信息模块
import AccountAdd from '@/views/AccountAdd/AccountAdd.vue';
import AccountManage from '@/views/AccountManage/AccountManage.vue';
import EditPass from '@/views/EditPass/EditPass.vue';
import ManageShop from '@/views/ManageShop/ManageShop.vue';
import ShopAdd from '@/views/ShopAdd/ShopAdd.vue';
import Vicious from '@/views/Vicious/Vicious.vue';
import Usermess from '@/views/Usermess/Usermess.vue';

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'index',
      path: '/',
      component: Index,
      children:[
        {
          name: 'AccountAdd',
          path: '/AccountAdd',
          component: AccountAdd
        },
        {
          name: 'AccountManage',
          path: '/AccountManage',
          component: AccountManage
        },
        {
          name: 'EditPass',
          path: '/EditPass',
          component: EditPass
        },
        {
          name: 'ManageShop',
          path: '/ManageShop',
          component: ManageShop
        },
        {
          name: 'ShopAdd',
          path: '/ShopAdd',
          component: ShopAdd
        },
        {
          name: 'Vicious',
          path: '/Vicious',
          component: Vicious
        },
        {
          name: 'Usermess',
          path: '',
          component: Usermess
        }
      ]
      }
    
   
   
    
    




    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
