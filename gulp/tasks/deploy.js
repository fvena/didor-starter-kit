var gulp        = require('gulp')
    paths       = require('../config.js').paths,
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    sassLint    = require('gulp-sass-lint'),
    please      = require('gulp-pleeease'),
    sourcemaps  = require('gulp-sourcemaps'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    pug         = require('gulp-pug'),
    pugLinter   = require('gulp-pug-linter'),
    del         = require('del'),
    runSequence = require('run-sequence');


gulp.task('serve', ['scss', 'jshint', 'pug'], function() {
  browserSync.init({
    server: [paths.tmp, paths.src]
  });
});


gulp.task('watch', function() {
  gulp.watch(paths.scss, ['scss']);
  gulp.watch(paths.pug, ['pug']);
  gulp.watch(paths.js, ['js-watch']);
});


gulp.task('scss-lint', function() {
  return gulp.src(paths.scss)
    .pipe(sassLint({
      configFile: './.sass-lint.yml'
    }))
    .pipe(sassLint.format());
});


gulp.task('scss', ['scss-lint'], function() {
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(please({
      "autoprefixer": {"browsers": ["last 2 versions"]},
      "filters": true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.cssFolder))
    .pipe(browserSync.stream());
});


gulp.task('pug', function buildHTML() {
  return gulp.src(paths.pug)
    .pipe(pugLinter())
    .pipe(pugLinter.reporter())
    .pipe(pug({
      'pretty': true
    }))
    .pipe(gulp.dest(paths.tmp))
    .pipe(browserSync.stream());
})


gulp.task('jshint', function() {
  return gulp.src(paths.js)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
})


gulp.task('js-watch', ['jshint'], function(done) {
  browserSync.reload();
  done();
})


gulp.task('clean-tmp', function() {
  return del([
    paths.tmp
  ]);
})


gulp.task('default', function() {
  runSequence('clean-tmp', ['serve','watch']);
});
