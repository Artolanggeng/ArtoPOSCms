var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function () {
  nodemon({
    script: 'app.js',
    watch: '.',
    ext: 'js html hbs css jpg ico png json',
    env: { 'NODE_ENV': 'development' }
  })
})