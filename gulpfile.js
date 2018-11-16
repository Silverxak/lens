const fs = require('fs');
const gulp = require('gulp');
const gulpData = require('gulp-data');
const gulpTwig = require('gulp-twig');
const gulpRename = require('gulp-rename');
const gulpSass = require('gulp-sass');
const gulpSourcemaps = require('gulp-sourcemaps');
const fancyLog = require('fancy-log');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackStream = require('webpack-stream');
const packageJson = require('./package');


gulp.task('twig', () => {
    // noinspection JSUnresolvedFunction
    return gulp.src(['src/twig/pages/*.twig'])
        .pipe(gulpData(() => {return {
            version: packageJson.version,
            files: JSON.parse(fs.readFileSync('./src/data/files.json').toString()),
            tree: JSON.parse(fs.readFileSync('./src/data/tree.json').toString())
        }}))
        .pipe(gulpTwig({data: gulpData, base: 'src/twig/'}).on('error', function (error) {
            fancyLog.error(error);
            this.emit('end');
        }))
        .pipe(gulpRename(path => path.extname = '.html'))
        .pipe(gulp.dest('dist'));
});

gulp.task('scss', function () {
    // noinspection JSUnresolvedFunction
    return gulp.src(['./src/scss/prism.scss'])
        .pipe(gulpSourcemaps.init())
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulpSourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

gulp.task('typescript', function () {
    return gulp.src(['./src/typescript/index.ts'])
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['twig', 'scss', 'typescript'], () => {
    gulp.watch(['src/**/*'], ['twig', 'scss', 'typescript']);
});

// gulp.task('images', () => {
//     gulp.src('src/images/**/*')
//         .pipe(gulp.dest('dist/images'));
// });
//
// gulp.task('svg', () => {
//     gulp.src('src/svg/**/*.svg')
//         .pipe(svg({
//             mode: {
//                 symbol: {
//                     dest: 'svg',
//                     sprite: 'sprite.svg',
//                     prefix: 'svg-%s'
//                 }
//             }
//         }))
//         .pipe(gulp.dest('dist'));
// });
