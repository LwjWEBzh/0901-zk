var gulp = require('gulp');
var sass = require('gulp-sass');
var mincss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var url = require('url');
var fs = require('fs');
var path = require('path');
var server = require('gulp-webserver');
//转译scss  压缩css
gulp.task('devcss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest('./src/css'))
})

//压缩js
gulp.task('minjs', function() {
        return gulp.src(['./src/js/**/*.js', '!./src/js/commnjs/*.js'])
            .pipe(uglify())
            .pipe(gulp.dest('libs'))
    })
    //监听scss
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('devcss'))

})


gulp.task('devServer', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8080,
            middlewrae: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return
                }
                console.log(pathname)
                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
            }
        }))
})

//整合任务
gulp.task('dev', gulp.series('devcss', 'minjs', 'devServer', 'watch'))