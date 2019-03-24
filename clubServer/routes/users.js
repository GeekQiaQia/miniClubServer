const req=require('request-promise');
const {appId,appSecret}=require('../config/config');
const code=require('../config/code');
const WXBizDataCrypt=require('./WXBizDataCrypt');
const sha1=require('sha1');
const userApi=require('../api/api/user-api')

let session_key='';
let open_id='';

const Router=require('koa-router');
const router=new Router();

// user路由表

  console.log('into the user');
  router.prefix('/users');

  router.post('/login', async function (ctx, next) {
    console.log('请求开始');
    // 1、 获取小程序发送到临时登录凭证code;
    console.log(ctx.request.body);
    let wx_code=ctx.request.body.code;

    //2、服务端登录凭证校验接口:GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
    // appId+appSecret+code;
    let options={
      uri:'https://api.weixin.qq.com/sns/jscode2session',
      qs: {
        // access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
        appid:appId,
        secret:appSecret,
        js_code:wx_code,
        grant_type:'authorization_code'
      },
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
    }

    // 3、 微信接口返回session_key openid 等；
      try{
        let body =await req(options);
        session_key=body.session_key;
        open_id=body.openid;

        // 4将客户信息数据保存在session ；
        ctx.session.user={
          username:ctx.request.body.username,
          session_key,
          open_id
        }
      }catch(e){
         return  ctx.body={
           code:code.CODE_OP_FAILED,
           msg:'登录失败',
           open_id

         }
      }
    // 5、自定义登录状态 与openid session_key 等关联;响应自定义状态；
    ctx.body={
      code:code.CODE_OP_SUCCESS,
      msg:'登录成功',
      open_id

    }
  })
  router.post('/getUnionId',async function(ctx,next){
    console.log('请求unionId 开始');
    //1、开发者服务器也需要获取这些开放数据：
    // 开发者后台拿到开放数据后,可以对数据进行校验签名和解密，来保证数据不被篡改。
    //signature = sha1( rawData + session_key )
    let {signature,rawData,encryptedData,iv } = ctx.request.body.res;
    let sha1Data=rawData + session_key;
    let signatureS=sha1(sha1Data);
    console.log('signature:'+signature);
    console.log('signatureS:'+signatureS);



    // 在解密数据中获取UnionId;
    let pc = new WXBizDataCrypt(appId,session_key);
    let data = pc.decryptData(encryptedData,iv);

    let userInfo= {openId,nickName,gender,language,city,province,country,avatarUrl} =data;
    // 通过openId 来判断是同一个微信用户；
    if(signature===signatureS){
      // 存储一个对象
      try{
        let exist =await userApi.getOneByOpenId(open_id);
        console.log("userInfo:",exist);
        await userApi.save(userInfo);

      }catch (err) {

        if(err.message.match('E1100 duplicate key')){
          ctx.body={
            code:code.CODE_OP_SUCCESS,
            msg:'用户已经存在',
            data,

          };
        }

      }
      ctx.body={
        code:code.CODE_OP_SUCCESS,
        msg:'签名校验成功，加密数据解密成功',
        data,
      };

    }else{
      ctx.body={
        code:code.CODE_OP_FAILED,
        msg:'签名校验失败'
      };
    }


  })
  router.put('/logout',async ctx=>{
    ctx.session=null;
    ctx.body={
      code:code.CODE_OP_SUCCESS,
      msg:'退出成功'
    }
  });
  router.post('/getInfo',async function(ctx,next){

    console.log('into the /getInfo:',ctx.request.body);
    let {openId}=ctx.request.body,
        result;
    console.log("hahhaha",openId);
    try{

      result=await userApi.getOneByOpenId(openId);

    }catch (e) {

      return  ctx.body={
        code:code.CODE_OP_FAILED,
        msg:e.errMsg
      }
    }
    ctx.body={

      code:code.CODE_OP_SUCCESS,
      msg:'get userInfo Success',
      result:result
    }

  });


  module.exports=router;
