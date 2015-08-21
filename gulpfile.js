var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss  = require('gulp-minify-css'),
    uglify     = require('gulp-uglify'),
    browserSync= require('browser-sync').create(),
    imagemin   = require('gulp-imagemin'),
    pngquant   = require('imagemin-pngquant'),
    concat     = require('gulp-concat'),
    clean      = require('gulp-clean'),
    runSequence = require('run-sequence'),
    notify     = require('gulp-notify'),
    cache      = require('gulp-cache'),
    rename     = require("gulp-rename"),
    zip        = require('gulp-zip'),
    copy       = require("gulp-copy"),
    ftp        = require('gulp-ftp'),
    config     = require('./config.json');

 
gulp.task('sass', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'))
        .pipe(browserSync.reload({stream: true}));
});
gulp.task("html", function() {
    gulp.src('./src/*.html')
    .pipe(browserSync.reload({stream: true}));
})
gulp.task("js-watch", function() {
    gulp.src('./src/**')
    .pipe(browserSync.reload({stream: true}));
})
gulp.task('default', ['sass'], function() {
    browserSync.init({
        server: "./src/",
        port: 56789,
        https: false,
        index: "index.html",
        browser: ["google chrome"]
    });
    gulp.watch("./src/**", ["js-watch"]);
    gulp.watch("./src/scss/*.scss", ['sass']);
    gulp.watch("./src/*.html", ["html"]);
    gulp.watch("./src/*.html").on("change", function() {
        browserSync.reload;
    });
});


//css -autoprefixer前缀处理，并minifycss终极压缩
gulp.task('css', function () {
    return gulp.src('./src/css/*.css')
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/css/'))
//        .pipe(notify({ message: 'Styles task complete is end!' }));
});


//压缩图片
gulp.task('imagemin', function () {
    return gulp.src('./src/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/img/'))
//        .pipe(notify({ message: 'imagemin is end!' }));

});

//压缩javascript 文件，压缩后文件放入dist/js下
gulp.task('minifyjs',function(){
    gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min' }))
    .pipe(gulp.dest('./dist/js/'))
//    .pipe(notify({ message: 'JS task complete is end!' }));
});


//清除之前生成的文件
gulp.task('clean', function() {
    gulp.src(['./dist/css', './dist/js', './dist/img', './dist/*.*'], {read: false})
        .pipe(clean());
});

//将相关项目文件复制到dist 文件夹下
gulp.task('distfiles', function() {
   //根目录文件
   gulp.src('./src/*.{php,html}')
       .pipe(gulp.dest('./dist'));
   //CSS文件
//   gulp.src('./src/css/**')
//       .pipe(gulp.dest('./dist/css'));
    //压缩后的js文件
   gulp.src('./src/js/**/*')
       .pipe(gulp.dest('./dist/js'));
});




//打包主体dist 文件夹到根目录并按照时间重命名，旧压缩包自动转移到Afile 目录下
gulp.task('zip', function(){
      function checkTime(i) {
          if (i < 10) {
              i = "0" + i
          }
          return i
      }

      var d=new Date();
      var year=d.getFullYear();
      var month=checkTime(d.getMonth() + 1);
      var day=checkTime(d.getDate());
      var hour=checkTime(d.getHours());
      var minute=checkTime(d.getMinutes());

    gulp.src('./*.zip')
        .pipe(gulp.dest('./Afile'))
    gulp.src('./*.zip')
        .pipe(clean())
    gulp.src('./dist/**/*')
        .pipe(zip( config.project+'-'+year+month+day+hour+minute+'.zip'))
        .pipe(gulp.dest('./'))
        .pipe(notify({ message: '[dist]-zip is end!' }));
});

//上传到远程服务器任务
gulp.task('u', function () {
    return gulp.src(['./*.zip','./dist/**'])
        .pipe(ftp({
            host: config.ftp.host,
            user: config.ftp.user,
            port: config.ftp.port,
            pass: config.ftp.pass,
            remotePath: config.ftp.remotePath+config.projectEn+"/"
        }))
});


gulp.task('cc', function(callback) {
  runSequence('clean',['imagemin','css','minifyjs','distfiles'],'zip','u',callback);
});

//终极操作大法
gulp.task('end',['copy','upload'], function(){
    console.log('end done');
});