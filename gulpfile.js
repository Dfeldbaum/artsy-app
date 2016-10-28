'use strict'

var gulp = require('gulp');
// var watch = require('gulp-watch'); // remove bc don't need yet
var nodemon = require('gulp-nodemon');
var db = require('./models/db');




// nodemon it up!
gulp.task('Nodemon', restartServer);

function restartServer() {
	nodemon({
		script: './bin/www', // starts server 
		ext: 'js hbs scss sql'

	});
};



gulp.task('default', ['Nodemon']);
