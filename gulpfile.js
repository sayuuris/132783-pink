"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var plumber = require("gulp-plumber");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");
var server = require("browser-sync").create();

gulp.task("css", function() {
    return gulp.src("source/less/style.less")
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(less())
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest("source/css"))
        .pipe(csso())
        .pipe(rename("style.min.css"))
        .pipe(sourcemaps.write("../maps"))
        .pipe(gulp.dest("source/css"))
        .pipe(server.stream());
});

gulp.task("server", function() {
    server.init({
        server:"source/"
    });
gulp.watch("source/less/**/*.less", gulp.series("css"));
gulp.watch("source/*.html").on("change", server.reload);
});
gulp.task("start", gulp.series("css", "server"));