var express = require('express');
var router = express.Router();


//设置多个响应头
router.all('*',(req,res,next)=>{
   //设置响应头
   res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
   // 设置允许设置cookie
  res.setHeader('Access-Control-Allow-Credentials', true);
   next();
})

//引入数据库连接
const connection=require('./content');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//接收前端用户名添加的数据
router.post('/useradd',(req,res)=>{
 
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


// 接收前端发来的修改请求
router.get('/editform',(req,res)=>{
 
  // 接收前端发来的id
  let {id}=req.query;
  // console.log(id);
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

//接收前端回显修改的请求
router.post('/userEdit',(req,res)=>{
 
  //接收数据
  let {username,password,usergroup,id}=req.body;
  // console.log(username,password,usergroup,id);
  //写sql语句
  const sqlstr=`update usermess set username='${username}', password='${password}', usergroup='${usergroup}' where id=${id}`;
  //执行sql语句
  connection.query(sqlstr,(err,data)=>{
    if(err){
      throw err;
    }else{
      if(data.affectedRows>0){
        res.send({"errCode":1,"msg":"数据修改成功！"});
      }
      else{
        res.send({"errCode":0,"msg":"数据修改失败！"});
      }
      // console.log('1');
    }
  })
  // res.send('1');
})

//接收前端发来的批量删除的请求
router.post('/delselect',(req,res)=>{
 
  //接收前端发来的数据
  let {idArr}=req.body;
  //把idArr 转为数组
  idArr=JSON.parse(idArr);
  //写sql语句
  const sqlstr=`delete from usermess where id in (${idArr})`;
  //执行sql语句
  connection.query(sqlstr,(err,data)=>{
    if(err){
      throw err ;
    }else{
      if(data.affectedRows>0){
        res.send({"errCode":1,"msg":"批量删除成功!"})
      }else{
        
        res.send({"errCode":1,"msg":"批量删除失败!"})
      }
      // console.log('1');
    }
  })
  // console.log(sqlstr);
  // res.send('1')
})

//登录验证
router.post('/userLogin',(req,res)=>{
 
  //  res.send('1')
  //接收前端发来的数据
  let {username,password}=req.body;
  //写sql语句
  const sqlstr = `select * from usermess where username='${username}' and password='${password}'`;
  // console.log(sqlstr);
  //执行sql语句
  connection.query(sqlstr,(err,data)=>{
    if(err){
      throw err;
    }
    else{
      if(data.length){
        //设置cookie 
        res.cookie('userid',data[0].id);
        res.cookie('username',data[0].username);
        res.send({"errCode":1,"msg":"登录成功！"})
      }else{
        res.send({"errCode":0,"msg":"请检查用户名或密码"})

      }
      // console.log(data);
    }
  })
})

//检测登录状态
router.get('/checklogin',(req,res)=>{
  //获取浏览器的cookie
  let userid=req.cookies.userid;
  let username = req.cookies.username;
console.log(userid,username);
  //如果都存在
  if(userid && username){
    res.send({"islogin" : true});
  }else{
    res.send({"islogin":false});
  }
  // res.send('888');
})

//接收前端发来的商品添加信息
router.post('/shoplist',(req,res)=>{
 
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

//回显商品
router.get('/shopedit',(req,res)=>{
  // res.send('2');
  let {id}=req.query;

  //写sql
  const sqlstr = `select * from shopmess where id=${id}`;
  //执行sql
  connection.query(sqlstr,(err,data)=>{
    if(err){
      throw err;
    }else{
      res.send(data);
    }
  })
  // let {id}=req.query;
  // console.log(id);
})

//修改商品
router.post('/editshop',(req,res)=>{
  let {region,name,bar,bid,sale,market,putin,shopkg,unit,menber,comp,descs,id}=req.body;
  // console.log(region,name,bar,bid,sale,market,putin,shopkg,unit,menber,comp,descs,id)
   //写sql语句
   const sqlstr=`update shopmess set region='${region}', name='${name}', bar='${bar}', bid='${bid}',sale='${sale}',market='${market}',putin='${putin}',shopkg='${shopkg}',unit='${unit}',menber='${menber}',comp='${comp}',descs='${descs}' where id=${id}`;
   //执行sql
   connection.query(sqlstr,(err,data)=>{
     if(err){
       throw err;
     }
     else{
       if(data.affectedRows>0){
         res.send({"errCode":1,"msg":"修改商品成功！"});
        }else{
          res.send({"errCode":0,"msg":"修改商品失败！"});

       }
     }
   })
})
module.exports = router;
