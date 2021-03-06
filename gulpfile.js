const gulp = require('gulp');
const browserify = require('gulp-browserify');
const clean = require('gulp-clean');

const spawn = require('child_process').spawn;
let node;


gulp.task('server', function() {
   if (node) {
      node.kill();
   }
   node = spawn('node', ['server.js'], {stdio: 'inherit'});
   node.on('close', function (code) {
      if (code === 8) {
         gulp.log('Error detected, waiting for changes...');
      }
   });
})

gulp.task('clean', function() {
   return gulp
   .src(['public/game-files/'])
   .pipe(clean());
});

gulp.task('bundle', ['clean'], function() {
   gulp
   .src(['game-files/**/level.js'])
   .pipe(browserify({
      insertGlobals: true,
      debug: true
   }))
   .pipe(gulp.dest('public/game-files/'));

   gulp
   .src(['game-files/**/*.png', 'game-files/**/*.json', 'game-files/**/*.mp3'])
   .pipe(gulp.dest('public/game-files/'));
});


gulp.task('default', ['bundle', 'server'], function() {
   gulp.watch([
      'server.js',
      'routes/**/*.js',
      'models/**/*.js',
      'game-files/**/*.js',
      'game-files/**/*.json'
   ], [
      'bundle',
      'server'
   ]);
});

