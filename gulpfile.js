var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var watch = require('gulp-watch');

var KarmaServer = require('karma').Server;

var builds = {
  core: 'build/threestrap-core.js',
  extra: 'build/threestrap-extra.js',
  bundle: 'build/threestrap.js',
};

var products = [
  builds.core,
  builds.extra,
  builds.bundle,
];

var vendor = [
  'node_modules/lodash/dist/lodash.js',
];

var core = [
  'src/binder.js',
  'src/api.js',
  'src/bootstrap.js',
  'src/plugin.js',
  'src/aliases.js',
  'src/core/fallback.js',
  'src/core/renderer.js',
  'src/core/bind.js',
  'src/core/size.js',
  'src/core/fill.js',
  'src/core/loop.js',
  'src/core/time.js',
  'src/core/scene.js',
  'src/core/camera.js',
  'src/core/render.js',
  'src/core/warmup.js',
];

var extra = [
  'vendor/stats.min.js',
  'vendor/controls/*.js',
  'src/extra/stats.js',
  'src/extra/controls.js',
  'src/extra/cursor.js',
  'src/extra/fullscreen.js',
  'src/extra/vr.js',
  'src/extra/ui.js',
];

var bundle = vendor.concat(core).concat(extra);

var test = [
  'node_modules/three/build/three.js',
].concat(bundle).concat([
  'test/**/*.spec.js',
]);

gulp.task('core', function () {
  return gulp.src(core)
    .pipe(concat(builds.core))
    .pipe(gulp.dest('.'));
});

gulp.task('extra', function () {
  return gulp.src(extra)
    .pipe(concat(builds.extra))
    .pipe(gulp.dest('.'));
});

gulp.task('bundle', function () {
  return gulp.src(bundle)
    .pipe(concat(builds.bundle))
    .pipe(gulp.dest('.'));
});

gulp.task('uglify-js', function () {
  return gulp.src(products)
    .pipe(uglify())
    .pipe(rename({
      extname: ".min.js"
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('karma', function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    files: test,
    singleRun: true,
  }, function(err) {
      if(err === 0){
        done();
      }
  }).start();
});

gulp.task('watch-karma', function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    files: test,
  }, function(err) {
      if(err === 0){
        done();
      }
  }).start();
});

gulp.task('watch-build', function () {
  // Endless stream mode
  return watch(bundle, { ignoreInitial: false })
      .pipe(
        gulp.start('build', function watchEnd(done) {
          done();
        })
      );
});

// Main tasks

gulp.task('build',
  gulp.series('core', 'extra', 'bundle', function buildEnd(done) {
  done();
}));

gulp.task('default',
  gulp.series('build', 'uglify-js', function defaultEnd(done) {
  done();
}));

gulp.task('test',
  gulp.series('build', 'karma', function testEnd(done) {
  done();
}));

gulp.task('watch',
  gulp.series('watch-build', 'watch-karma', function watchEnd(done) {
  done();
}));
