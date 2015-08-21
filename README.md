npm安装组件
$ npm install --save-dev imagemin-pngquant
升级npm
$ npm -g install npm@3.1.0


前言

所有功能前提需要安装nodejs（本人安装版本v0.12.5-x64）和ruby（本人安装版本2.2.2-x64）。

Gulp 是一款基于任务的设计模式的自动化工具，通过插件的配合解决全套前端解决方案，如静态页面压缩、图片压缩、JS合并、SASS同步编译并压缩CSS、服务器控制客户端同步刷新。前端技术这种更新迭代快到连裸奔都追不上的情况下，在强调高产的同时，效率必然是成为争夺的制高点。

Gulp安装

使用国内 cnpm (gzip 压缩支持)淘宝镜像代替默认的 npm(以下都使用cnpm替代npm):
$ npm install -g cnpm --registry=https://registry.npm.taobao.org



在nodejs环境中全局安装gulpjs

$ npm install -g gulp

切换到你的前端 工作目录 下

$ cd <YOUR_PROJECT>
$ npm init

初始化，并生成 package.json 文件,

{
  "name": "gulp-project",
  "version": "0.1.0",
  "description": "test",
  "devDependencies": {
  }
}
让gulp的安装自动写入 package.json 中的devDependenies

$ npm install --save PACKAGE_NAME

在项目文件的根目录下新建 gulpfile.js 文件:

var gulp = require('gulp');

gulp.task('taskName', function() {
    /*taskName 所要用gulp做的事情*/
});
运行gulp

在终端，进入到gulpfile.js文件在的项目根目录，运行以下命令。

$ gulp


npm安装组件
$ cnpm install --save-dev imagemin-pngquant


清除npm的代理命令如下：

$ npm config delete http-proxy
$ npm config delete https-proxy


























    "path": {
        "src/scss/JaneCC.scss": {
            "sass.enabled": true,
            "sass.options": {
                "outputDir": "../css/",
                "includePaths": [],
                "sourceComments": false,
                "sourceMap": false,
                "outputStyle": "compact"
            }
        }
    }