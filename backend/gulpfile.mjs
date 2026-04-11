// const spawn = require('child_process').spawn;
import gulp from 'gulp';
import browserSync from 'browser-sync';

const bs = browserSync.create();

import nodemon from 'gulp-nodemon';


gulp.task('browser-sync', function () {
  bs.init({
    proxy: "http://localhost:7000",
    port: 4000
  });
});


gulp.task('nodemon', function (cb) {
  var started = false;

  return nodemon({
    verbose: true,
    script: 'bin/boot-backend.mjs',
    ext: 'js,mjs',
    ignore: ['node_modules'],
    watch: ['routes', 'views', './'],
    env: { 'DEBUG': 'backend:*' }
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true;
    }
  })
    .on('restart', function (files) {
      console.log('[FILES CHANGED]', files);
    });
});


gulp.task('browser-sync:reload', function (done) {
  console.log('[RELOADING]');
  bs.reload();
  done();
});

gulp.task('debug', gulp.series('nodemon', 'browser-sync'), function (done) {
  console.log('[STARTING BACKEND]');
});




