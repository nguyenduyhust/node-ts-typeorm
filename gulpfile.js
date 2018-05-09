let gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  tslint = require('gulp-tslint'),
  sass = require('gulp-sass'),
  exec = require('child_process').exec;

let tslintConfig = require('./tslint.json');

// Build all
gulp.task('build', ['copy-assets', 'tsc', 'css', 'lint'], () => { });

// Copy nesesarry asserts to build folder
gulp.task('copy-assets', () => {
  gulp.src(
    ['src/public/**/', 'src/views/**/'],
    { base: './src' }
  ).pipe(gulp.dest('./build'));
});

// Build typescript file
gulp.task('tsc', function (cb) {
  return exec('node ./node_modules/typescript/bin/tsc', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

// Build css
gulp.task('css', () => {
  gulp.src('./src/public/css/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./build/public/css'));
});

// Linting
gulp.task("lint", () => {
  gulp.src("src/**/*.ts")
    .pipe(tslint(tslintConfig))
    .pipe(tslint.report())
});