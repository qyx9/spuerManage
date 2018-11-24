<template>
    <div class="login">
        <div class="login-form">
            <!-- 标题 -->
            <h1 class="title">人口倒卖后台管理系统</h1>

            <el-form :model="userlogin" status-icon :rules="rules2" ref="userlogin" label-width="100px" class="demo-ruleForm">
               
                <el-form-item label="帐号" prop="username">
                    <el-input type="text" v-model="userlogin.username" autocomplete="off"></el-input>
                </el-form-item>
               
                <el-form-item label="密码" prop="userpass">
                    <el-input type="password" v-model="userlogin.userpass" autocomplete="off"></el-input>
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
export default {
    data() {
        // 自定义一个验证密码一致性的函数
         let confirmPwd = (rule,value,callback)=>{
             if(value === ''){
                 callback(new Error('请在次输入密码'));
             }else if(value !== this.userlogin.userpass){
                 callback(new Error('两次密码不一致'));
             }else{
                callback();

             }
         }
     
      return {
        //   登录表单数据对象
        userlogin: {
          username: '',
          userpass: '',
          checkPass: ''
        },
        //验证字段
        rules2: {
        //   验证用户名
        username:[
            { required: true, message: '帐号不能为空', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        // 验证密码
        userpass:[
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
            alert('submit!');
            // 拿到帐号密码
            let username = this.userlogin.username;
            let userpass = this.userlogin.userpass;
            // 通过路由跳转跳到后端系统首页
            this.$router.push('/');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
};
</script>

<style lang="less">
.login {
  height: 100%;
  background: url("./55ee948a21eea.jpg") center;
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
        width: 350px;
    }
  }
}
</style>

