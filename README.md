# miniClubServer
 - 系统各部分文件说明

        > 本项目主要分为两部分，分别为service和小程序端

            1. service service模块，负责提供socketio服务和http服务，主要使用Nodejs koa2 
            开发，后台数据支持为MongoDB

            2.小程序 WEBUI模块，主要前端展示模块，主要是用wx开发，并辅助以Axios
            等技术开发

        > 每个部分及整个项目都为标准的NPM包模块，并参照CommonJS规范，每个模块都有自己的package.json，都拥有自己的依赖模块和脚本等

        > Service免构建,WEB在部署时需要进行NPM RUN BUILD构建
        各模块准备完成之后运行整个项目的NPM RUN BUILD即可,在dist目录为真正的部署目录，详细的构建部署步骤请参考下方文档说明
        
         本项目为NodeJS项目支持跨平台部署：

        1. 服务器准备，可为Windows/Linux/MacOSX操作系统

        2. NodeJS（8.10以上版本）安装，到NodeJS官方网站下载对应操作系统的NodeJS程序

        3. NodeJS安装完成之后保证NPM等指令可正常运行（Linux系统需要进行 ln -s 安装目录/bin/npm /usr/bin/npm 详细请参考linux相关指令）

        4. MongoDB安装（应为3.4以上版本，推荐4.0）：详细安装方法请参考官方文档

        5. MongoDB安装完成之后讲MongoDB配置为开机自动启动

        6. 将构建完成的目录拷贝至服务器内

        7. 打开构建目录（有package.json的一层）

        8. 安装NPM依赖（保证网络连接），指令如下

            ```
            $ npm install           //安装全部依赖或 npm i
            ```
        9. 安装完毕之后可在目录内看到node_modules目录

        10. 安装PM2

            ```
            $ npm install pm2 -g   //全局安装pm2
            $ ln -s NodeJS安装目录/bin/pm2 /usr/bin/pm2    //只有Linux需要运行此命令
            ```
        11. 修改setting.js内的数据库地址，保证地址正确

        12. 启动服务

             ```
             $ npm run prod           //运行prod脚本，执行启动服务
             ```

        13. 访问http://服务器地址：3005 以验证安装是否正确
