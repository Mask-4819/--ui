"use strict";

// import gulp from "gulp";
const gulp = require("gulp");
const dartSass = require("sass");
const gulpSass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");
const sass = gulpSass(dartSass);

function buildStyles() {
  return gulp
    .src("./src/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./lib"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["ie > 9", "last 2 versions"],
        cascade: false,
      })
    )
    .pipe(cssmin());
};
exports.default = gulp.series(buildStyles);
