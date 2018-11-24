<template>
    <div class="ShopAdd">
        <el-container>
            <Header></Header>
            <el-main>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>添加商品</span>
                    </div>
                    <div class="text item">
                      <el-form :model="formadd" status-icon :rules="formRules" ref="formadd" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="选择分类" prop="region">
                                <el-select v-model="formadd.region" placeholder="请选择分类">
                                    <el-option label="生活用品" value="生活用品"></el-option>
                                    <el-option label="水果" value="水果"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="商品条码" prop="bar">
                                <el-input type="text" v-model="formadd.bar"  autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="商品名称"  prop="name">
                                <el-input type="text" v-model="formadd.name" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="商品售价" prop="sale">
                                <el-input type="text" v-model="formadd.sale" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="市场价" prop="market">
                                <el-input type="text" v-model="formadd.market" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="商品进价" prop="bid">
                                <el-input type="text" v-model="formadd.bid" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="入库数量" prop="putin">
                                <el-input type="text" v-model="formadd.putin" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="商品重量" prop="shopkg">
                                <el-input type="text" v-model="formadd.shopkg" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="商品单位" prop="unit">
                                <el-input type="text" v-model="formadd.unit" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="会员优惠" prop="menber">
                                <el-radio-group v-model="formadd.menber">
                                    <el-radio label="享受会员价" value="享受会员价"></el-radio>
                                    <el-radio label="不享受会员价" value="不享受会员价"></el-radio>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item label="商品促销" prop="comp">
                                <el-radio-group v-model="formadd.comp">
                                    <el-radio label="启用" value="启用"></el-radio>
                                    <el-radio label="禁用" value="禁用"></el-radio>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item label="商品简介" prop="descs">
                                <el-input type="textarea" v-model="formadd.descs"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="submitForm('formadd')">添加</el-button>
                                <el-button @click="resetForm('formadd')">重置</el-button>
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
import qs from "qs";
import Header from "@/components/Header/Header.vue";
export default {
  components: {
    Header
  },
  data() {
      // 自定义一个验证密码一致性的函数
    const confirmPwd = (rule, value, callback) => {
        // 非空验证
        if (value === '') {
            // 输出不能为空的提示
            callback(new Error('请再次输入密码'));
        } else if (value !== this.adduser.password) { // 一致性验证
            // 输出密码不一致的回调
            callback(new Error('两次密码不一致'))
        } else {
            // 成功提示（绿色勾勾）
            callback()
        }
    }
    return {
      formadd: {
        name: "",
        region: "",
        bar: "",
        sale: "",
        market: "",
        bid: "",
        putin: "",
        shopkg: "",
        unit: "",
        type: [],
        menber: "",
        comp: "",
        descs: ""
      },
       formRules: {
        // 验证用户名
       region: [
            { required: true, message: '选择不能为空', trigger: 'change' }// 非空验证
        ],
       comp: [
            { required: true, message: '选择不能为空', trigger: 'change' }// 非空验证
        ],
       menber: [
            { required: true, message: '选择不能为空', trigger: 'change' }// 非空验证
        ],
        // 验证确认密码 --- 自定义验证规则
        // validtor 配置选项的值 是一个函数 可以自己在这个函数里面验证
        name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }, // 非空验证
        ],
        bar: [
            { required: true, message: '商品条码不能为空', trigger: 'blur' }, // 非空验证
        ],
        sale: [
            { required: true, message: '商品售价不能为空', trigger: 'blur' }, // 非空验证
        ],
        market: [
            { required: true, message: '市场价不能为空', trigger: 'blur' }, // 非空验证
        ],
        bid: [
            { required: true, message: '进价不能为空', trigger: 'blur' }, // 非空验证
        ],
        putin: [
            { required: true, message: '数量不能为空', trigger: 'blur' }, // 非空验证
        ],
        shopkg: [
            { required: true, message: '重量不能为空', trigger: 'blur' }, // 非空验证
        ],
        unit: [
            { required: true, message: '单位不能为空', trigger: 'blur' }, // 非空验证
        ],
        descs: [
            { required: true, message: '描述不能为空', trigger: 'blur' }, // 非空验证
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

        //   alert("前端验证通过，可以发送给后端!");
          // 收集账号和密码（获取用户输入的账号和密码 发送给前端）
          let parms={
             name:this.formadd.name,
             region:this.formadd. region,
             bar:this.formadd.bar,
             bid:this.formadd.bid,
             sale:this.formadd.sale,
             market:this.formadd.market,
             putin:this.formadd.putin,
             shopkg:this.formadd.shopkg,
             unit:this.formadd.unit,
             menber:this.formadd.menber,
             comp:this.formadd.comp,
             descs:this.formadd.descs
          }
        //   let username = this.formadd.username;
        //   let password = this.formadd.password;
        //   let usergroup = this.formadd.usergroup;
         
          console.log(parms);
          this.axios.post('http://127.0.0.1:3000/users/shoplist',qs.stringify(parms),{'header':{'Content-Type':'application/x-www-form-urlencoded' }})
          .then(response=>{
            // console.log(response.data);
            if(response.data.errCode===1){
                this.$message({
                    type:"success",
                    message:response.data.msg
                })
                this.$router.push('/ManageShop');
            }else{
                this.$message.error(response.data.msg);
            }

          })
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
};
</script>
<style lang="less">
.ShopAdd {
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
</style>
