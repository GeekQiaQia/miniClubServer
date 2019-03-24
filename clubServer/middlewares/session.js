const session = require('koa-session');

module.exports = async app =>{
  app.keys = ['shhhhh']; // 数字签名的加密依赖 
   // 这个是因为你需要保证传递的cookie数据不被串改
  // 多发一个cookie(就是另一个cookie的数字签名)

  // // 配置session的stroe
  // let store = {  // 将session数据作为内存处理,当然,还有配置数据库存储的方式
  //   storage: {},
  //   set:function (key,sess) {
  //       this.storage[key] = sess;
  //   },
  //   get:function (key) {
  //     return this.storage[key];
  //   },
  //   destroy:function (key) {
  //     delete this.storage[key];
  //   }
  // };
  const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  };
  app.use(session(CONFIG,app));

}
