'use strict';

var gulp        = require('gulp'),
    paths       = require('../config.js').paths,
    browserSync = require('browser-sync').create();


// Servidor web de producción
gulp.task('serve-dist', function() {
  browserSync.init({
    server: paths.dist
  });
});
