const gulp = require('gulp');
const jshint = require('gulp-jshint');
const lesshint = require('gulp-lesshint')
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const es = require('event-stream');

gulp.task('cleanjs', function() {
    return gulp.src('dist/js')
        .pipe(clean());
});

gulp.task('cleancss', function() {
    return gulp.src('dist/css')
        .pipe(clean());
});

gulp.task('jshint', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('lesshint', function() {
    return gulp.src('src/css/**/just.css')
        .pipe(lesshint())
        .pipe(lesshint.reporter())
        .pipe(lesshint.failOnError());
})

gulp.task('uglify', ['cleanjs'], function() {
    return es.merge([
            gulp.src('node_modules/angular/angular.min.js'),
            gulp.src('src/js/*.js')
        ])
        .pipe(concat('just.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('cssmin', ['cleancss'], function() {
    return es.merge([
            gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css'),
            gulp.src('src/css/*.css').pipe(concat('scripts.css')).pipe(cssmin())
        ])
        .pipe(concat('just.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['jshint', 'lesshint', 'uglify', 'cssmin']);