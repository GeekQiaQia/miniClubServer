/*
* @Author:max bai
  @Date:2019/3/22
  @Last Modified by :max bai
  @Last Modiified time:2019/3/22
**/

const userModel=require('../models/user-model');

module.exports={
    save:function(item) {
        console.log('saving');

        return new Promise((resolve,reject)=>{
          new userModel(item).save((err,result)=>{
            if(err){
              reject(err);
            }else{
              resolve(result);
            }
          });
        });

    },
     update:function(userId,params){
        return userModel.updateOne({userId},{$set:params}).exec();
     },
     getOneById:function(userId){
      return userModel.findOne({userId}).exec();
     },
     getOneByOpenId:function(openId){
      return new Promise((resolve,reject)=>{
        userModel.findOne({openId}).exec((err,result)=>{
          if(err){
            reject(err);
          }else{
            resolve(result);
          }
        });
      })
     },
     count:function(){
        return userModel.count().exec();
     }

}
