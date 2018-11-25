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
import Footer from '@/components/Footer/Footer.vue';
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
      shopmanage: []
    };
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleEdit(id) {
       this.$router.push({
                path:'/Shopedit',
                name:'Shopedit',
                params:{
                 id : id
                }
              })
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
            this.getshoplists();
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
      this.multipleSelection = val;
    },
    getshoplists() {
      this.axios.get("http://127.0.0.1:3000/users/shoplists").then(response => {
        this.shopmanage = response.data;
        // console.log(response.data);
      });
    }
  },
  //vue 生命周期 created（）适合发送请求
  created() {
    this.getshoplists();
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
