'use strict';

var gulp = require("gulp");
var babel = require("gulp-babel");
var prefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rigger = require('gulp-rigger');
var cssmin = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var rimraf = require('rimraf');
var server = require("browser-sync");
var del = require("del");

var browserSync = require("browser-sync"),
    reload = browserSync.reload;

var project = {
    dist: {
        html: 'dist/',
        script: 'dist/script/',
        style: 'dist/style/',
        img: 'dist/img/',
        fonts: 'dist/fonts/',
        bin: 'dist/bin'
    },
    src: {
        html: 'src/*.html',
        script: 'src/script/main.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.{png, jpg}',
        fonts: 'src/fonts/**/*.*',
        bin: 'src/bin/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        script: 'src/script/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.{png, jpg}',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './dist'
};

var config = {
    server: {
        baseDir: "./dist"
    },
    host: 'localhost',
    port: 3000,
    logPrefix: "Frontend",
    notify: false,
    open: true,
    ui: false
};

gulp.task('html:build', function () {
    gulp.src(project.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(project.dist.html))
        .pipe(reload({stream: true}));
});

gulp.task('script:build', function () {
    gulp.src(project.src.script)
        .pipe(rigger())
        .pipe(babel())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(project.dist.script))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(project.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(project.dist.style))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(project.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(project.dist.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(project.src.fonts)
        .pipe(gulp.dest(project.dist.fonts))
});

gulp.task('bin:build', function() {
    gulp.src(project.src.bin)
        .pipe(gulp.dest(project.dist.bin))
});

gulp.task('build', [
    'html:build',
    'script:build',
    'style:build',
    'fonts:build',
    'image:build',
    'bin:build'
]);

gulp.task('clean', function() {
    del(project.clean);
});

gulp.task('html:watch', function () {
    gulp.watch(project.watch.html, ['html:build']);
});

gulp.task('script:watch', function () {
    gulp.watch(project.watch.script, ['script:build']);
});

gulp.task('style:watch', function () {
    gulp.watch(project.watch.style, ['style:build']);
});

gulp.task('fonts:watch', function () {
    gulp.watch(project.watch.fonts, ['fonts:build']);
});

gulp.task('image:watch', function () {
    gulp.watch(project.watch.img, ['image:build']);
});

gulp.task('watch', [
    'html:watch',
    'script:watch',
    'style:watch',
    'fonts:watch',
    'image:watch'
]);

gulp.task('server', function () {
    browserSync(config);
});

gulp.task('default', ['clean', 'build', 'server', 'watch']);

