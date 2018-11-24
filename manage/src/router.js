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
//账号添加
import AccountAdd from '@/views/AccountAdd/AccountAdd.vue';
//账号管理
import AccountManage from '@/views/AccountManage/AccountManage.vue';
//密码修改
import EditPass from '@/views/EditPass/EditPass.vue';
//管理商品
import ManageShop from '@/views/ManageShop/ManageShop.vue';
//添加商品
import ShopAdd from '@/views/ShopAdd/ShopAdd.vue';
//
import Vicious from '@/views/Vicious/Vicious.vue';
import Usermess from '@/views/Usermess/Usermess.vue';
//销售统计
import SalesCount from '@/views/SalesCount/SalesCount.vue';
// 引入添加会员模块
import AddAccount from '@/views/AddAccount/AddAccount.vue';
// 引入会员管理模块
import AccountManagement from '@/views/AccountManagement/AccountManagement.vue';

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
          name: 'SalesCount',
          path: '/SalesCount',
          component: SalesCount
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
        },
        {// 添加会员模块
          name: 'AddAccount',
          path: '/AddAccount',
          component: AddAccount
        },
        {
          //添加会员管理模块
          name:"AccountManagement",
          path:"/AccountManagement",
          component:AccountManagement
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
