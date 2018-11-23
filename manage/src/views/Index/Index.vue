<template>
    <div class="Index">
      <el-container>
        <el-aside width="200px">
          <Nav></Nav>
           </el-aside>
        <router-view></router-view>
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
     .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }
  .el-aside {
    background-color: #2d3a4b;
    color: #333;
    text-align: center;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  .el-container{
     height: 100%;
  }
  
 }
</style>
