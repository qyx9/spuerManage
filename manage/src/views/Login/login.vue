<template>
    <div class="login">
        <div class="login-form">
            <!-- 标题 -->
            <h1 class="title">人口倒卖后台管理系统</h1>

            <el-form :model="userlogin" status-icon :rules="rules2" ref="userlogin" label-width="100px" class="demo-ruleForm">
               
                <el-form-item label="帐号" prop="username">
                    <el-input type="text" v-model="userlogin.username" autocomplete="off"></el-input>
                </el-form-item>
               
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="userlogin.password" autocomplete="off"></el-input>
                </el-form-item>
                
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="userlogin.checkPass"></el-input>
                </el-form-item>
               
                <el-form-item>
                    <el-button type="primary" @click="submitForm('userlogin')">登录</el-button>
                    <el-button @click="resetForm('userlogin')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
//引入 qs
import qs from 'qs';
export default {
    data() {
        // 自定义一个验证密码一致性的函数
         let confirmPwd = (rule,value,callback)=>{
             if(value === ''){
                 callback(new Error('请在次输入密码'));
             }else if(value !== this.userlogin.password){
                 callback(new Error('两次密码不一致'));
             }else{
                callback();

             }
         }
     
      return {
           id:'',
        //   登录表单数据对象
        userlogin: {
          username: '',
         password: '',
          checkPass: '',
        },
        
        //验证字段
        rules2: {
        //   验证用户名
        username:[
            { required: true, message: '帐号不能为空', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        // 验证密码
       password:[
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        // 验证确认密码
        checkPass:[
            { required: true, validator:confirmPwd, trigger: 'blur' },
        ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            // 拿到帐号密码
            //如果前端验证通过发请求给后端
            let parms={
                username:this.userlogin.username,
                password:this.userlogin.password
            }
             // 允许携带cookie
          this.axios.defaults.withCredentials=true;
            this.axios.post('http://127.0.0.1:3000/users/userLogin',qs.stringify(parms),{'header':{'Content-Type':'application/x-www/form-urlencoded'}})
            .then(response=>{
                // console.log(response.data);
                
                if(response.data.errCode===1){
                    this.$message({
                        type:"success",
                        message:response.data.msg
                    })
                    setTimeout(()=>{
                        this.$router.push('/');
                    },1000);
                }else{
                    this.$message.error(response.data.msg);
                }
            })
            // let username = this.userlogin.username;
            // letpassword = this.userlogin.userpass;
            // 通过路由跳转跳到后端系统首页
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getbank(){
          this.axios.get(`http://127.0.0.1:3000/users/userbank`)
          .then(response=>{
              if(response.data.errCode===0){
                  
              }else{
              this.userlogin.username=response.data[0].username;
              this.userlogin.password=response.data[0].password;
              this.userlogin.checkPass=response.data[0].password;
              }
              
          })
      }
    },
    //vue的生命周期 适合用于发送请求
    created(){
     this.getbank();
    }
};
</script>

<style lang="less">
.login {
  height: 100%;
  background: url("./timg.jpg")  no-repeat;
  background-size:cover;
  .login-form {
    width: 500px;
    height: 350px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 8px;
    // 水平垂直居中
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .title{
        text-align: center;
        color: #ffffff;
    }
    .el-form-item__label{
        color: white;
    }
    .el-input{
        width: 370px;
    }
  }
}
</style>

