
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
var concat = require('gulp-concat');
var wrap = require('gulp-wrap');
var rsync = require('gulp-rsync');
var declare = require('gulp-declare');
var supervisor = require('gulp-supervisor');
var handlebars = require('gulp-handlebars');
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
  gulp.src('./client/source/assets/style/style.styl')
    .pipe(stylus({
      use: [ jeet() ]
    }))
    .pipe(gulp.dest('./client/build/assets/style/style.css'));
});

gulp.task('build-js', function() {

});

gulp.task('build-img', function() {

});

gulp.task('compile-handlebars', function() {
  gulp.src('client/source/templates/**/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'menyou.templates',
      noRedeclare: true,
      processName: function(filePath) {
        return declare.processNameByPath(filePath.replace('client/source/templates/', ''));
      }
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('client/build/assets/js/'));
});

gulp.task('push', function() {
  // push server and node mods, etc.
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
      exclude: ['.gitignore', '.git', 'npm-debug.log', 'gulpfile', 'client']
    }));
  // push client
  gulp.src('./client/build')
    .pipe(rsync({
      root: './client/build',
      hostname: '104.236.61.65',
      destination: 'menyou/client',
      compress: true,
      recursive: true,
      clean: true,
      silent: true
    }));
});

gulp.task('watch', function() {
  gulp.watch(['client/source/assets/style/*.styl', 'client/source/assets/style/partials/*.styl'], ['compile-stylus']);
});

gulp.task('deploy', ['compile-stylus', 'push'])
gulp.task('default', ['compile-stylus', 'serve', 'watch']);

