/**
 *
 *  Didor Starter Kit
 *
 */

'use strict';

// Este gulpfile usa las nuevas características de JavaScript.
// Babel lo hace posible sin que tengamos que hacer nada. Simplemente funciona.
// Puedes leer más sobre las nuevas características de JavaScript aquí:
// https://babeljs.io/docs/learn-es2015/

import gulp from 'gulp';
import del from 'del';
import browserSync from 'browser-sync';
import pngquant from 'imagemin-pngquant';
import runSequence from 'run-sequence';
import gulpLoadPlugins from 'gulp-load-plugins';
import pkg from './package.json';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const paths = {
  tmp:       './.tmp',
  src :      './app',
  dist:      './dist',
  styles: {
    all:     './app/styles/**/*.scss',
    main:    './app/styles/main.scss',
    dest:    './.tmp/styles'
  },
  scripts: {
    folder:  './app/scripts',
    all:     './app/scripts/**/*.js'
  },
  pugs: {
    all:     './app/**/*.pug',
    index:   './app/index.html',
    dest:    './.tmp'
  },
  assets: {
    all:     './app/assets/*.*',
    dest:    './dist'
  },
  images: {
    all:     './app/assets/images/**/*',
    dest:    './dist/images'
  },
  fonts: {
    all:     './app/assets/fonts/*',
    dest:    './dist/fonts'
  },
  favicon: {
    icon:    './app/assets/images/favicon.png',
    dest:    './dist/images/touch',
    all:     './dist/images/touch/*.*'
  },
  html: {
    folder:  './.tmp',
    all:     './.tmp/**/*.html',
    dest:    './dist'
  },
  css: {
    folder:  './.tmp/styles',
    all:     './.tmp/styles/**/*.css'
  },
  rel: {
    tmp:         '/.tmp/',
    src:         '/app/',
    touch:       '/images/touch/',
    noPng:       '!./dist/images/touch/*.png',
    noIco:       '!./dist/images/touch/*.ico',
    favicon:     './app/assets/images/favicon.png',
    noFavicon:   '!./app/assets/images/favicon.png',
    noTest:      '!./app/scripts/**/*.test.js',
    distAll:     './dist/*',
    noDistGit:   '!./dist/.git',
    distScripts: './dist/**/*.js',
    distStyles:  './dist/**/*.css',
    distHTML:    './dist/**/*.html',
    distFonts:   './dist/fonts/*'
  }
}


// Vigila los cambios en los archivos y regarga el navegador
gulp.task('server', ['style', 'lint', 'pug'], function() {
  browserSync({
    notify: false,
    logPrefix: 'DSK',
    server: [paths.tmp, paths.src],
    port: 3000
  });

  gulp.watch(paths.pugs.all, ['injectPostPug', reload]);
  gulp.watch(paths.styles.all, ['style', reload]);
  gulp.watch(paths.scripts.all, ['lint', 'inject', reload]);
  gulp.watch(paths.images.all, reload);
  gulp.watch(paths.fonts.all, reload);
});

// Compila y añade automaticamente los prefijos a los estilos
gulp.task('style', ['scss-lint'], () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  return gulp.src(paths.styles.main)
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(paths.styles.dest));
});


// Linter para scss
gulp.task('scss-lint', function() {
  return gulp.src(paths.styles.all)
    .pipe($.sassLint({
      configFile: './.sass-lint.yml'
    }))
    .pipe($.sassLint.format());
});


// Compila los archivos pug en html
gulp.task('pug', function buildHTML() {
  return gulp.src(paths.pugs.all)
    .pipe($.pugLinter())
    .pipe($.pugLinter.reporter())
    .pipe($.pug({
      'pretty': true
    }))
    .pipe(gulp.dest(paths.pugs.dest));
});


// Transforma el código ES2015 a ES5.
// para activarlo hay que eliminar la línea `"only": "gulpfile.babel.js",`
// del archivo `.babelrc`
gulp.task('babel', () =>
    gulp.src(paths.scripts.all)
      .pipe($.babel())
);


