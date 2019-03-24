/*
* @Author:max bai
  @Date:2019/3/23
  @Last Modified by :max bai
  @Last Modiified time:2019/3/23
**/

const joinedMemberModel=require('../models/joinedMember-model');

module.exports={
  save:function (item) {
    return new Promise((resolve,reject)=>{
       new joinedMemberModel(item).save((err,result)=>{
         if(err){
           reject(err);
         }else{
           resolve(result);
         }
       });

    });

  },
  // 插入：
  insert:({club_Id,memberObj})=>{
    return new Promise((resolve,reject)=>{
      joinedMemberModel.update({club_Id},{$push:{members:memberObj}}).exec((err,result)=>{
        if(err){
          reject(err);
        }else{
          resolve(result);
        }
      });
    });
  },
  // 删除
  delete:({club_Id,openId})=>{
    return new Promise((resolve,reject)=>{
      joinedMemberModel.update({club_Id},{$pull:{members:{openId}}}).exec((err,result)=>{
        if(err){
          reject(err);
        }else{
          resolve(result);
        }
      });
    });
  },
  //更新；
  update:({club_Id,openId,params})=>{
      return new Promise((resolve,reject)=>{
        joinedMemberModel.update({club_Id,"members.openId":openId},{$set:params}).exec((err,result)=>{
          if(err){
            reject(err);
          }else{
            resolve(result);
          }
        });
      });
  },
  findOneByClubId:(club_Id)=>{
    return new Promise((resolve,reject)=>{
      joinedMemberModel.findOne({club_Id}).exec((err,result)=>{
        if(err){
          reject(err);
        }else{
          resolve(result);
        }
      });
    })

  }

}

