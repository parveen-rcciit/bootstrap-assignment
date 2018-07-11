const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
  return gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/bootstrap/dist/js/bootstrap.js', 'node_modules/popper/index.js'])
  .pipe(gulp.dest('js'))
  .pipe(browserSync.stream());
});

gulp.task('browser-sync', function () {
    browserSync.init(["css/*.css", "js/*.js"], {
        server: {
            baseDir: "./"
        }
    });
});
gulp.task('watch', ['browser-sync', 'sass'], function () {
    gulp.watch('scss/*.scss', ['sass']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch("index.html").on('change', browserSync.reload);
    //gulp.watch('index.html', browserSync.reload);
  gulp.watch("js/*.js").on('change', browserSync.reload);
    //gulp.watch('js/*.js', browserSync.reload);
});
//The default task (called when you run `gulp` from cli)

gulp.task('default', ['js','watch']);
