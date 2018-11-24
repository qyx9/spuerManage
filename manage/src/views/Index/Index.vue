<template>
    <div class="Index">
      <el-container>
        <!-- 左侧导航栏 -->
        <el-aside width="200px">
          <!-- 头部 -->
          <Nav></Nav>
        </el-aside>
        
        <el-container>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-container>
        
     </el-container>
    </div>
</template>
<script>
//引入Nav
import Nav from '@/components/Nav/Nav.vue';
export default {
     components:{
       Nav
     }
}
</script>
<style lang="less"> 
.Index{
     height: 100%;
  .el-aside {
    background-color: #2d3a4b;
    color: #333;
    text-align: center;
  }
  .el-container{
    height: 100%;
     
  }
  
 }
</style>
