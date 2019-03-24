/**
 * Created by baixiyang on 2018/11/7.
 */
const bunyan =require('bunyan');
const setting =require('../config/config');

const logger=bunyan.createLogger({
    name:setting.site+'.IO'
})

const loggerWeb=bunyan.createLogger({
    name:setting.site+'.web'
})

// 按需导出

module.exports={logger,loggerWeb}
