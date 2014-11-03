
/**
 * GULP: pipe-based build system
 * better than 'npm start' when actively developing,
 * because it can handle css preprocessing, server
 * reloading, and other useful things automatically
 *
 * make sure the gulp binary is installed
 * ('npm install -g gulp'), and run 'gulp' in the
 * project root to run and watch
 */

var gulp = require('gulp');
var linker = require('gulp-linker');
var rsync = require('gulp-rsync');
var supervisor = require('gulp-supervisor');
var watch = require('gulp-watch');
var stylus = require('gulp-stylus'); // gulp stylus compiler
var jeet = require('jeet'); // grid system for stylus

/**
 * this serves our node app, and restarts the server
 * whenever a file in server/bin/ or server/app/ is modified
 */
gulp.task('serve', function() {
  supervisor('server/bin/www', {
    watch: ['server/bin', 'server/app'],
    exec: 'node',
    extensions: ['js'],
    noRestartOn: 'exit'
  });
});


/**
 * This task compiles our stylus into css.
 */
gulp.task('compile-stylus', function() {
  gulp.src('./client/assets/style/stylus/style.styl')
    .pipe(stylus({
      use: [ jeet() ]
    }))
    .pipe(gulp.dest('./client/assets/style/css/style.css'));
});

/**
 * This task links all the javscript files to the template
 */
gulp.task('link-javascript', function() {
  gulp.src('./client/index.html')
    .pipe(linker({
      scripts: [ 'client/app/**/*.js', 'client/assets/js/*.js' ],
      fileTmpl: '<script src=%s type=text/javascript></script>',
      appRoot: './client/'
    }))
    .pipe(gulp.dest('./client/'));
});

gulp.task('push', function() {
  gulp.src('.')
    .pipe(rsync({
      root: '.',
      username: 'root',
      hostname: '104.236.61.65',
      destination: 'menyou',
      compress: true,
      recursive: true,
      clean: true,
      silent: true,
      exclude: ['.gitignore', '.git', 'npm-debug.log', 'gulpfile', 'client/assets/style/stylus']
    }));
});

gulp.task('watch', function() {
  gulp.watch('client/assets/style/stylus/*.styl', ['compile-stylus']);
  gulp.watch(['client/assets/js/*.js', 'client/app/**/**/*.js'], ['link-javascript']);
});

gulp.task('deploy', ['compile-stylus', 'link-javascript', 'push'])
gulp.task('default', ['compile-stylus', 'link-javascript', 'serve', 'watch']);

