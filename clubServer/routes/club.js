const code=require('../config/code');

const clubApi=require('../api/api/club-api');
const joinedMemberApi=require('../api/api/joinedMember-api');

const Router=require('koa-router');
const router=new Router();

  console.log('into the club');

  router.prefix('/club');
  router.post('/create',async (ctx,next)=>{
    console.log('创建俱乐部请求开始');

       let {open_id,
            theme,
            date,
            time,
            day,
            location,
            people,
            cost,
            describe,
            avatarUrl,
            nickName,
            signature,
            city,
            gender,
            province,
            country}=ctx.request.body.clubInfo;

       let openId=open_id;

       let clubInfo={
         openId,theme, date, time, day,location, people, cost, describe
       };
       let club_Id,creatorInfo;
       console.log(clubInfo);
      let result,member;

      try{
        // 执行创建俱乐部
         result=await clubApi.save(clubInfo);
         club_Id=result._id;
        // 执行添加俱乐部成员创始人员为其中一员；
        creatorInfo={
          club_Id,
          members:[{openId,
            avatarUrl,
            nickName,
            signature,
            city,
            gender,
            province,
            country}]

        }
        member=await joinedMemberApi.save(creatorInfo);

      } catch(err){

        console.log('into the err:',err);
        if(err.errmsg.match('E11000 duplicate key')){
          return ctx.body={
            code:code.CODE_OP_FAILED,
            msg:'已经存在'
          };
        }
        return ctx.body={
          code:code.CODE_OP_PARAM,
          msg:err.errmsg
        };

      }
      console.log('接收到的promise 对象：',result);
      console.log('member 对象',member);

      ctx.body={
            code:code.CODE_OP_SUCCESS,
            msg:'success'
          };

    });
  router.post('/retrieve',async function(ctx,next){
    console.log('获取当前用户创建的俱乐部');

    let {openId}=ctx.request.body;
    // 获取当前用户创建的club;
    let clubInfo='';

    try{

      clubInfo= await clubApi.getList(openId);

    }catch(e){

      ctx.body={
        code:code.CODE_OP_PARAM,
        msg:err.errmsg
      };

    }
    console.log('clubInfo --',clubInfo);
    ctx.body={
      code:code.CODE_OP_SUCCESS,
      msg:'获取当前用户的俱乐部成功',
      clubInfo
    };

  });

  router.post('/retrieve/members',async (ctx,next)=>{
  console.log('进入查询俱乐部成员');
  console.log(ctx.request.body);
  let {club_Id}=ctx.request.body;
  console.log('club_Id',club_Id);
  let clubMember='';

  try{

    clubMember= await joinedMemberApi.findOneByClubId(club_Id);

  }catch(e){

    ctx.body={
      code:code.CODE_OP_PARAM,
      msg:err.errmsg
    };

  }
  console.log('clubMember --对象',clubMember);
  ctx.body={
    code:code.CODE_OP_SUCCESS,
    msg:'获取当前俱乐部成员成功',
    clubMember:clubMember.members
  };


});
  router.post('/update/members',async (ctx,next)=>{
  console.log('进入更新俱乐部成员');
  console.log(ctx.request.body);

  let {club_Id,memberObj}=ctx.request.body;

  let joinedMemberObj={
      club_Id,
      memberObj
    };

  let newClubMember='';

  try{

    newClubMember= await joinedMemberApi.insert(joinedMemberObj);

  }catch(e){

    ctx.body={
      code:code.CODE_OP_PARAM,
      msg:err.errmsg
    };

  }
  console.log('newClubMember --对象',newClubMember);
  ctx.body={
    code:code.CODE_OP_SUCCESS,
    msg:'俱乐部成员更新成功',
  };


});
  router.post('/delete/members',async (ctx,next)=>{
  console.log('进入delete俱乐部成员');
  console.log(ctx.request.body);
  let {club_Id,openId}=ctx.request.body;

  let deleteMemberObj={
     club_Id,openId
    };

  let deleteClubMember='';

  try{

    deleteClubMember= await joinedMemberApi.delete(deleteMemberObj);

  }catch(e){

    ctx.body={
      code:code.CODE_OP_PARAM,
      msg:err.errmsg
    };

  }
  console.log('deleteClubMember --对象',deleteClubMember);
  ctx.body={
    code:code.CODE_OP_SUCCESS,
    msg:'俱乐部成员更新成功',
  };


});


  module.exports=router;

