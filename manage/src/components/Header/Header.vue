<template>
    <div class="Header">
       <el-header>
            <h2 class="title"> <i class="el-icon-menu"></i> 人口倒卖后台管理系统  </h2>
            <el-dropdown>
                
                <span class="el-dropdown-link">
                    欢迎您！
                    admin<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>切换账号</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
                <div class="img">
                    <img src="./109328-106.jpg" alt="">
                </div>
        </el-dropdown>
    </el-header>
    </div>
</template>
<script>
export default {};
</script>
<style lang="less">
.Header {
    background-color: aquamarine;
    height: 60px;
  .el-header {
    border:none;
    background-color: #ffff;
    .title {
      float: left;
      line-height: 60px;
      display: inline-block;
      text-align: left;
      margin: 0;
      padding: 0;
    }
    .el-dropdown{
        float: right;
        font-size: 20px;
        margin-right: 10px;
        .el-dropdown-link{
            display: inline-block;
            // width: 100px;
            height: 60px;
            vertical-align: middle;
        }
    }
  }
  .img {
    margin-top: 5px;
    width: 50px;
    height: 50px;
    display: inline-block;
    margin-left:10px; 
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
}
</style>
