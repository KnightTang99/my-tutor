var express = require('express');
var router = express.Router();

var UserModel = require('../db/model').UserModel;
var md5 = require('blueimp-md5');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// function test () {
//   console.log(1111,UserModel,1111);
// }
// test();
//提供用户注册的接口
// router.post('/register',(req,res)=>{
//     /** 
//      * 回调函数里面有三步
//      * 1.获取请求参数
//      * 2.处理请求
//      * 3.返回响应
//      *  */

//     //1.获取请求参数
//     // console.log(111,req,111);console.log(111,res,111);
//     const {username,password} = req.body
//     //2.处理请求
//     if(username==='chenao'){
//         res.send({code:1,msg:'此用户已存在'});
//     }else{
//       res.send({code:1,data:{username,password}});
//     }
// });
// router.get('/register',(req,res)=>{
//   /** 
//    * 回调函数里面有三步
//    * 1.获取请求参数
//    * 2.处理请求
//    * 3.返回响应
//    *  */

//   //1.获取请求参数
//   // console.log(111,req,111);console.log(111,res,111);
//   const {username,password} = req.body
//   //2.处理请求
//   if(username==='chenao'){
//       res.send({code:1,msg:'此用户已存在'});
//   }else{
//     res.send({code:1,data:{username,password}});
//   }
// });
 
//用户注册接口
router.post('/register',(req,res)=>{
  const {username,password,type} = req.body;
  UserModel.findOne({username},(err,user)=>{
      if(user){
        res.send(JSON.stringify({code:1,msg:'此用户已存在'}));
      }else{
        new UserModel({username,type,password:md5(password)}).save((err,user)=>{
            res.cookie('userId',user._id,{maxAge:1000*60*60*24*7});
            // console.log('save()',user,err);
            const data = {username,type,userId:user._id}
            res.send({code:0,data});
        });
      }
  });

});

// 用户登录接口
router.post('/login',(req,res)=>{
  const {username,password} = req.body;
  UserModel.findOne({username},(err,user)=>{
    if(user){
      if(user.password===md5(password)){
        const data = {username,userId:user._id,type:user.type};
        res.cookie('userId',user._id,{maxAge:1000*60*60*24*7});
        res.send({code:0,data});
      }else{
        res.send({code:1,msg:'密码不正确，请从新输入密码'});
      }
    }else{
      res.send({code:1,msg:'此用户不存在，请注册！！'});
    }
  });
});

//用户完善信息接口
router.post('/updata',(req,res)=>{
  const userId = req.cookies.userId;
  if(!userId){
      res.send({code:1,msg:'请先登录'});
  }else{
    console.log(typeof req.body,req.body,22);
    const user = req.body;
    UserModel.findOneAndUpdate({_id:userId},user,(err,oldUser)=>{
      if(!oldUser){
        res.clearCookie('userId');
        res.send({code:1,msg:'请先登录'});
      }else{
        const userInfo = Object.assign(oldUser,user,{password:''});
        res.send({code:0,data:userInfo});
      }
    })
  }
})

module.exports = router;

