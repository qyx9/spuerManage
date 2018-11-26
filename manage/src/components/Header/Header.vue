<template>
    <div class="Header">
       <el-header>
            <h2 class="title"> <i class="el-icon-menu"></i> 人口倒卖后台管理系统  </h2>
            <el-dropdown  trigger="click"  @command="handleCommand">
                
                <span class="el-dropdown-link">
                    欢迎您！
                    {{ user }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                        <el-dropdown-item command="change">切换账号</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
                <div class="img">
                    <img src="./109328-106.jpg" alt="">
                </div>
        </el-dropdown>
    </el-header>
    </div>
</template>
<script>
export default {
    data(){
        return{
            user:'',
            id:''
        }
    },
   methods:{
       handleCommand(command){
    //    console.log(command);
      if(command==='personal'){
       this.$router.push('/Personal');
      }
      else if(command==='change'){
    this.$router.push('/login');
      }
      else if(command==='logout'){
          this.axios.get('http://127.0.0.1:3000/users/logout')
          .then(response=>{
            //   console.log(response.data);
            if(response.data.errCode===1){
                this.$message({
                    type:"success",
                    message:response.data.msg
                })
                setTimeout(()=>{
                    this.$router.push('/login');
                },1000)
            }
          })
      }
       },
       //获取用户名名字
       getusername(){
       this.axios.get('http://127.0.0.1:3000/users/username')
       .then(response=>{
        //    console.log(response.data);
        this.user=response.data;
       })
       }
   },
   created(){
    this.getusername();
   }
};
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
