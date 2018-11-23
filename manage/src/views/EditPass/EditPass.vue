<template>
    <div class="editpass">
          <el-container>
           <Header></Header>
        <el-main>
            <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加账号</span>
            </div>
            <div class="text item">
                <el-form :model="editpass" status-icon :rules="loginRules" ref="editpass" label-width="100px" class="demo-ruleForm">

                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="editpass.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="text" v-model="editpass.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPwd">
                    <el-input type="text" v-model="editpass.checkPwd"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('editpass')">修改</el-button>
                </el-form-item>

            </el-form>
            
            </div>
        </el-card>
        </el-main>
      <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>
<script>
import Header from '@/components/Header/Header.vue';
export default {
        components:{
        Header
    },
    data() {
    // 自定义一个验证密码一致性的函数
    const confirmPwd = (rule, value, callback) => {
        // 非空验证
        if (value === '') {
            // 输出不能为空的提示
            callback(new Error('请再次输入密码'));
        } else if (value !== this.editpass.password) { // 一致性验证
            // 输出密码不一致的回调
            callback(new Error('两次密码不一致'))
        } else {
            // 成功提示（绿色勾勾）
            callback()
        }
    }

    return {
      // 登录表单数据对象
      editpass: {
        username: "",
        password: "",
        checkPwd: "",
        usergroup:""
      },
      // 验证的字段   
      loginRules: {
        // 验证用户名
        username: [
            { required: true, message: '账号不能为空', trigger: 'blur' }, // 非空验证
            { min: 3, max: 6, message: '长度必须 3 到 6 个字符', trigger: 'blur' } // 长度验证
        ],
        // 验证密码
        password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }, // 非空验证
            { min: 3, max: 6, message: '长度必须 3 到 6 个字符', trigger: 'blur' } // 长度验证
        ],
        // 验证密码
        usergroup: [
            { required: true, message: '组别不能为空', trigger: 'change' }// 非空验证
        ],
        // 验证确认密码 --- 自定义验证规则
        // validtor 配置选项的值 是一个函数 可以自己在这个函数里面验证
        checkPwd: [
            { required: true, validator: confirmPwd, trigger: 'blur' }, // 非空验证
        ]
      }
    };
  },
  methods: {
    // 表单提交触发的函数
    submitForm(formName) {
      //  获取整个登录表单  调用validate(valid => {  }) 方法验证
      this.$refs[formName].validate(valid => {
        // 如果所有的表单前端验证都合法 那么 valid就是true 那么就可以提交给后端
        // 否则 只要有一个表单验证不合法 valid就是false 那么不能提交
        if (valid) {

          alert("前端验证通过，可以发送给后端!");
          // 前端验证通过 发送ajax 把账号 和 密码 发送给后端 验证 用户名和密码是否存在
          // 收集账号和密码（获取用户输入的账号和密码 发送给前端）
          let username = this.editpass.username;
          let password = this.editpass.password;

          console.log(username, password);

          // 通过路由跳转 跳转到后端系统首页
        //   console.log(this.$router) // vue实例可以直接获取路由对象
        //   this.$router.push('/');
          
        } else {
          console.log("前端验证不通过, 不能发送");
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
 .editpass{
     width: 100%;
    display: flex; // 让这个盒子 变为一个可以伸缩的盒子
    flex-direction: column; 
    .el-main{
         flex: 1; 
    }
     .el-container{
         width: 100%;
     }
    //长度
    .el-form-item__content{
        width: 300px;
    }
     //卡牌
     .el-card__header{
         text-align: left;
         font-weight: 700;
     }
     }
</style>
