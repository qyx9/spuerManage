var express = require('express');
var router = express.Router();


//引入数据库连接
const connection=require('./content');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//接收前端用户名添加的数据
router.post('/useradd',(req,res)=>{
  //设置响应头
  res.setHeader("Access-Control-Allow-Origin", "*");
  //接收前端发来的数据
  let {username,password,usergroup}=req.body;
  console.log(username,password,usergroup);
  //数据库增删改查
  const sqlstr=`insert into usermess(username,password,usergroup) values (?,?,?)`;
  const sqlparms=[username,password,usergroup];
  //执行sql语句
  connection.query(sqlstr,sqlparms,(err,data)=>{
    if(err){
      throw err;
    }
    else{
      if(data.affectedRows>0){
        res.send({"errCode":1,"msg":"用户添加成功！"});
      }else{
        res.send({"errCode":0,"msg":"用户添加失败！"});
      }
        //  console.log(data);
    }
  })
  // res.send("路由通了");
})
//接收前端用户列表请求
router.get('/userlist',(req,res)=>{
  //设置响应头
  res.setHeader("Access-Control-Allow-Origin", "*");
  //查询所有的用户名sql  asc 是升序 desc是降序
  const sqlstr=`select * from usermess order by cdate desc`;
  //执行sql语句
 connection.query(sqlstr,(err,data)=>{
   if(err){
     throw err;
   }else{
    //  console.log(data);
    res.send(data);
   }
 })

})
//接收前端删除用户请求
router.get('/deluser',(req,res)=>{
  //设置响应头
  res.setHeader("Access-Control-Allow-Origin", "*");
  //接收前端发来的id
  let {id}=req.query;
  //查询id删除
  const sqlstr=`delete from usermess where id=${id}`;
  //执行sql语句
  connection.query(sqlstr,(err,data)=>{
    if(err){
      throw err;
    }else{
      if(data.affectedRows>0){
        res.send({"errCode":1,"msg":"删除成功!"})
      }else{
        res.send({"errCode":0,"msg":"删除失败！"})
      }

    }
  })
})

//接收前端发来的编辑数据
router.get('/edituser',(req,res)=>{
  //设置响应头
  res.setHeader("Access-Control-Allow-Origin", "*");
  //接收前端发来的id
  let {id}=req.query;
  //写查询语句
  const sqlstr=`select * from usermess where id=${id}`;
  //执行sql语句
  connection.query(sqlstr,(err,data)=>{
    if(err){
      throw err;
    }else{
      // console.log(data);
      res.send(data);
    }

  })
})


//接收前端发来的修改请求
// router.get('/editpass',(req,res)=>{
  //设置响应头
  // res.setHeader("Access-Control-Allow-Origin", "*");
  //接收前端发来的id
  // let {id}=req.query;
  // console.log(id);
  // const sqlstr=`select * from usermess where id=${id}`;
  // //执行sql语句
  // connection.query(sqlstr,(err,data)=>{
  //   if(err){
  //     throw err;
  //   }else{
  //     console.log(data);
  //     // res.send(data);
  //   }

  // })
// })

//接收前端发来的商品添加信息
router.post('/shoplist',(req,res)=>{
  //设置响应头
  res.setHeader("Access-Control-Allow-Origin", "*");
  //接收前端的数据
  let {region,name,bar,bid,sale,market,putin,shopkg,unit,menber,comp,descs}=req.body;
  // console.log(region,name,bar,bid,sale,market,putin,shopkg,unit,menber,comp,descs);
  //写sql语句
  const sqlstr=`insert into shopmess(region,name,bar,bid,sale,market,putin,shopkg,unit,menber,comp,descs) values(?,?,?,?,?,?,?,?,?,?,?,?)`;
  const sqlparms=[region,name,bar,bid,sale,market,putin,shopkg,unit,menber,comp,descs];
  //执行sql语句
  connection.query(sqlstr,sqlparms,(err,data)=>{
    if(err){
      throw err;
    }
    else{
      if(data.affectedRows>0){
        res.send({"errCode":1,"msg":"数据添加成功！"});
      }else{
        res.send({"errCode":0,"msg":"数据添加失败！"});
      }
      // console.log(data);
    }
  })
  // res.send("11111");
})
//接收前端发来的shoplists请求
router.get('/shoplists',(req,res)=>{
  //设置响应头
  res.setHeader("Access-Control-Allow-Origin", "*");
  //写sql语句
  const sqlstr=`select * from shopmess order by cdate desc`;
  //执行sql语句
  connection.query(sqlstr,(err,data)=>{
    if(err){
      throw err;
    }
    else{
      // console.log(data);
      res.send(data);
    }
  })
  // res.send('1111122')
})

//删除商品
router.get('/delshop',(req,res)=>{
  //设置响应头
  res.setHeader("Access-Control-Allow-Origin", "*");
  //接收前端发来的id
  let {id}=req.query;
  //查询id删除
  const sqlstr=`delete from shopmess where id=${id}`;
  //执行sql语句
  connection.query(sqlstr,(err,data)=>{
    if(err){
      throw err;
    }else{
      if(data.affectedRows>0){
        res.send({"errCode":1,"msg":"删除成功!"})
      }else{
        res.send({"errCode":0,"msg":"删除失败！"})
      }

    }
  })
})
module.exports = router;
