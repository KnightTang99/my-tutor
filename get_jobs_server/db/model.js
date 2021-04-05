/**
 * 暴露操作数据库集合的n个model
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/reactApp',{ useNewUrlParser: true });
const conn = mongoose.connection;
conn.on('connected',()=>{
    console.log('mongodb connect success!!!!');
});
const userSchema = mongoose.Schema({
    username:{type:String,require:true},
    password:{type:String,require:true},
    type:{type:String,required:true},
    headText:{type:String}, 
    university:{type:String},
    strengths:{type:String},
    selfIntroduction:{type:String},
    freetime:{type:Number},
    studentCondition:{type:String}
});
const UserModel = mongoose.model('user',userSchema);
exports.UserModel = UserModel;