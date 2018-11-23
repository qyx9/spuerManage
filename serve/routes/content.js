//数据库公用模块
//引入数据库模块
const mysql=require('mysql');
//使用mysql创建连接
const connection = mysql.createConnection({
    host   : 'localhost',
    user   : 'root',
    password : 'root',
    database : 'spuman'    
});
//执行连接
connection.connect(()=>{
    console.log("数据库连接成功");
});

//暴露出去
module.exports=connection;