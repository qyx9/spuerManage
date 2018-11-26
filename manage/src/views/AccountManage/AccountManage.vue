<template>
  <div class="AccountManage">
    <el-container>
      <Header></Header>
      <el-main>
        <el-tabs type="border-card">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>账号管理</span>
            </div>
            <div class="text item">
              <el-table ref="multipleTable" :data="amanage" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection">
                </el-table-column>

                <el-table-column prop="username" label="名字">
                </el-table-column>
                <el-table-column prop="usergroup" label="组别">
                </el-table-column>
                <el-table-column prop="cdate" label="日期">
                  <template slot-scope="scope">{{ scope.row.cdate | formatCdate }}</template>
                </el-table-column>

                <el-table-column label="操作" prop="action">
                  <template slot-scope="scope">
                    <!-- 传入id -->

                    <el-button size="mini" @click="handleEdit(scope.row.id)">修改</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
                <!-- 分页组件 -->
          <div class="block">
            <el-pagination @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
              :current-page="currentPage" 
             :page-sizes="[1, 3, 5, 7]"
              :page-size=" Pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
              <div style="margin-top: 20px">
                <el-button @click="delselect" type="danger">批量删除</el-button>
                <el-button @click="toggleSelection()">取消选择</el-button>
              </div>
            </div>
          </el-card>
        </el-tabs>
        <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

        <el-dialog title="修改用户" :visible.sync="dialogFormVisible">
          <el-form :model="editform" status-icon :rules="loginRules" ref="editform" label-width="100px" class="demo-ruleForm">

            <el-form-item label="账号" prop="username">
              <el-input type="text" v-model="editform.username" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input type="text" v-model="editform.password" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="选择组" prop="usergroup">
              <el-select v-model="editform.usergroup" placeholder="请选择组别">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通管理员" value="普通管理员"></el-option>
              </el-select>
            </el-form-item>

            <!-- <el-form-item>
              <el-button type="primary" @click="submitForm('editform')">添加</el-button>
              <el-button @click="resetForm('editform')">重置</el-button>
            </el-form-item> -->

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('editform')">确 定</el-button>
          </div>
        </el-dialog>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
