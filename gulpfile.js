/*
npm install --save-dev gulp gulp-rename gulp-remove-empty-lines gulp-cssmin gulp-concat
*/

var gulp             = require("gulp");
var removeEmptyLines = require('gulp-remove-empty-lines');
var rename           = require("gulp-rename");
var cssmin           = require("gulp-cssmin");
var concat           = require("gulp-concat");
var runSequence      = require('run-sequence');
var del              = require('del');


gulp.task('build:flashDrive', function() {
  runSequence('helper',
              'grid',
              'flashDrive'
              );
});

gulp.task('build:flashDriveMin', function() {
  runSequence('helperMin0',
              'helperMin1',
              'helperMin2',
              'gridMin0',
              'gridMin1',
              'gridMin2',
              'flashDriveMin'
              );
});

gulp.task("default", [
    "build:flashDrive",
    "build:flashDriveMin",
]);




gulp.task('helper', function() {
  return gulp.src([
    './src/lucy.helper/lucy.helper.0-.css',
    './src/lucy.helper/lucy.helper.-639.css',
    './src/lucy.helper/lucy.helper.640-.css',
    './src/lucy.helper/lucy.helper.640-1023.css',
    './src/lucy.helper/lucy.helper.-1023.css',
    './src/lucy.helper/lucy.helper.1024-.css'
    ])
    .pipe(concat('lucy.helper.css'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('grid', function() {
  return gulp.src([
    './src/lucy.grid/lucy.grid.0-.css',
    './src/lucy.grid/lucy.grid.-639.css',
    './src/lucy.grid/lucy.grid.640-.css',
    './src/lucy.grid/lucy.grid.640-1023.css',
    './src/lucy.grid/lucy.grid.-1023.css',
    './src/lucy.grid/lucy.grid.1024-.css'
    ])
    .pipe(concat('lucy.grid.css'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('flashDrive', function() {
  return gulp.src([
    './dist/lucy.helper.css',
    './dist/lucy.grid.css'
    ])
    .pipe(concat('lucy-flash-drive.css'))
    .pipe(gulp.dest('./dist/'));
});




gulp.task('helperMin0', function() {
  return gulp.src([
    './src/lucy.helper/lucy.helper.0-.css',
    ])
    .pipe(concat('lucy.helper.min.css'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('helperMin1', function() {
  return gulp.src([
    './src/lucy.helper/lucy.helper.-639.css',
    './src/lucy.helper/lucy.helper.640-.css',
    './src/lucy.helper/lucy.helper.640-1023.css',
    './src/lucy.helper/lucy.helper.-1023.css',
    './src/lucy.helper/lucy.helper.1024-.css'
    ])
    .pipe(cssmin())
    .pipe(concat('lucy-flash-drive.min.css'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('helperMin2', function() {
  return gulp.src([
    './dist/lucy.helper.min.css',
    './dist/lucy-flash-drive.min.css'
    ])
    .pipe(concat('lucy.helper.min.css'))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('gridMin0', function() {
  return gulp.src([
    //'./src/docs/doc.inline.css',
    './src/lucy.grid/lucy.grid.0-.css',
    ])
    .pipe(concat('lucy.grid.min.css'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('gridMin1', function() {
  return gulp.src([
    './src/lucy.grid/lucy.grid.-639.css',
    './src/lucy.grid/lucy.grid.640-.css',
    './src/lucy.grid/lucy.grid.640-1023.css',
    './src/lucy.grid/lucy.grid.-1023.css',
    './src/lucy.grid/lucy.grid.1024-.css'
    ])
    .pipe(cssmin())
    .pipe(concat('lucy-flash-drive.min.css'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('gridMin2', function() {
  return gulp.src([
    './dist/lucy.grid.min.css',
    './dist/lucy-flash-drive.min.css'
    ])
    .pipe(concat('lucy.grid.min.css'))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('flashDriveMin', function() {
  return gulp.src([
    './dist/lucy.helper.min.css',
    './dist/lucy.grid.min.css'
    ])
    .pipe(concat('lucy-flash-drive.min.css'))
    .pipe(gulp.dest('./dist/'));
});
