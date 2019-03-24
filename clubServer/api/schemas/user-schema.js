/*
* @Author:max bai
  @Date:2019/3/22
  @Last Modified by :max bai
  @Last Modiified time:2019/3/22
**/
// v1 是基于时间戳生成的，v4是基于随机数生成的；

/*
* 存储授权用户的基本信息； 由于没有获取到unionId 的情况下，我们自己生成一个uuid;
* */
const uuid =require('node-uuid');

const Schema =require('mongoose').Schema;

const userSchema=new Schema({
  userId:{
    type:String,
    default:uuid.v1,
    unique:true
  },
  nickName:{
    type: String,
    required:true,

  },
  signature:{
    type:String,
    default:'我就是签名，你能看到我吗'
  },
  gender:{
    type:Number,
    required:true
  },
  language:{
    type:String,
    required:true,
  },
  city:{
    type:String,
    required:true
  },
  province:{
    type:String,
    required:true
  },
  country:{
    type:String,
    required:true
  },
  avatarUrl:{
    type:String,
    required:true
  },
  openId:{
    type:String,
    unique:true
  }



});

module.exports=userSchema;


