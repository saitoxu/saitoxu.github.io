var gulp = require('gulp'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');

gulp.task('default', function() {
  gulp.watch(['less/**/*.less'], ['less']);
  gulp.watch(['css/*.css'], ['cssmin']);
})

gulp.task('less', function() {
  gulp.src('less/**/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest('./css'));
});

gulp.task('cssmin', function() {
  gulp.src('css/*.css')
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css'));
});
