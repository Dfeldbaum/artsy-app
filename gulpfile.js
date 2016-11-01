'use strict'

var gulp = require('gulp');
// var watch = require('gulp-watch'); // remove bc don't need yet
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var gulpWatch = require('gulp-watch');
var db = require('./models/db');


gulp.task('compile-sass', function(){
    gulp.src('./public/stylesheets/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/stylesheets/'))
});


gulp.task('gulpWatch', function(){
    gulp.watch(['./public/stylesheets/styles.scss'], ['compile-sass']);
});





// nodemon it up!
gulp.task('Nodemon', restartServer);

function restartServer() {
	nodemon({
		script: './bin/www', // starts server 
		ext: 'js hbs scss sql'

	});
};



gulp.task('default', ['Nodemon', 'compile-sass', 'gulpWatch']);
