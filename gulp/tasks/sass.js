'use strict';

var config = require('../config');
var gulp = require('gulp');
// var prefix = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var fingerprint = require('gulp-fingerprint');
var size = require('gulp-size');
var sass = require('gulp-ruby-sass');

// Styles
gulp.task('styles', function () {
  // See https://github.com/andrew/node-sass for more options
  return sass('app/scss/app.scss',
    {
      sourcemap: true,
      loadPath: [config.bower + '/foundation/scss']
    })
    // .pipe(prefix('last 1 version'))  // add vendor prefixes if necessary
    .pipe(gulp.dest(config.dist + '/styles'))
    .pipe(size());
});

// Styles Dist
gulp.task('styles:dist', function () {
  var manifest = require('../../dist/image-manifest');
  // See https://github.com/andrew/node-sass for more options
  return sass('app/scss/app.scss',
    {
      sourcemap: true,
      loadPath: [config.bower + '/foundation/scss']
    })
    // .pipe(prefix('last 1 version'))  // add vendor prefixes if necessary
    .pipe(fingerprint(manifest, {verbose: true}))
    .pipe(csso())  // minify css
    .pipe(gulp.dest(config.dist + '/styles'))
    .pipe(size());
});
