'use strict';

var gulp        = require('gulp'),
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
    favicons    = require("gulp-favicons"),
    gutil       = require("gulp-util"),
    gulpif      = require('gulp-if'),
    cleanCSS    = require('gulp-clean-css'),
    useref      = require('gulp-useref'),
    rev         = require('gulp-rev'),
    revReplace  = require('gulp-rev-replace'),
    uglify      = require('gulp-uglify'),
    del         = require('del'),
    runSequence = require('run-sequence').use(gulp);

var paths = {
  tmp :      './.tmp',
  css:       './.tmp/styles/*.css',
  cssFolder: './.tmp/styles',
  html:      './.tmp/*.html',
  src :      './app',
  js:        './app/scripts/**/*.js',
  pug:       './app/**/*.pug',
  scss:      './app/styles/**/*.scss',
  assets:    './app/assets',
  fonts:     './app/assets/fonts',
  images:    './app/assets/images',
  touch:     './app/assets/images/touch',
  favicon:   './app/assets/images/favicon.png',
  dist:      './dist',
  distAll:   './dist/*',
  distGit:   '!dist/.git'
}

gulp.task('server', ['scss', 'jshint', 'pug'], function() {
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

gulp.task("favicon", function () {
    return gulp.src(paths.favicon).pipe(favicons({
        appName: "Didor Starter Kit",
        appDescription: "Plantilla frontend para agilizar el inicio y desarrollo de aplicaciones web.",
        developerName: "Francisco Vena",
        developerURL: "http://www.fvena.com/",
        background: "#fff",
        path: "/images/touch/",
        url: "https://www.fvena.com/didor/",
        display: "browser",
        orientation: "portrait",
        version: "0.6",
        logging: false,
        online: false,
        html: 'head.html',
        pipeHTML: true,
        replace: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: true,
          windows: true,
          yandex: false
        }
    }))
    .on("error", gutil.log)
    .pipe(gulp.dest(paths.touch));
});

// Limpia el directorio tmp
gulp.task('clean-tmp', function() {
  return del([
    paths.tmp
  ]);
})

// Comprime los archivos CSS y JS enlazados en el index.html y los minifica
gulp.task('compress', ['inject'], function() {
  return gulp.src(paths.html)
    .pipe(useref({ searchPath: [paths.tmp,paths.src] }))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cleanCSS()))
    .pipe(gulpif('*.js', rev()))
    .pipe(gulpif('*.css', rev()))
    .pipe(revReplace())
    .pipe(gulp.dest(paths.dist))
})


// Copia el contenido de los estáticos al directorio de producción
// sin tags de comentarios
gulp.task('copy', function() {
  gulp.src('./app/lib/**')
    .pipe(gulp.dest('./dist/lib'));
})


// Limpia el directio dist
gulp.task('clean-dist', function() {
  return del([
    paths.dist
  ]);
})


// Limpia el directorio temporal
gulp.task('clean-tmp', () => del([paths.dist], {dot: true}));


// Limpia el directorio de salida
gulp.task('clean', () => del([paths.distAll, paths.distGit], {dot: true}));



// Genera los archivos para producción, tarea por defecto
gulp.task('default', ['clean'], function() {
  runSequence('scss', ['pug','compress']);
});

gulp.task('serve', ['clean-tmp'], function() {
  runSequence('server', ['inject','watch']);
});

// Servidor web de producción
gulp.task('serve:dist', function() {
  browserSync.init({
    notify: false,
    logPrefix: 'DSK',
    server: paths.dist,
    port: 3001
  });
});
