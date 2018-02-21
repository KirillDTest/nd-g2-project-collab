const gulp= require('gulp');
const image= require('gulp-image');
const jade= require('gulp-jade');
const sass= require('gulp-sass');
const connect= require('gulp-connect');
const plumber= require('gulp-plumber');
const notify= require('gulp-notify');

//plumber({errorHandler: notify.onError("Error: <%= error.message %>")})

gulp.task('image-comp',()=>{
	gulp.src(['./src/img/**/*.jpg', './src/img/**/*.png'])
		.pipe(plumber())
		.pipe(image())
		.pipe(gulp.dest('./dist/img'))
		.pipe(connect.reload())
});

gulp.task('html', ()=>{
	gulp.src('./src/**/!(_)*.jade')
	.pipe(plumber())
	.pipe(jade({pretty: true}))
	.pipe(gulp.dest('./dist'))
	.pipe(connect.reload())
})
gulp.task('js', ()=>{
	gulp.src('./src/**/!(_)*.js')
	.pipe(gulp.dest('./dist/js'))
})

gulp.task('css', ()=>{
	gulp.src(['./src/style/*.sass', './src/style/*.scss'])
	.pipe(plumber())
	//'compressed'
	.pipe(sass({outputStyle: 'neted'}))
	.pipe(gulp.dest('./dist/css'))
	.pipe(connect.reload())
})

gulp.task('watch', ()=>{
	gulp.watch(['src/style/*.sass', 'src/style/*.scss'], {cwd: './'}, ['css'])
	gulp.watch(['src/**/*.jade'], {cwd: './'}, ['html'])
	gulp.watch(['src/img/**/*.jpg', 'src/img/**/*.png'], {cwd: './'}, ['image-comp'])
})

gulp.task('connect', ()=>{
	connect.server({
		port: 9000,
		livereload: true,
		root: './dist'
	})
})

gulp.task('default', ['image-comp', 'html', 'css', 'watch', 'connect', 'js']);
