/*create by HC*/
var gulp = require('gulp');
// 管理gulp错误进程
var plumber = require('gulp-plumber');
// 创建browser-sync实例
var bs = require('browser-sync').create();
// 引入less，可创建sourcemap
var less = require('gulp-less-sourcemap');
// 添加浏览器前缀
var cssprefix = require('gulp-autoprefixer');
// 编译jade
var jade = require('jade');
// js语法检查
var jshint = require('gulp-jshint');
// 压缩js
var ugjs = required('gulp-uglifyjs');
// 压缩css
var ugcss = required('gulp-uglifycss');

