const gulp = require('gulp'),
      sass = require('gulp-sass'),
      browserSync = require('browser-sync').create(),
      webpack = require('webpack'),
      webpackConfig = require('./webpack.config'),
      uglifyCss = require('gulp-uglifycss')
 
    

gulp.task('sass', function(){
   return gulp.src('./src/styles/**/*.scss')
              .pipe(sass()
              .on('error', sass.logError))           
              .pipe(gulp.dest('./temp/styles'))
              .pipe(browserSync.stream())
    })


gulp.task('scripts', function(){
  webpack(webpackConfig, function(err, stats){ 
    if(err){
      console.log(err.toString());
    }   
    console.log(stats.toString())
  })
})



gulp.task('watch', function(){
  browserSync.init({
    notify: false,
    server: {
      baseDir: './'
    },
  })

  gulp.watch('./*.html', browserSync.reload)
  gulp.watch('./src/styles/**/*.scss', ['sass']).on('change', browserSync.reload)
  gulp.watch('./src/scripts/**/*.js', ['scripts']).on('change', browserSync.reload)
}) 
