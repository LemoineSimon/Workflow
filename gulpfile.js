var gulp = require( 'gulp' );
var concat = require( 'gulp-concat' );
var sass = require( 'gulp-ruby-sass' );
var uglify = require( 'gulp-uglify' );
var rename = require( 'gulp-rename' );
var minifyCss = require( 'gulp-minify-css' );
var autoprefixer = require( 'gulp-autoprefixer' );


/* Tache lancer par defaut par gulp */
gulp.task( 'default', ['scripts', 'sass', 'watch'] );

/* Tache SCSS -> CSS -> Concat -> Minify */
gulp.task('scss',function(){
	return sass('scss/')
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(autoprefixer({
    	browsers : ['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4','Firefox < 20'],
    	cascade: false}))
    .pipe(gulp.dest('css'))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('css'))
    .pipe(minifyCss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('css'));

});


gulp.task('scripts', function() {
    return gulp.src('js/*.js')
      	.pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

gulp.task('watch',function(){
	gulp.watch('scss/*.scss',['scss']);
});