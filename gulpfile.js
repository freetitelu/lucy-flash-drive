/*
npm install --save-dev gulp gulp-rename gulp-remove-empty-lines gulp-cssmin gulp-concat
run-sequence del gulp-postcss postcss-custom-properties autoprefixer gulp-vars
*/

var gulp             = require("gulp");
var removeEmptyLines = require('gulp-remove-empty-lines');
var rename           = require("gulp-rename");
var cssmin           = require("gulp-cssmin");
var concat           = require("gulp-concat");
var runSequence      = require('run-sequence');
var del              = require('del');
var postcss          = require('gulp-postcss');
var customProperties = require("postcss-custom-properties")
var autoprefixer     = require('autoprefixer');
var vars             = require('gulp-vars');

gulp.task("default", [
    'build:flashDrive',//1
    'build:flashDriveNonVar',//2
]);

//1
gulp.task('build:flashDrive', function() {
  runSequence('helper',
              'grid',
              'flashDrive'
              );
});

gulp.task('helper', function() {
  return gulp.src([
    './src/lucy.helper.css',
    ])
    .pipe(gulp.dest('./dist/'));
});

gulp.task('grid', function() {
  return gulp.src([
    './src/lucy.grid.css',
    ])
    .pipe(gulp.dest('./dist/'));
});

gulp.task('flashDrive', function() {
  return gulp.src([
    './dist/lucy.helper.css',
    './dist/lucy.grid.css'
    ])
    .pipe(concat('lucy.flashdrive.css'))
    .pipe(gulp.dest('./dist/'));
});


//2
gulp.task('build:flashDriveNonVar', function() {
  runSequence(//'helperNonVar',
              'gridNonVar',
              'flashDriveNonVar'
              );
});
/*
gulp.task('helperNonVar', function() {
  return gulp.src([
    './src/lucy.helper.css',
    ])
    .pipe(vars())
    .pipe(postcss([ customProperties()  ]))
    .pipe(postcss([ autoprefixer({ browsers: ['last 3 versions'] }) ]))
    .pipe(concat('lucy.helper.nonvar.css'))
    .pipe(gulp.dest('./dist/'));
});
*/
gulp.task('gridNonVar', function() {
  return gulp.src([
    './src/lucy.grid.nonvar.css',
    ])
    .pipe(concat('lucy.grid.css'))
    .pipe(vars())
    .pipe(postcss([ customProperties()  ]))
    .pipe(postcss([ autoprefixer({ browsers: ['last 3 versions'] }) ]))
    .pipe(concat('lucy.grid.nonvar.css'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('flashDriveNonVar', function() {
  return gulp.src([
    './dist/lucy.helper.css',
    './dist/lucy.grid.nonvar.css'
    ])
    .pipe(concat('lucy.flashdrive.nonvar.css'))
    .pipe(gulp.dest('./dist/'));
});
