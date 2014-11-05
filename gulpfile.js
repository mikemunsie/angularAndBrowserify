var _ =             require('lodash-node');
var array =         require('array-extended');
var browserify =    require('gulp-browserify');
var browserSync =   require('browser-sync');
var clean =         require('gulp-clean');
var concat =        require('gulp-concat');
var eventEmitter =  require('events').EventEmitter;
var extend =        require('extend');
var fs =            require('fs');
var gulp =          require('gulp');
var gulpif =        require('gulp-if');
var gulpUtil =      require('gulp-util');
var gulpWatch =     require('gulp-watch');
var minifyCSS =     require('gulp-minify-css');
var minifyHtml =    require('gulp-minify-html');
var ngAnnotate =    require('gulp-ng-annotate');
var ngHtml2Js =     require('gulp-ng-html2js');
var path =          require('path');
var plumber =       require('gulp-plumber');
var Promise =       require('promise');
var shell =         require('gulp-shell');
var spawn =         require('child_process').spawn;
var uglify =        require('gulp-uglify');
var walk =          require('walk');

function helpers_logStart(name) {
  return gulpUtil.log(gulpUtil.colors.green("Started: " + name));
}

function helpers_logEnd(name) {
  return gulpUtil.log(gulpUtil.colors.blue("(completed) - " + name));
}

// Todo: Read the angular apps folder files
function browserifyApps() {
	helpers_logStart("Browserify Angular Apps.");
  return new Promise(function (fulfil) {
		gulp
			.src('./public/angular_apps/app_home.js')
	    .pipe(browserify({
	      insertGlobals : false,
	      debug: false
	    }))
	    .pipe(gulp.dest('./public/js-min/'))
	    .on('end', function() {
        helpers_logEnd("Browserify Angular Apps.");
        return fulfil();
      });
  });
}

gulp.task('default', function () {
	browserifyApps().then(function() {

	});
});