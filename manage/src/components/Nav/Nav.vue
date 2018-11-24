<template>
    <div class="Nav">
     <el-menu :default-active="$route.path" :unique-opened="true" active-text-color="rgb(64, 158, 255)" router>
             <el-submenu index="0">
                  <template slot="title"><i class="el-icon-message"></i>系统管理</template>
                    <el-menu-item index="/">系统信息</el-menu-item>
                </el-submenu>
                <el-submenu index="1">
                  <template slot="title"><i class="el-icon-message"></i>账号管理</template>
                 
                    <el-menu-item index="/AccountManage">账号管理</el-menu-item>
                    <el-menu-item index="/AccountAdd">添加账号</el-menu-item>
                    <el-menu-item index="EditPass">修改密码</el-menu-item>
        
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title"><i class="el-icon-menu"></i>商品管理</template>
               
                    <el-menu-item index="ShopAdd">添加商品</el-menu-item>
                    <el-menu-item index="ManageShop">管理商品</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title"><i class="el-icon-setting"></i>统计管理</template>
              
                    <el-menu-item index="SalesCount">销售统计</el-menu-item>
                    <el-menu-item index="Vicious">缺货统计</el-menu-item>
                </el-submenu>
              </el-menu>
        </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
.Nav{
    text-align: center;
     background-color: #2d3a4b;
    .el-submenu__title{
         background-color: #2d3a4b;
         color: #fff;
         font-size: 17px;
      }

    .el-menu-item{
        background-color: #2d3a4b;
        color: #fff;
        font-size: 15px;
    }
    .el-menu {
        border:none;
        
    }
 
}
</style>
