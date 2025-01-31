// const spawn = require('child_process').spawn;
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');


gulp.task('browser-sync', function () {
  browserSync.init({
    proxy: "http://localhost:7000",
    port: 4000
  });
});


gulp.task('nodemon', function (cb) {
  var started = false;

  return nodemon({
    verbose: true,
    script: 'bin/boot-backend.js',
    ext: 'js',
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
  browserSync.reload();
  done();
});

// gulp.task('debug',['nodemon','browser-sync'], function (done) {
gulp.task('debug', gulp.series('nodemon', 'browser-sync'), function (done) {
  console.log('[STARTING BACKEND]');
});




/**
 * 
 * 
 * 
 * var command;
  gulp.task('server:debug', function (cb) {
    process.env.DEBUG = 'backend:*';
    command = spawn('node', ['bin/boot-backend.js'] );
    console.log('[STARTING NEW PROCESS]', command.pid)
  // command = spawn('ls', ['-la'] );
  
  command.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  command.stderr.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  command.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
 
});



gulp.task('kill:server', function(done) {
  if (command){
    console.log('[KILLING PROCESS]', command.pid);
    command.kill('SIGHUP');//'SIGHUP'
    // command = null;
  }
  done();
});


  gulp.task('server:start', function (done) {
    server.start();
    done();
  });
  gulp.task('server:stop', function (done) {
    server.stop();
    done();
  });
  

 */
