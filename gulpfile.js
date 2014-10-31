var gulp            = require('gulp');
var exec            = require('child_process').exec;
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var mainBowerFiles  = require('main-bower-files');
var usemin          = require('gulp-usemin');
var minifyCSS       = require('gulp-minify-css');
var concat          = require('gulp-concat');
var webpack         = require('gulp-webpack');
var uglify          = require('gulp-uglify');
var rev             = require('gulp-rev');
var imageResize     = require('gulp-image-resize');
var connect         = require('gulp-connect');
var Q               = require('q');
var harp            = require('harp');
var del             = require('del');
var rename          = require("gulp-rename");
var openPage        = require("gulp-open");
var bower           = require("bower");


/**
*  CLEAN
*
*  Delete files and directories
*/
gulp.task('clean', function() {
  return Q.promise(function(resolve, error) {
    del(['.tmp/', 'build/', 'public/css/', 'public/js/', 'public/libs/', 'public/images/'], resolve);
  });
});

gulp.task('clean:build', function() {
  return Q.promise(function(resolve, error) {
    del(['build/'], resolve);
  });
});

gulp.task('clean:libs', function() {
  return Q.promise(function(resolve, error) {
    del(['.tmp/libs/', 'public/libs/'], resolve);
  });
});

gulp.task('clean:css', function() {
  return Q.promise(function(resolve, error) {
    del(['public/css/'], resolve);
  });
});

gulp.task('clean:js', function() {
  return Q.promise(function(resolve, error) {
    del(['public/js/'], resolve);
  });
});

gulp.task('clean:images', function() {
  return Q.promise(function(resolve, error) {
    del(['public/images/'], resolve);
  });
});


/**
*  BOWER VENDOR LIBRARIES
*
*  Get bower libraries flatten and move to libs folder
*/
gulp.task('bowerFiles', ['clean:libs'], function() {
  return gulp.src(mainBowerFiles())
    .pipe(gulp.dest('.tmp/libs'));
});

gulp.task('moveJSLibs', ['clean:js', 'bowerFiles'], function(){
  var stream = gulp.src('.tmp/libs/**/*.js')
      .pipe(concat('vendor.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/js/libs'));

  return stream;
});

gulp.task('moveCSSLibs', ['clean:css', 'bowerFiles'], function(){
  var stream = gulp.src('.tmp/libs/**/*.css')
      .pipe(concat('vendor.css'))
      .pipe(minifyCSS({ noAdvanced: true }))
      .pipe(gulp.dest('public/css/libs'));

  return stream;
});


/**
*  CSS PREPROCESSING
*
*  Sass, vender prefix, minify, move
*/
gulp.task('css', ['moveCSSLibs'], function() {
  var stream = gulp.src('resources/scss/**/*.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(minifyCSS({ noAdvanced: true }))
      .pipe(gulp.dest('public/css'));

  return stream;
});


/**
*  JAVASCRIPT PREPROCESSING
*
*  bower file, common js modules, uglify, minify
*/
gulp.task('js', ['moveJSLibs'], function() {
  var stream = gulp.src('resources/js/**/*.js').
      pipe(webpack({
        output: {filename: "site.js"}
      }))
      .pipe(gulp.dest('public/js'));

  return stream;
});


/**
*  IMAGE PROCESSING - CREATE THUMBNAILS
*
*  Take the existing portfolio images and automatically
*  cretes thumbsnails. The thumbnails directory will be
*  add to the directory the images were in.
*  ex. images/widgetco/thumbnails
*/
gulp.task('images:standard',['clean:images'], function() {
  var imagePaths = [
    'resources/images/**/*.{jpg,png,gif}',
    '!resources/images/portfolio/**/*.{jpg,png,gif}'
  ];

  var stream = gulp.src(imagePaths)
      .pipe(gulp.dest('public/images'));

  return stream;
});

gulp.task('images', ['images:standard'], function() {
  var stream = gulp.src('resources/images/portfolio/**/*.{jpg,png,gif}')
    .pipe(gulp.dest("public/images/portfolio"))
    .pipe(imageResize({
      width : 300,
      height : 400,
      crop : true,
      upscale : true,
      gravity: 'NorthWest'
    }))
    .pipe(rename(function (path) {
        path.dirname += "/thumbnails";
    }))
    .pipe(gulp.dest("./public/images/portfolio")); // public/images/<COMPANY>/thumbnails/

  return stream;
});


/**
*  HARP FRAMEWORK
*
*  Run harp to process public/ files into build/
*  1. Cleans build folder
*  2. Preprocess CSS, JS, Images
*  3. Build with Harp
*/
gulp.task('harp', function() {
  return Q.promise(function(resolve, error) {
    harp.compile('./', 'build', resolve);
  });
});

gulp.task('harp:css', ['css'], function() {
  return Q.promise(function(resolve, error) {
    harp.compile('./', 'build', resolve);
  });
});
gulp.task('harp:js', ['js'], function() {
  return Q.promise(function(resolve, error) {
    harp.compile('./', 'build', resolve);
  });
});
gulp.task('harp:images', ['images'], function() {
  return Q.promise(function(resolve, error) {
    harp.compile('./', 'build', resolve);
  });
});

gulp.task('harp:build', ['css', 'images', 'js'], function() {
  return Q.promise(function(resolve, error) {
    harp.compile('./', 'build', resolve);
  });
});


/**
* WATCH BUILD HTML
*
* This happens everytime harp is run. this will
* reload when js, css, images, or jade files change.
*/
gulp.task('html', function () {
  var stream = gulp.src('build/**/*.html')
    .pipe(connect.reload());

  return stream;
});


/**
* FIREBASE
*
* The Firebase CLI tool to deploy to a hosting Firebase account
*/
gulp.task('beanstalk-deploy', ['harp:build'], function (cb) {
  return Q.Promise(function(resolve, reject) {
    exec('firebase deploy', function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      resolve();
    });
  });
});


/**
*  WATCH
*
*  Rerun process after any of these files are edited
*/
gulp.task('watch', function() {
  gulp.watch('resources/scss/**/*.scss', ['harp:css']);
  gulp.watch('resources/js/**/*.js', ['harp:js']);
  gulp.watch('resources/images/**/*.{jpg,png,gif,svg}', ['harp:images']);
  gulp.watch('public/**/*.{jade,json}', ['harp']);
  gulp.watch('build/**/*.html', ['html']);
});


/**
*  CONNECT SERVER
*
*  Loads the server locally and reloads when
*  connect.reload() is called.
*/
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    port: 8000,
    livereload: true
  });
});


/**
*  BUILD TASKS
*
*  Local and production build tasks
*/
gulp.task('default', ['harp:build', 'watch', 'connect'], function() {
  //Now open in browser
  var stream = gulp.src("build/index.html")
      .pipe(openPage("", {
        app: "Google Chrome",
        url: "http://localhost:8000"
      }));

  return stream;
});

gulp.task('deploy', ['firebase']);