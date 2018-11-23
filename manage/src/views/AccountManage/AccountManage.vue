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
                          <div  class="text item">
                              <el-table
                        ref="multipleTable"
                        :data="amanage"
                          tooltip-effect="dark"
                        style="width: 100%"
                          @selection-change="handleSelectionChange">
                           <el-table-column
                           type="selection"
                            >
                        </el-table-column>

                        <el-table-column
                            prop="username"
                            label="名字"
                           >
                        </el-table-column>
                        <el-table-column
                            prop="usergroup"
                            label="组别">
                        </el-table-column>
                        <el-table-column
                            prop="cdate"
                            label="日期">
                        </el-table-column>

                        <el-table-column label="操作"  prop="action">
                        <template slot-scope="scope">
                            <!-- 传入id -->

                            <el-button
                            size="mini"
                            @click="handleEdit(scope.row.id)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                     </el-table-column>
                        </el-table>
                        </div>
              </el-card>
          </el-tabs>
        </el-main>
      <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>
<script>
import Header from '@/components/Header/Header.vue';
export default {
    components:{
     Header,
    },
      data() {
      return {
        amanage: []
      }
    },
     methods: {
      handleEdit(id) {
          console.log("你确定修改"+id)
        // console.log(index, row);
      },
      handleDelete(id) {
          // console.log(index, row);
          this.axios.get(`http://127.0.0.1:3000/users/deluser?id=${id}`)
          .then(response=>{
                if(response.data.errCode===1){
                    //弹出提示框
                    this.$message({
                        type:"success",
                        message:response.data.msg
                    })
                    //重新请求数据
                    this.getUserlist()
                }else{
                    this.$message.eror(response.data.msg);
                }
          })
          console.log("你确定要删除"+id)
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
    getUserlist(){
         this.axios.get('http://127.0.0.1:3000/users/userlist')
         .then(response=>{
             //把接收的数据给前端
             this. amanage=response.data;
            //  console.log(response.data);
         })
    }
     },
     //vue 的生命周期 适合用于发送请求
     created(){
         this.getUserlist();
     }
}
</script>
<style lang="less">
 .AccountManage{
     width: 100%;
     .el-tabs--border-card{
         .el-tabs__nav{
             padding-left: 600px;
          }
     }
          .el-card__header{
         text-align: left;
         font-weight: 700;
     }
 }
</style>