// 引入尾部组件
import Footer from "@/components/Footer/Footer.vue";
//引入moment 时间格式化插件
import moment from "moment";
//引入 qs
import qs from 'qs';
export default {
  components: {
    Header,
    Footer
  },
  data() {
    // 自定义一个验证密码一致性的函数
    const confirmPwd = (rule, value, callback) => {
      // 非空验证
      if (value === "") {
        // 输出不能为空的提示
        callback(new Error("请再次输入密码"));
      } else if (value !== this.editform.password) {
        // 一致性验证
        // 输出密码不一致的回调
        callback(new Error("两次密码不一致"));
      } else {
        // 成功提示（绿色勾勾）
        callback();
      }
    };
    return {
      amanage: [],
      editid:'',//用于保存id
      selectArr:[],//用于保存选择
      currentPage: 1,
      Pagesize:3,
      total:8,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      editform: {
        username: "",
        password: "",
        usergroup: ""
      },
      // 验证的字段
      loginRules: {
        // 验证用户名
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }, // 非空验证
          { min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur" } // 长度验证
        ],
        // 验证密码
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }, // 非空验证
          { min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur" } // 长度验证
        ],
        // 验证密码
        usergroup: [
          { required: true, message: "组别不能为空", trigger: "change" } // 非空验证
        ]
        // 验证确认密码 --- 自定义验证规则
        // validtor 配置选项的值 是一个函数 可以自己在这个函数里面验
      }
    };
  },
  methods: {
    handleEdit(id) {
      //把id用一个变量保存起来
      this.editid=id;
      this.axios
        .get(`http://127.0.0.1:3000/users/editform?id=${id}`)
        .then(response => {
          console.log(response.data);
          this.editform=response.data[0];
        });
      // this.$router.push(`/EditPass`);
      // console.log("你确定修改" + id);
      // console.log(index, row);
      this.dialogFormVisible = true;
    },
    handleDelete(id) {
      // console.log(index, row);
      this.axios
        .get(`http://127.0.0.1:3000/users/deluser?id=${id}`)
        .then(response => {
          if (response.data.errCode === 1) {
            //弹出提示框
            this.$message({
              type: "success",
              message: response.data.msg
            });
            //重新请求数据
            this.getUserlistpage();
          } else {
            this.$message.eror(response.data.msg);
          }
        });
      console.log("你确定要删除" + id);
    },
    // 下面两个是选择相关的函数
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
     //把数据保存在selectArr中
     this.selectArr=val;
    //  console.log(val);
    },
    //批量删除
    delselect(){
     //把id从selectArr中遍历出来
     var idArr=this.selectArr.map(v =>v.id);
     console.log(idArr);
     //判断如果没有选择就不执行下面的函数
     if(!idArr.length){
       this.$message.error("没有选择数据，请选择！");
       return
     }
     //收集参数
     let parms={
       idArr:JSON.stringify(idArr)//把数组转换为字符串
     }
     //发送请求
     this.axios.post("http://127.0.0.1:3000/users/delselect",
     qs.stringify(parms),{'header':{'Content-Type':'application/x-www/form-urlencoded'}})
     .then(response=>{
       if(response.data.errCode===1){
         this.$message({
           type:"success",
           message:response.data.msg
         })
         //删除成功
        //  刷新页面
        this.getUserlistpage();
       }else{
         this.$message.error(response.data.msg);
       }
      //  console.log(response.data);
     })
    },
    // //发送请求
    // getUserlist() {
    //   this.axios.get("http://127.0.0.1:3000/users/userlist").then(response => {
    //     //把接收的数据给前端
    //     this.amanage = response.data;
    //     //  console.log(response.data);
    //   });
    // },
    //分页请求
    getUserlistpage() {
      //获取当前页码
      let currentPage=this.currentPage;
      //获取当前多少条
      let Pagesize=this.Pagesize;
      this.axios.get(`http://127.0.0.1:3000/users/userlistpage?currentPage=${currentPage}&Pagesize=${Pagesize}`)
      .then(response => {
        
        //把接收的数据给前端
        this.amanage=response.data.data;
        this.total=response.data.tatalcount;
        //判断
        if(!response.data.data.length && currentPage!==1){
          this.currentPage-=1;
          this.getUserlistpage()
        }
        // this.amanage = response.data;
        //  console.log(response.data);
      });
    },
      // 表单提交触发的函数
    submitForm(formName) {
      //  获取整个登录表单  调用validate(valid => {  }) 方法验证
      this.$refs[formName].validate(valid => {
        // 如果所有的表单前端验证都合法 那么 valid就是true 那么就可以提交给后端
        // 否则 只要有一个表单验证不合法 valid就是false 那么不能提交
        if (valid) {
          // 收集账号和密码（获取用户输入的账号和密码 发送给前端）
          let parms={
            username:this.editform.username,
            password:this.editform.password,
            usergroup:this.editform.usergroup,
            id:this.editid
          }
           //如果表单验证通过发送请求
           this.axios.post('http://127.0.0.1:3000/users/userEdit',
           qs.stringify(parms),{'header':{'Content-Type':'application/x-www/form-urlencoded'}})
           .then(response=>{
             if(response.data.errCode===1){
               this.$message({
                 type:"success",
                 message:response.data.msg
               })
               //隐藏回显框
                this.dialogFormVisible = false;
                //刷新页面
               this.getUserlistpage();
             }else{
               this.$msessage.error(reponse.data.msg);
             }
            //  console.log(response.data);
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
    },

    //分页函数
    handleSizeChange(val) {
      //获取当前多少条
      this.Pagesize=val;
       this.getUserlistpage();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
       //获取当前页码
      this.currentPage=val;
       this.getUserlistpage();
      // console.log(`当前页: ${val}`);
    }
  },
  //vue 的生命周期 适合用于发送请求
  created() {
    this.getUserlistpage();
  },
  filters: {
    formatCdate(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>
<style lang="less">
.AccountManage {
  width: 100%;
  .el-tabs--border-card {
    .el-tabs__nav {
      padding-left: 600px;
    }
  }
  .el-card__header {
    text-align: left;
    font-weight: 700;
  }
  .el-pagination {
    margin-top: 15px;
  }
  .el-dialog__body {
    width: 350px;
  }
  .el-dialog__header {
    .el-dialog__title {
      font-weight: 700;
    }
  }
}
</style>
