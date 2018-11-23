<template>
    <div class="Usermess">
        <el-container>
           <Header></Header>
        <el-main>
            <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>系统信息</span>
            </div>
            <div class="text item">
                <div>
                 <el-alert
                title="成功提示的文案"
                type="success">
            </el-alert>
            <el-alert
                title="消息提示的文案"
                type="info">
            </el-alert>
                </div>
             <el-row :gutter="20">
                <el-col :span="12">
                <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>销售排行</span>
                        </div>
                        <div>
                              <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="商品名称"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="销量">
                        </el-table-column>
                        </el-table>
                        </div>
              </el-card>
                </el-col>
                <el-col :span="12">
                      <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>缺货统计</span>
                        </div>
                          <div>
                              <el-table
                        :data="tableDatasale"
                        style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="商品名称"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="库存">
                        </el-table-column>
                        <el-table-column
                            prop="caozuo"
                            label="操作">
                        </el-table-column>
                        </el-table>
                        </div>
              </el-card>
                </el-col>
            </el-row>
            </div>
        </el-card>
        </el-main>
      <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>
<script>
//yr header
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
export default {
    components:{
     Header,
     Footer
    },
     data(){
         return{
            tableData: [{
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
         
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
          
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
            tableDatasale: [{
            caozuo:'操作',
            name: '王小虎',
            address: '上海市普'
          }, {
            caozuo:'操作',
            name: '王小虎',
            address: '上海市普陀'
          }, {
            caozuo:'操作',
            name: '王小虎',
            address: '上海市普陀'
          }, {
            caozuo:'操作',
            name: '王小虎',
            address: '上海市普陀区金沙'
          }]
         }
     }
}
</script>
<style lang="less">
 .Usermess{
     width: 100%;
    display: flex; // 让这个盒子 变为一个可以伸缩的盒子
    flex-direction: column; 
    .el-main{
         flex: 1; 
    }
     .el-container{
         width: 100%;
     }
    
    
     //卡牌
     .el-card__header{
         text-align: left;
         font-weight: 700;
     }
     //warn
     .el-alert--success{
         margin-bottom: 20px;
     }
 }
</style>
