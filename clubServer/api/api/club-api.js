/*
* @Author:max bai
  @Date:2019/3/22
  @Last Modified by :max bai
  @Last Modiified time:2019/3/22
**/

const clubModel=require('../models/club-model');

module.exports={
   save:function (item) {
     console.log('saving');
     return new Promise(function(resolve,reject){

        new clubModel(item).save((err,result)=>{

         if(err){
           // console.log(err);
            reject(err);

         }else{
           resolve(result);
         }
       });

     });

   },
  getOneByOpenId:function(openId){
    return new Promise((resolve,reject)=>{

      clubModel.findOne({openId}).exec((err,result)=>{
        if(err){
          reject(err);
        }else{
          resolve(result);
        }
      });
    })
  },
  count:function(){
    return clubModel.count().exec();
  },
  getList:function(page,limit,openId){
     if(page&&limit){
       let skip=(page-1)*limit;
       if(openId){
         return Promise.all([
           clubModel
             .find()
             .regex('openId',openId)
             .skip(skip)
             .limit(limit)
             .exec(),
           clubModel
             .count()
             .exec()
         ])

       }else{
        return Promise.all([
          clubModel
            .find()
            .skip(skip)
            .limit(limit)
            .exec(),
          clubModel
            .count()
            .exec()
        ])
       }
     }else{
       return Promise.all([
         clubModel
           .find()
           .exec(),
         clubModel
           .count()
           .exec()
       ]);

     }
  }

}
