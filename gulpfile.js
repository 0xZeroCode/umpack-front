var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

gulp.task('compile-scripts', function() {

    return gulp.src([
            'bower_components/js-cookie/src/js.cookie.js',
            'bower_components/vex/dist/js/vex.combined.min.js',
            'umpack-front.js',
        ])
        .pipe(concat('umpack-front.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});


gulp.task('compile-css', function() {

    return gulp.src([
            'bower_components/vex/dist/css/vex.css',
            'bower_components/vex/dist/css/vex-theme-plain.css',


        ])
        .pipe(cleanCSS())
        .pipe(concat('umpack-style.css'))
        .pipe(gulp.dest('dist/css/'));

});



gulp.task('pack-umpack-front', [
    'compile-scripts',
    'compile-css'

], function() {


});
