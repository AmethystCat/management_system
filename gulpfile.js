/*create by HC*/
var gulp = require('gulp');
// 管理gulp错误进程
var plumber = require('gulp-plumber');
// 创建browser-sync实例
var browserSync = require('browser-sync').create();
// 引入less，可创建sourcemap
var less = require('gulp-less-sourcemap');
// 添加浏览器前缀
var cssprefix = require('gulp-autoprefixer');
// 编译jade
var jade = require('jade');
// js语法检查
var jshint = require('gulp-jshint');
var cached = require('gulp-cached');//http://www.sunzhongwei.com/gulp-validate-javascript-syntax.html
// 压缩js
var ugjs = require('gulp-uglifyjs');
// 压缩css
var ugcss = require('gulp-uglifycss');

// temp static file path
var LESS_DIR = './src/less',
    LESS = './src/less/*.less',
    CSS_DIR = './temp/css/',
    CSS = './temp/css/*.css',
    JS_DIR = './src/js',
    JS = './src/js/*.js',
    TEMP_JS_DIR = './temp/js',
    TEMP_JS = './temp/js/*.js';

// static server
gulp.task('bs',function(){
	browserSync.init({
		server: {
			baseDir:'./',
			index:'./temp/index.html'
		}
	});
});
// compile less to temp
gulp.task('less',function(){
    return gulp.src(LESS)
        .pipe(plumber())
        .pipe(less({
            sourceMap: {
                sourceMapRootpath:LESS_DIR
            }
        }))
        .pipe(gulp.dest(CSS_DIR))
});

gulp.task('destJs',function(){
    return gulp.src(JS)
        .pipe(plumber())
        .pipe(gulp.dest(JS_DIR))
});

// js hint
gulp.task('hint', function () {
    return gulp.src(JS)
        .pipe(cached('jshint'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch',function(){
    gulp.watch(LESS,['less']);
    gulp.watch(CSS)
        .on('change',function(file){
            browserSync.reload(file.path);
        });
//    gulp.watch(JS,['destJs']);
    gulp.watch(JS,['hint'])
        .on('change',function(file){
            browserSync.reload(file.path);
        });
});

gulp.task('default',['hint','less','bs','watch']);