/*
* @Author:max bai
  @Date:2019/3/22
  @Last Modified by :max bai
  @Last Modiified time:2019/3/22
**/

const uuid=require('uuid');
const Schema =require('mongoose').Schema;

const clubSchema=new Schema({
  userId:{
    type:String,
    default:uuid.v1,
    unique:true
  },
  openId:{
    type:String,
    required:true,
  },
  theme:{
    type:String,
    required:true,
  },
  date:{
    type:String,
    required:true
  },
  time:{
    type:String,
    required:true
  },
  day:{
    type:String,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  people:{
    type:String,
    required:true
  },
  cost:{
    type:String
  },
  describe:{
    type:String,
    required:true
  }

});

module.exports=clubSchema;
