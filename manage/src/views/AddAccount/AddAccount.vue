<template>
  <div class="AddAccount">
    <el-container>
      <!-- 头 -->
      <Header></Header>
      <!-- 内容 -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>添加编辑账号</span>
          </div>

          <div class="">
            <el-form  :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
              <!-- 会员姓名 -->
              <el-form-item label="真实名字:" prop="pass">
                <el-input type="text" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 会员卡号 -->
              <el-form-item label="会员卡卡号:" prop="checkPass">
                <el-input type="text" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 选择会员类型 -->
              <el-form-item label="用户组" prop="usergroup">
                <el-select v-model="ruleForm2.usergroup" placeholder="请选择会员类型">
                  <el-option label="高级会员.99%" value="高级会员.99%"></el-option>
                  <el-option label="普通会员.99%" value="普通会员.99%"></el-option>
                </el-select>
              </el-form-item>
              <!-- 身份证号 -->
              <el-form-item label="身份证号:" prop="checkPass">
                <el-input type="text" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 用户状态 -->
              <el-form-item label="用户状态:" prop="radio">
                <el-radio v-model="ruleForm2.radio" label="1">启用</el-radio>
                <el-radio v-model="ruleForm2.radio" label="2">禁用</el-radio>
              </el-form-item>
              <!-- 手机 -->
              <el-form-item label="手机号码:" prop="pass">
                <el-input type="text" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 座机号码 -->
              <el-form-item label="座机号码:" prop="pass">
                <el-input type="text" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 邮箱地址 -->
              <el-form-item label="邮箱地址:" prop="pass">
                <el-input type="text" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 地区选择 -->
               <el-form-item label="地区选择:" prop="pass">
                <el-input type="text" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 详细地址 -->
              <el-form-item label="详细地址:" prop="pass">
                <el-input type="text" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 邮政编码 -->
              <el-form-item label="邮政编码:" prop="pass">
                <el-input type="text" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 添加 -->
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">添加</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-main>
      <!-- 尾部 -->
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
// 引入头部组件
import Header from "@/components/Header/Header.vue";
// 引入尾部组件
import Footer from "@/components/Footer/Footer.vue";
export default {
  // 组成组件
  components: {
    Header: Header,
    Footer: Footer
  },
  data() {
    return {
      ruleForm2: {
        pass: "",
        checkPass: "", 
        radio:'1',
        usergroup:'普通会员.99%'
      }
    };
  },
  methods: {
    handleClick() {
      alert("button click");
    }
  }
};
</script>


<style lang="less">
.AddAccount {
  width: 100%;
  display: flex; // 让这个盒子 变为一个可以伸缩的盒子
  flex-direction: column;
  .el-main {
    flex: 1;
  }
  .el-container {
    width: 100%;
  }
  //长度
  .el-form-item__content {
    width: 300px;
  }
  //卡牌
  .el-card__header {
    text-align: left;
    font-weight: 700;
  }
}

.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>


