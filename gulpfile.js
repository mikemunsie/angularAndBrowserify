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
var Q =             require('q');
var shell =         require('gulp-shell');
var spawn =         require('child_process').spawn;
var uglify =        require('gulp-uglify');
var walk =          require('walk');

var devEnvironment = false;
var templateFolders = [
  "angular_views",
  "angular_components"
];

function helpers_logStart(name) {
  return gulpUtil.log(gulpUtil.colors.green("Started: " + name));
}

function helpers_logEnd(name) {
  return gulpUtil.log(gulpUtil.colors.blue("(completed) - " + name));
}

function convertHTMLTemplatesToJS() {
  helpers_logStart("convertHTMLTemplatesToJS");
  var promise;
  var promiseQueue = [];

  // Run through each template folder
  _.forEach(templateFolders, function(templateFolder) {
    promise = new Promise(function (fulfil) {
      gulp
        .src("./public/" + templateFolder + "/**/*.html")
        .pipe(minifyHtml({
          empty: true,
          spare: true,
          quotes: true
        }))
        .pipe(ngHtml2Js({
          moduleName: "angularTemplates2JS",
          prefix: "/public/" + templateFolder + "/"
        }))
        .pipe((gulpif(!devEnvironment, uglify({
          preserveComments: "all",
          mangle: false
        }))))
        .pipe(gulp.dest("./public/js-min/templates/" + templateFolder))
        .on('end', function() {
          return fulfil();
        });
    });
    promiseQueue.push(promise);
  });

  return new Promise(function (fulfil) {
    Q.all(promiseQueue).then(function() {
      helpers_logEnd("convertHTMLTemplatesToJS");
      return fulfil();
    });
  });

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
      .pipe((gulpif(!devEnvironment, uglify({
        mangle: false,
        preserveComments: "all"
      }))))
      .pipe(gulp.dest('./public/js-min/'))
      .on('end', function() {
        helpers_logEnd("Browserify Angular Apps.");
        return fulfil();
      });
  });
}

gulp.task('default', function () {
  convertHTMLTemplatesToJS()
    .then(browserifyApps);
});