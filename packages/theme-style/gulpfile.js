'use strict'

// import gulp from "gulp";
const { src, dest, watch, parallel, series } = require('gulp')
const dartSass = require('sass')
const gulpSass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const sass = gulpSass(dartSass)

function buildStyles() {
  return src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['ie > 9', 'last 2 versions'],
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(dest('./lib'))
}
function hotUpdate() {
  const watcher = watch('src/**.scss', { ignoreInitial: false }, buildStyles)
}
exports.build = buildStyles
exports.default = hotUpdate
