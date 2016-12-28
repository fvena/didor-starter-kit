'use strict';

var gulp        = require('gulp'),
    paths       = require('../config.js').paths,
    gulpif      = require('gulp-if'),
    minifyCss   = require('gulp-minify-css'),
    useref      = require('gulp-useref'),
    rev         = require('gulp-rev'),
    revReplace  = require('gulp-rev-replace'),
    uglify      = require('gulp-uglify'),
    del         = require('del'),
    runSequence = require('run-sequence').use(gulp);


// Comprime los archivos CSS y JS enlazados en el index.html y los minifica
gulp.task('compress', ['inject'], function() {
  return gulp.src(paths.html)
    .pipe(useref({ searchPath: [paths.tmp,paths.src] }))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
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


gulp.task('build', function() {
  runSequence('clean-dist', ['scss','pug','compress']);
});
