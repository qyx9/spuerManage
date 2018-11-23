<template>
<div class="body">
    <div class="login">
        <el-form :model="userlogin" status-icon :rules="rules2" ref="userlogin" label-width="100px" class="demo-ruleForm">
             <h1 style=" text-align: center;">怡佳超市管理系统</h1>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model.number="userlogin.username"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="userpass">
                    <el-input type="password" v-model="userlogin.userpass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="userlogin.checkPass" autocomplete="off"></el-input>
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
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }   
        else{
            callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.userlogin.checkPass !== '') {
            this.$refs.userlogin.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userlogin.userpass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        userlogin: {
          userpass: '',
          checkPass: '',
          username: ''
        },
        rules2: {
          userpass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          username: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert("前端验证通过");
            //
            let username =this.userlogin.username;
            let userpass=this.userlogin.userpass;
            // console.log(username);
            // console.log(userpass);
            //跳转
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
}
</script>
<style lang="less">
.body{
    width: 100%;
    height: 100%;
    background: url(./66.jpg);
  .login{
      width: 500px;
      height: 500px;
      //居中
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      .el-form-item__label{
          color:#fff;
         
      }
      .el-form{
          background:rgba(0,0,0,0.5);
          padding-right: 30px;
      }
  }
}
</style>
