/*
* @Author:max bai
  @Date:2019/3/22
  @Last Modified by :max bai
  @Last Modiified time:2019/3/22
**/

const clubSchema=require('../schemas/club-schema');
const mongoose=require('mongoose');

module.exports=mongoose.model('Club',clubSchema);
