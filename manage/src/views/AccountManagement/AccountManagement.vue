<template>
    <div class="AccountManagement">
        <el-container>
            <!-- 头 -->
            <Header></Header>
            <!-- 内容 -->
            <el-main>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>会员管理</span>
                    </div>
                    <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="搜索:" prop="pass">
                            <el-input type="text" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                            会员卡、会员名、电话、手机
                            <el-button icon="el-icon-search" circle></el-button>
                        </el-form-item>
                    </el-form>
                    <div class="segmentation"></div>
                    <!-- 表单 -->
                    <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55">
                        </el-table-column>

                        <el-table-column label="会员卡卡号" width="120">
                            <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>

                        <el-table-column prop="name" label="会员姓名" width="120">
                        </el-table-column>

                        <el-table-column prop="address" label="会员等级" show-overflow-tooltip>
                        </el-table-column>

                        <el-table-column prop="address" label="会员积分" show-overflow-tooltip>
                        </el-table-column>

                        <el-table-column prop="address" label="折扣" show-overflow-tooltip>
                        </el-table-column>

                        <el-table-column prop="address" label="手机号" show-overflow-tooltip>
                        </el-table-column>

                        <el-table-column prop="address" label="座机号" show-overflow-tooltip>
                        </el-table-column>

                        <el-table-column prop="address" label="管理" show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
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
// 引入header组件
import Header from "@/components/Header/Header.vue";
// 引入footer组件
import Footer from "@/components/Footer/Footer.vue";
export default {
  // 注册组件
  components: {
    Header,
    Footer
  },
  data() {
    return {
      ruleForm2: {
        pass: ""
      },
      tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
    };
  },
  methods: {
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
      }
    }
};
</script>

<style lang="less">
.AccountManagement {
  width: 100%;
  .el-container {
    width: 100%;
    .el-main {
      .box-card {
        .el-input {
          width: 200px;
        }
        .el-button {
          background-color: green;
          color: white;
        }
        .segmentation {
          border-bottom: 5px solid #ccc;
          width: 95%;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>


