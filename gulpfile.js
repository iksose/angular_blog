var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var filesize = require('gulp-filesize');
var less = require('gulp-less');
var path = require('path');
var prefixer = require('gulp-autoprefixer');

gulp.task('default', function() {
  // place code for your default task here
});

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


// Compiles LESS > CSS
gulp.task('css', function(){
    return gulp.src('styles.less')
        .pipe(less())
        .pipe(gulp.dest('./source/css'));
});

gulp.task('less', function () {
  gulp
    .src('./client/concat/less/myapp.less') // This was the line that needed fixing
    .pipe(less({
      paths: ['client/less/less']
    }))
    .pipe(prefixer('last 2 versions', 'ie 9'))
    .pipe(gulp.dest('./public/css'));
});