// Lint JavaScript
gulp.task('lint', () =>
  gulp.src(paths.scripts.all)
    .pipe($.eslint())
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()))
);


// Busca en las carpetas de estilos y javascript los archivos que hayamos creado
// para inyectarlos en el index.html
gulp.task('inject', () => {
  var injectStyles = gulp.src([paths.css.all], {read: false});
  var injectScripts = gulp.src([paths.scripts.all, paths.rel.noTest], {read: false})

  var injectOptions = {
    ignorePath: [paths.rel.tmp,paths.rel.src]
  };

  return gulp.src(paths.html.all)
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(gulp.dest(paths.html.folder))
});

// Espera que se hayan compilado los archivos pug, antes de hacer el inject
gulp.task('injectPostPug', ()=> {
  runSequence('pug', ['inject']);
});


gulp.task('favicon', ['make-favicon'], ()=> {
  del([paths.favicon.all,paths.rel.noPng,paths.rel.noIco], {dot: true});
  gulp.src(paths.rel.favicon, {dot: true})
    .pipe(gulp.dest(paths.dist))
})


// Genera un favicon
gulp.task("make-favicon", () => {
  return gulp.src(paths.favicon.icon).pipe($.favicons({
    background: "#fff",
    path: paths.rel.touch,
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
  .on("error", $.util.log)
  .pipe(gulp.dest(paths.favicon.dest));
});


gulp.task('styleguide', function() {
  gulp.src('./app/styles/main.scss')
  .pipe($.didorStyleguide());
});


// Comprime los archivos CSS y JS enlazados en los html y los minifica.
// Copia los Html al directorio dist
gulp.task('compress', ['inject'], function() {
  return gulp.src(paths.html.all)
    .pipe($.useref({ searchPath: [paths.tmp,paths.src] }))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cleanCss()))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe($.if('*.js', $.rev()))
    .pipe($.if('*.css', $.rev()))
    .pipe($.revReplace())
    .pipe(gulp.dest(paths.html.dest))
})


// Optimizar imágenes
gulp.task('images', () =>
  gulp.src([paths.images.all,paths.rel.noFavicon])
    .pipe($.cache($.imagemin({
      progressive: true,
      use: [pngquant()]
    })))
    .pipe(gulp.dest(paths.images.dest))
    .pipe($.size({title: 'images'}))
);


// Copy all files at the root level (app)
gulp.task('copy', () =>
  gulp.src([paths.assets.all, paths.fonts.all], {
    dot: true
  }).pipe(gulp.dest(paths.assets.dest))
);


// Limpia el directorio temporal
gulp.task('clean-tmp', () => del([paths.tmp], {dot: true}));


// Limpia el directorio de salida
gulp.task('clean', () => del([paths.rel.distAll, paths.rel.noDistGit], {dot: true}));


// Genera los archivos para producción, tarea por defecto
gulp.task('default', ['clean'], function() {
  runSequence(['style', 'pug'], ['compress', 'images', 'copy', 'favicon']);
});

gulp.task('serve', ['clean-tmp'], function() {
  runSequence('server', ['inject']);
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


// Servidor web de producción
gulp.task('serve:docs', ['styleguide'], function() {
  browserSync.init({
    notify: false,
    logPrefix: 'DSK',
    server: ['./docs','.tmp'],
    port: 3002
  });


  gulp.watch(paths.pugs.all, ['styleguide', reload]);
  gulp.watch(paths.styles.all, ['styleguide', reload]);
  gulp.watch(paths.scripts.all, ['styleguide', reload]);
});

// Comprueba la complejidad del código
gulp.task('jsreport', function(){
  return gulp.src(paths.scripts.all)
    .pipe($.complexity());
});

// Comprueba el tamaño de los archivos
gulp.task('sizereport', function () {
  return gulp.src([paths.rel.distHTML, paths.rel.distScripts, paths.rel.distStyles, paths.rel.distFonts])
    .pipe($.sizereport());
});
