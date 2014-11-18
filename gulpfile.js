
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
var inject = require('gulp-inject');
var stylus = require('gulp-stylus'); // gulp stylus compiler
var del = require('del');
var path = require('path');

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
gulp.task('stylus', function() {
  gulp.src('./client/source/assets/style/style.styl')
    .pipe(stylus())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./client/build/assets/style/'));
});

gulp.task('assets', function() {
  gulp.src('client/source/assets/js/**/**', {base: 'client/source/'})
    .pipe(gulp.dest('client/build'));
  gulp.src('client/source/assets/img/*', {base: 'client/source/'})
    .pipe(gulp.dest('client/build'));
  gulp.src('client/source/assets/txt/*', {base: 'client/source/'})
    .pipe(gulp.dest('client/build'));
  gulp.src('client/source/index.html')
    .pipe(gulp.dest('client/build'));
});

gulp.task('clean', function(cb) {
  del([
    'client/build/**/**',
    'client/build/**'
  ], cb);
});

gulp.task('templates', function() {
  gulp.src('client/source/templates/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Menyou.templates',
      noRedeclare: true,
      processName: function(filePath) {
        return declare.processNameByPath(filePath.replace('client/source/templates/', ''));
      }
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('client/build/assets/js/'));
});

gulp.task('partials', function() {
  gulp.src('client/source/templates/partials/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.registerPartial("<%= fname(file) %>", Handlebars.template(<%= contents %>))', {}, {
      imports: {
        fname: function(file) {
          return path.basename(file.path, '.js');
        }
      }
    }))
    .pipe(concat('partials.js'))
    .pipe(gulp.dest('client/build/assets/js'));
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
      exclude: ['.gitignore', '.git', 'npm-debug.log', 'gulpfile']
    }));
});

gulp.task('watch', function() {
  gulp.watch(['client/source/assets/style/*.styl', 'client/source/assets/style/partials/*.styl'], ['stylus']);
  gulp.watch(['client/source/index.html', 'client/source/assets/**/**/**'], ['assets']);
  gulp.watch('client/source/templates/*.hbs', ['templates']);
  gulp.watch('client/source/templates/partials/*.hbs', ['partials']);
});

gulp.task('deploy', ['build', 'push']);
gulp.task('build', ['stylus', 'assets', 'partials', 'templates']);
gulp.task('default', ['build', 'serve', 'watch']);

