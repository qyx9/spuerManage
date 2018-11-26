<template>
  <div class="manageshop">
    <el-container>
      <Header></Header>
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>商品管理</span>
          </div>
          <div class="text item">
            <!-- 查询组件 -->
            <el-form :inline="true" :model="formInline" class="demo-form-inline">

              <el-form-item label="选择分类">
                <el-select v-model="formInline.region" placeholder="选择分类">
                  <el-option label="生活用品" value="生活用品"></el-option>
                  <el-option label="水果" value="水果"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="关键字">
                <el-input v-model="formInline.user" placeholder="关键字"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
            <!-- 结尾 -->
            <!-- 管理商品组件 -->
            <el-table ref="shopmanage" :data="shopmanage" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection">
              </el-table-column>

              <el-table-column prop="bar" label="商品条形码">
              </el-table-column>

              <el-table-column prop="name" label="商品名称">
              </el-table-column>

              <el-table-column prop="region" label="所属分类">
              </el-table-column>

              <el-table-column prop="sale" label="售价">
              </el-table-column>

              <el-table-column prop="market" label="市场价">
              </el-table-column>

              <el-table-column prop="bid" label="进价">
              </el-table-column>

              <el-table-column prop="putin" label="入库数量">
              </el-table-column>

              <el-table-column prop="shopkg" label="商品重量">
              </el-table-column>

              <el-table-column prop="unit" label="商品单位">
              </el-table-column>

              <el-table-column prop="cdate" label="日期">
                <template slot-scope="scope">{{ scope.row.cdate | formatCdate }}</template>
              </el-table-column>

              <el-table-column label="操作" prop="action">
                <template slot-scope="scope">
                  <!-- 传入id -->
                  <el-button size="mini" @click="handleEdit(scope.row.id)"><i class="el-icon-edit"></i></el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)"><i class="el-icon-delete" type="danger"></i></el-button>
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
            <!-- 管理商品组件结尾 -->
          </div>
        </el-card>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
//引入qs
import qs from "qs";
import Header from "@/components/Header/Header.vue";
//引入moment 时间格式化插件
import moment from "moment";
// 引入尾部组件
import Footer from "@/components/Footer/Footer.vue";
export default {
  components: {
    Header,
    Footer
  },
  //查询组件相关代码
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      shopmanage: [],
       selectArr:[],//用于保存选择
       currentPage:1,
       Pagesize:3,
       total:1
    };
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleEdit(id) {
      this.$router.push({
        path: "/Shopedit",
        name: "Shopedit",
        params: {
          id: id
        }
      });
      console.log("你确定修改" + id);
      // console.log(index, row);
    },
    handleDelete(id) {
      // console.log(index, row);
      this.axios
        .get(`http://127.0.0.1:3000/users/delshop?id=${id}`)
        .then(response => {
          if (response.data.errCode === 1) {
            //弹出提示框
            this.$message({
              type: "success",
              message: response.data.msg
            });
            //重新请求数据
            this.getshoplistpage();
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
    // console.log(val);
    },
    // //请求数据
    // getshoplists() {
    //   this.axios.get("http://127.0.0.1:3000/users/shoplists").then(response => {
    //     this.shopmanage = response.data;
    //     // console.log(response.data);
    //   });
    // },
     //请求数据
    getshoplistpage() {
      //获取页码
      let currentPage=this.currentPage;
      //获取多少条页显示
      let Pagesize=this.Pagesize;
      this.axios.get(`http://127.0.0.1:3000/users/shoplistpage?currentPage=${currentPage}&Pagesize=${Pagesize}`)
      .then(response => {
        this.total=response.data.totalcount;
        this.shopmanage = response.data.data;
        //当页面删完的时候判断
        if(!response.data.data.length && currentPage !==1){
          this.currentPage-=1;
          this.getshoplistpage();
        }
        // console.log(response.data);
      });
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
     this.axios.post("http://127.0.0.1:3000/users/delselectshop",
     qs.stringify(parms),{'header':{'Content-Type':'application/x-www/form-urlencoded'}})
     .then(response=>{
       if(response.data.errCode===1){
         this.$message({
           type:"success",
           message:response.data.msg
         })
         //删除成功
        //  刷新页面
        this.getshoplistpage();
       }else{
         this.$message.error(response.data.msg);
       }
      //  console.log(response.data);
     })
    },
     //分页函数
    handleSizeChange(val) {
      //获取当前多少条
      this.Pagesize=val;
       this.getshoplistpage();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
       //获取当前页码
      this.currentPage=val;
       this.getshoplistpage();
      // console.log(`当前页: ${val}`);
    }
  },
  //vue 生命周期 created（）适合发送请求
  created() {
    this.getshoplistpage();
  },
  filters: {
    formatCdate(value) {
      return moment(value).format("YYYY-MM-DD");
    }
  }
};
</script>
<style lang="less">
.manageshop {
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
