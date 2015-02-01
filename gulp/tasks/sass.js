'use strict';

var config = require('../config');
var gulp = require('gulp');
// var prefix = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var fingerprint = require('gulp-fingerprint');
var size = require('gulp-size');
var sass = require('gulp-ruby-sass');
var loadPath = [config.bower + '/foundation/scss', config.bower];

// Styles
gulp.task('styles', function () {
  return sass('app/scss/app.scss',
    {
      sourcemap: true,
      loadPath: loadPath
    })
    // .pipe(prefix('last 1 version'))  // add vendor prefixes if necessary
    .pipe(gulp.dest(config.dist + '/styles'))
    .pipe(size());
});

// Styles Dist
gulp.task('styles:dist', function () {
  //var manifest = require('../../dist/image-manifest.json');
  return sass('app/scss/app.scss',
    {
      sourcemap: true,
      loadPath: loadPath
    })
    // .pipe(prefix('last 1 version'))  // add vendor prefixes if necessary
    //.pipe(fingerprint(manifest, {verbose: true}))
    .pipe(csso())  // minify css
    .pipe(gulp.dest(config.dist + '/styles'))
    .pipe(size());
});
