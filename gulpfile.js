var gulp = require('gulp');
var sass = require('gulp-sass');
var mincss = require('gulp-clean-css');
//转译scss  压缩css
gulp.task('devcss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest('./src/css'))
})


//监听scss
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('devcss'))
})

//整合任务
gulp.task('dev', gulp.series('devcss', 'watch'))