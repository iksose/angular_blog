var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var filesize = require('gulp-filesize');
var less = require('gulp-less');
var path = require('path');
var prefixer = require('gulp-autoprefixer');
var changed = require('gulp-changed');
var watch = require('gulp-watch');


gulp.task('vendor', function() {
  gulp.src('client/lib/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('client/concat'))
    .pipe(filesize())
    .pipe(uglify())
    .pipe(rename('vendor.min.js'))
    .pipe(gulp.dest('client/concat'))
    .pipe(filesize())
    .on('error', gutil.log)
});

gulp.task('scripts', function() {
  gulp.src('client/js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('client/concat'))
    .pipe(filesize())
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('client/concat'))
    .pipe(filesize())
    .on('error', gutil.log)
});


// Compiles LESS > CSS
gulp.task('css', function(){
    return gulp.src('client/less/myapp.less')
        .pipe(less())
        .pipe(gulp.dest('client/concat/css'))
        .on('error', gutil.log);
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('client/js/*.js', ['scripts']);
    gulp.watch('client/lib/*.js', ['vendor'])
    gulp.watch('client/less*.less', ['css']);
});

// Default Task
gulp.task('default', ['watch']);
