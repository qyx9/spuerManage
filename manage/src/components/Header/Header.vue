<template>
    <div class="Header">
       <el-header>
            <h2 class="title"> <i class="el-icon-menu"></i> 怡佳超市管理系统  </h2>
            <el-dropdown>
            <span class="el-dropdown-link">
            admin<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <img src="./美女6.jpg" alt="">
    <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>切换账号</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
  </el-dropdown-menu>
  
</el-dropdown>
</el-header>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
.Header{
     .el-header{

        //  margin: 0;
         background-color: #ffff;
         height: 60px;
        //  line-height: 20px;
          line-height: 60px;
         text-align: right;
         border-top: 1px solid #ccc;
         border-bottom: 1px solid #ccc;
         padding-right: 30px;
        //   margin-right:10px; 
        .el-dropdown{
            top:-60px;
            margin-right: 40px;
        }
     }
     .title{
        //  display:inline-block;
         margin: 0;
         width: 300px;
         line-height: 60px;
        text-align: left;
     }
            img{
            //  display: inline-block;
                width: 50px;
                height: 50px; 
                border-radius: 50%;
                //  line-height: 60px;
                vertical-align:auto;
                // line-height: 50px;   
              }
}
</style>
