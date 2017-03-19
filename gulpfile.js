var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

var cssFiles = [
    'dist/css/style.css'
];

/* Tache lancer par defaut par gulp */
gulp.task('default', ['scss', 'concatCSS', 'watch']);

gulp.task('scss', function() {
    return sass('source/scss/')
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari >= 8', 'ie >= 10', 'opera 12.1', 'ios >= 8', 'android >= 4', 'Firefox > 43'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('concatCSS', function() {
    return gulp.src(cssFiles)
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(cleanCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('main.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

gulp.task('watch', function() {
    gulp.watch('source/scss/**/*.scss', ['scss']);
    gulp.watch('dist/css/style.css', ['concatCSS']);
});