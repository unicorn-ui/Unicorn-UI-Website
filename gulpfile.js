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
var flatten         = require('gulp-flatten');

/**
*  CLEAN
*
*  Delete files and directories
*/
gulp.task('clean', function() {
  return Q.promise(function(resolve, error) {
    del(['.tmp/', 'production/', 'public/css/', 'public/js/', 'public/libs/', 'public/images/', 'public/fonts/'], resolve);
  });
});

gulp.task('clean:build', function() {
  return Q.promise(function(resolve, error) {
    del(['production/'], resolve);
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

gulp.task('clean:fonts', function() {
  return Q.promise(function(resolve, error) {
    del(['public/fonts/'], resolve);
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
  var stream = gulp.src([
        '.tmp/libs/**/*.js',
        'resources/vendor-manual/**/*.js'
      ])
      .pipe(flatten())
      .pipe(uglify())
      .pipe(gulp.dest('public/js/libs'));

  return stream;
});

gulp.task('moveFonts', ['clean:fonts'], function(){
  var stream = gulp.src('resources/fonts/**/*')
      .pipe(gulp.dest('public/fonts'));

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
  var stream = gulp.src('resources/js/site.js').
      pipe(webpack({
        output: {filename: "site.js"}
      }))
      .pipe(gulp.dest('public/js'));

  return stream;
});


/**
*  IMAGES
*
*/

gulp.task('images',['clean:images'], function() {
  var imagePaths = [
    'resources/images/**/*.{jpg,png,gif,ico}'
  ];

  var stream = gulp.src(imagePaths)
      .pipe(gulp.dest('public/images'));

  return stream;
});


/**
*  HARP FRAMEWORK
*
*  Run harp to process public/ files into production/
*  1. Cleans production folder
*  2. Preprocess CSS, JS, Images
*  3. Build with Harp
*/

gulp.task('harp', function() {
  return Q.promise(function(resolve, error) {
    harp.compile('./', 'production', resolve);
  });
});

gulp.task('harp:css', ['css'], function() {
  return Q.promise(function(resolve, error) {
    harp.compile('./', 'production', resolve);
  });
});

gulp.task('harp:js', ['js'], function() {
  return Q.promise(function(resolve, error) {
    harp.compile('./', 'production', resolve);
  });
});

gulp.task('harp:images', ['images'], function() {
  return Q.promise(function(resolve, error) {
    harp.compile('./', 'production', resolve);
  });
});

gulp.task('harp:build', ['css', 'images', 'js', 'moveFonts'], function() {
  return Q.promise(function(resolve, error) {
    harp.compile('./', 'production', resolve);
  });
});


/**
* WATCH BUILD HTML
*
* This happens everytime harp is run. this will
* reload when js, css, images, or jade files change.
*/

gulp.task('reloadPage', ['harp'], function () {
  var stream = gulp.src('production/**/*.html')
    .pipe(connect.reload());

  return stream;
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
  gulp.watch('public/**/*.{jade,json,html,md}', ['harp']);
});


/**
*  CONNECT SERVER
*
*  Loads the server locally and reloads when
*  connect.reload() is called.
*/

gulp.task('connect', function() {
  connect.server({
    root: 'production',
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

  //OPEN IN BROWSER
  var stream = gulp.src("production/index.html")
      .pipe(openPage("", {
        app: "Google Chrome",
        url: "http://localhost:8000"
      }));

  return stream;
});