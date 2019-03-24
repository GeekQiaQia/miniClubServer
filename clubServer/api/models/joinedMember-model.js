/*
* @Author:max bai
  @Date:2019/3/23
  @Last Modified by :max bai
  @Last Modiified time:2019/3/23
**/

const joinedMemberSchema=require('../schemas/joinedMember-schema');
const mongoose=require('mongoose');

module.exports=mongoose.model('JoinedMember',joinedMemberSchema);
