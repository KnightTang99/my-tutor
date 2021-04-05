/**
 * 用于测试mongoose是否能操作mongdb数据库
 */
//引入md5对密码进行加密
const md5 = require('blueimp-md5');
//1.引入mongoose
const mongoose = require('mongoose');
//2.连接指定数据库
mongoose.connect('mongodb://localhost:27017/reactTest',{ useNewUrlParser: true });
//3.获取连接对象
const connection = mongoose.connection;
//4.监听是否连接成功
connection.on('connected',()=>{
    console.log('数据库连接成功');
});
//5.定义Schema，用于描述文档的结构
const userSchema = mongoose.Schema(
    {
        username:{type:String,require:true},
        password:{type:String,required:true},
        type:{type:String,required:true}
    }
);
//6.得到可操作users集合的Model,一个model的构造函数
const UserModel = mongoose.model('user',userSchema);

//用于测试为数据库添加数据
function testSave () {
    const userModel = new UserModel({username:'hellen',password:md5('123'),type:'laoban'});
    userModel.save((err,userdoc)=>{
        console.log('save()',err,userdoc);
    });
}
testSave();
//用于测试在数据库中查找数据
function testFind () {
    UserModel.find((err,users)=>{
        console.log('find()',err,users);
        
    })
    UserModel.findOne({username:'jack'},(err,users)=>{
        console.log('findone()',err,users);
        
    })
}
testFind();
//用于测试数据库的修改
function tsetUpdata () {
    UserModel.findByIdAndUpdate({_id:'5c7b412336b5fc2834773d44'},{type:'dashen'},(err,oldDoc)=>{
        console.log('updata()',err,doc);
    });
}
// tsetUpdata();
//用于测试数据库的删除数据
function testRemove () {
    UserModel.remove({username:'tom'},(err,doc)=>{
        console.log('remove()',err,doc)
    });
}
// testRemove();