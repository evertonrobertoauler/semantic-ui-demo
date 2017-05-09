const gulp = require('gulp');

gulp.task('copy', () => {
  gulp
    .src('src/public/**/*')
    .pipe(gulp.dest('dist/public'));
});

gulp.task('watch', ['copy'], () => {
  gulp.watch('src/public/**/*', ['copy']);
});
