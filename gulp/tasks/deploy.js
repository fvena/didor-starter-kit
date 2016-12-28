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
    inject      = require('gulp-inject'),
    wiredep     = require('wiredep').stream,
    del         = require('del'),
    runSequence = require('run-sequence').use(gulp);


gulp.task('serve', ['scss', 'jshint', 'pug'], function() {
  browserSync.init({
    server: [paths.tmp, paths.src]
  });
});


gulp.task('watch', function() {
  gulp.watch(paths.scss, ['scss','inject']);
  gulp.watch(paths.pug, ['pug']);
  gulp.watch(paths.js, ['js-watch','inject']);
  gulp.watch("./bower.json", ['inject']);
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


// Busca errores en el JS y nos lo muestra en el terminal
gulp.task('jshint', function() {
  return gulp.src(paths.js)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
})


// Recarga la página una vez se han unido y comprimido los archivos javascripts
gulp.task('js-watch', ['jshint'], function(done) {
  browserSync.reload();
  done();
})


// Busca en las carpetas de estilos y javascript los archivos que hayamos creado
// para inyectarlos en el index.html
gulp.task('inject', function() {
  var injectStyles = gulp.src([paths.css], {read: false});
  var injectScripts = gulp.src([
    paths.js,
    '!' + paths.src + '/**/*.test.js'
  ], {read: false})

  var injectOptions = {
    ignorePath: ["/.tmp/","/app/"]
  };
  var wiredepOptions = {
    directory: "./bower_components"
  };

  return gulp.src(paths.html)
    .pipe(inject(injectStyles, injectOptions))
    .pipe(inject(injectScripts, injectOptions))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest(paths.tmp))
});

// Limpia el directorio tmp
gulp.task('clean-tmp', function() {
  return del([
    paths.tmp
  ]);
})


gulp.task('default', function() {
  runSequence('clean-tmp', ['serve','inject','watch']);
});
