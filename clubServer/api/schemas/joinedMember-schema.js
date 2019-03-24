/*
* @Author:max bai
  @Date:2019/3/23
  @Last Modified by :max bai
  @Last Modiified time:2019/3/23
**/

const uuid=require('uuid');

const Schema=require('mongoose').Schema;

module.exports=new Schema({
  club_Id:{
    type:String,
    required:true,
    unique:true
  },
  members:[{openId:String,
    avatarUrl:String,
    nickName:String,
    signature:String,
    city:String,
    gender:String,
    province:String,
    country:String}]
});
