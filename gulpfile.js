var gulp          = require('gulp');
var gutil         = require('gulp-util');
var bower         = require('bower');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var sass          = require('gulp-sass');
var minifyCss     = require('gulp-minify-css');
var rename        = require('gulp-rename');
var sh            = require('shelljs');
var preprocess    = require('gulp-preprocess');
var gulpif        = require('gulp-if');
var browserify    = require('browserify');
var source        = require('vinyl-source-stream');
var templateCache = require('gulp-angular-templatecache');
var del           = require('del');
var imagemin      = require('gulp-image-optimization');
var shell         = require('gulp-shell');
var argv          = require('yargs').argv;
var gulpNgConfig  = require('gulp-ng-config');

var paths = {
  sass:       ['./scss/**/*.scss',
               './www/lib/ionic-material/dist/ionic.material.css',
               './www/lib/ion-autocomplete/dist/ion-autocomplete.css',
              ],
  html:       ['./www/build/index.html'],
  templates:  ['./www/js/**/*.html', './www/templates/**/*.html'],
  vendor:     ['./www/lib/ionic/release/js/ionic.bundle.js',
                './www/lib/ion-md-input/js/ion-md-input.js',
                './www/lib/ionic-material/dist/ionic.material.js',
                './www/lib/angular-cookies/angular-cookies.js',
                './www/lib/a0-angular-storage/dist/angular-storage.js',
                './www/lib/angular-jwt/dist/angular-jwt.js',
                './www/lib/angular-resource/angular-resource.js',
                './www/lib/ion-autocomplete/dist/ion-autocomplete.js',
                './www/lib/ngCordova/dist/ng-cordova.js',
                './www/lib/api-check/dist/api-check.js',
                './www/lib/angular-formly/dist/formly.js',
                './www/lib/angular-formly-templates-ionic/dist/angular-formly-templates-ionic.js'
              ],
  js:         [ './www/js/app.js',
                './www/js/api.js',
                './www/js/appCtrl.js',
                './www/js/loginCtrl.js',
                './www/js/mainCtrl.js',
                './www/js/bookingCtrl.js',
                './www/js/constant.js',
                './www/js/pricingCtrl.js',
                './www/js/contactCtrl.js',
                './www/js/confirmationCtrl.js',
                './www/js/yourBookingCtrl.js',
                 './www/js/estimateCtrl.js',
                './www/js/account.js',
                './www/js/config.js',
                './www/js/yourBookingDetailCtrl.js'
              ]
};

/* **********************************************************************************
 * Builds scss into css
 * **********************************************************************************/
gulp.task('build-css', function() {
  console.log('build-css STARTED');
  gulp.src(paths.sass)
    .pipe(sass({errLogToConsole: true}))
    .pipe(minifyCss({keepSpecialComments: 0}))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('./www/css/'))
    .on('end', function() {
      console.log('build-css DONE');
    });
});

/* **********************************************************************************
 * Builds all javascript files into one bundle
 * **********************************************************************************/
gulp.task('build-js', function() {
  console.log('build-js STARTED');
  return browserify(paths.js)
    .bundle()
    .pipe(source('app.bundle.js'))
    .pipe(gulp.dest('./www/js/bundles/'))
    .on('end', function() {
      console.log('build-js DONE');
    });
});

/* **********************************************************************************
 * Uglify already bundled file
 * **********************************************************************************/
gulp.task('uglify', function() {
  if (argv.production) {
    console.log('uglify STARTED');
    return gulp.src('./www/js/bundles/app.bundle.js')
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./www/js/bundles/'))
      .on('end', function() {
        console.log('uglify DONE');
      });
  }
});

/* **********************************************************************************
 * Builds html for development/production
 * **********************************************************************************/
gulp.task('build-html', function() {
  console.log('build-html STARTED');
  gulp.src(paths.html)
    .pipe(preprocess({context: {ENVIRONMENT: argv.production ? 'production' : 'development'}}))
    .pipe(gulp.dest('./www/'))
    .on('end', function() {
      console.log('build-html DONE');
    });
});

gulp.task('replaceConfig', function () {
  console.log('replaceConfig STARTED');
  gulp.src('config.json')
  .pipe(gulpNgConfig('app.env.config', {
    environment: 'dev'
    }))
  .pipe(gulp.dest('./www/js'))
  .on('end', function(){
    console.log('replaceConfig Done');
  });
});

/*gulp.task('preprocess-js', function() {
  console.log('preprocess-js STARTED');
  gulp.src('./www/js/config.js')
    .pipe(preprocess({context: {ENVIRONMENT: argv.production ? 'production' : 'development'}}))
    .pipe(gulp.dest('./www/js/common/'))
    .on('end', function() {
      console.log('preprocess-js DONE');
    });
});*/

/* **********************************************************************************
 * Cache all angular templates to reduce the number of http requests
 * **********************************************************************************/
gulp.task('build-templatecache', function (done) {
  console.log('build-templatecache STARTED');
  gulp.src(paths.templates)
    .pipe(templateCache())
    .pipe(gulp.dest('./www/js/utility/'))
    .on('end', function() {
      console.log('build-templatecache DONE');
    });
});

/* **********************************************************************************
 * Optimize images in 'platforms' folder
 * **********************************************************************************/
gulp.task('build-images', function() {
  console.log('build-images STARTED');
  return gulp.src([
      './platforms/android/assets/www/img/*',
      './platforms/ios/www/img/*',
      './platforms/android/res/**/*.png',
      // './platforms/ios/APP_NAME/Resources/*'
      ], { base: './' })
        .pipe(imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
      }))
      .pipe(gulp.dest('./'))
      .on('end', function() {
      console.log('build-images DONE');
    });
});

/* **********************************************************************************
 * Builds vendor scripts. Same for development and production
 * **********************************************************************************/
gulp.task('build-vendor', function() {
  console.log('build-vendor STARTED');
  return gulp.src(paths.vendor)
    .pipe(concat('vendor.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./www/js/bundles/'))
    .on('end', function() {
      console.log('build-vendor DONE');
    });
});

/* **********************************************************************************
 * Delete unnecessary files from the application
 * **********************************************************************************/
gulp.task('delete-files', function() {

  if (process.env.CORDOVA_CMDLINE && process.env.CORDOVA_CMDLINE.indexOf('--production') > 0) {
    //remove unneccesary files
    console.log('delete-files STARTED');
    del([
      'platforms/android/assets/www/lib/**',
      '!platforms/android/assets/www/lib',
      '!platforms/android/assets/www/lib/ionic',
      '!platforms/android/assets/www/lib/ionic/release',
      '!platforms/android/assets/www/lib/ionic/release/fonts',
      '!platforms/android/assets/www/lib/ionic/release/fonts/ionicons.eot',
      '!platforms/android/assets/www/lib/ionic/release/fonts/ionicons.svg',
      '!platforms/android/assets/www/lib/ionic/release/fonts/ionicons.ttf',
      '!platforms/android/assets/www/lib/ionic/release/fonts/ionicons.woff',
      'platforms/android/assets/www/js/**/*.js',
      'platforms/android/assets/www/js/**/*.html',
      '!platforms/android/assets/www/js/bundles/app.bundle.min.js',
      '!platforms/android/assets/www/js/bundles/vendor.min.js',
      '!platforms/android/assets/www/js/utility/templates.js',
      'platforms/android/assets/www/build/**',
      '!platforms/android/assets/www/templates/**',
      'platforms/android/assets/www/css/app.css',
      'platforms/android/assets/_where-is-www.txt',

      'platforms/ios/www/lib/**',
      '!platforms/ios/www/lib',
      '!platforms/ios/www/lib/ionic',
      '!platforms/ios/www/lib/ionic/fonts',
      '!platforms/ios/www/lib/ionic/fonts/ionicons.eot',
      '!platforms/ios/www/lib/ionic/fonts/ionicons.svg',
      '!platforms/ios/www/lib/ionic/fonts/ionicons.ttf',
      '!platforms/ios/www/lib/ionic/fonts/ionicons.woff',
      'platforms/ios/www/js/**/*.js',
      'platforms/ios/www/js/**/*.html',
      '!platforms/ios/www/js/bundles/app.bundle.min.js',
      '!platforms/ios/www/js/bundles/vendor.min.js',
      '!platforms/ios/www/js/utility/templates.js',
      'platforms/ios/www/build/**',
      '!platforms/ios/www/templates/**',
      'platforms/ios/www/css/app.css'
      ])
      .then(function() {
        console.log('delete-files DONE');
      });
  }
});


/* **********************************************************************************
 * Indicate user whether 'DEBUG' or 'RELEASE' build is used
 * **********************************************************************************/
gulp.task('release-detect', function() {
  process.env.target = 'DEBUG';

  if (process.env.CORDOVA_CMDLINE && process.env.CORDOVA_CMDLINE.indexOf('--production') > 0) {
    process.env.target = 'RELEASE';
    console.log('\x1b[41m%s\x1b[0m','\n\tPRODUCTION build is being prepared!!!!\n\t\tThis app will use live data!!!\n');
  }

  //we will prepare only available platforms
  process.env.targetAndroid = false;
  process.env.targetIos     = false;
  //process.env.CORDOVA_PLATFORMS = 'android,ios';

  if (process.env.CORDOVA_PLATFORMS) {
    var platforms = process.env.CORDOVA_PLATFORMS.toLowerCase();
    process.env.targetAndroid = platforms.split(',').indexOf('android') >= 0 ? true : false;
    process.env.targetIos = platforms.split(',').indexOf('ios') >= 0 ? true : false;
  }

  if (process.env.targetAndroid == 'true') { console.error('\n\tAndroid platform detected\n'); }
  if (process.env.targetIos == 'true') { console.error('\n\tIOS platform detected\n'); }
})

/* **********************************************************************************
 * This task is usually called from a hook to prepare files for building
 * **********************************************************************************/
gulp.task('build-prepare',[
    'release-detect',
    'default',
   // 'build-images',
    'version-increase'
  ], function() {
  console.log('build-prepare DONE');
});

/* **********************************************************************************
 * Preparation tasks. Installs all javascript lib dependencies defined in bower.json 
 * **********************************************************************************/
gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function() {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
});

/* **********************************************************************************
 * Install plugins manually
 * **********************************************************************************/
gulp.task('reinstall-plugins', function() {
  console.log('reinstalling ionic plugins...');
  var pluginlist = [
    "com.ionic.keyboard",
    "cordova-plugin-whitelist"
  ];

  // no need to configure below
  var fs    = require('fs');
  var path  = require('path');
  var sys   = require('sys')
  var exec  = require('child_process').exec;

  function puts(error, stdout, stderr) {
    sys.puts(stdout)
  }

  pluginlist.forEach(function(plug) {
    exec("ionic plugin add " + plug, puts);
  });
});

/* **********************************************************************************
 * Increase version number only if '--production' flag is set
 * **********************************************************************************/
gulp.task('version-increase', function() {
  console.log(process.env.CORDOVA_CMDLINE);
  console.log(argv.production);
  if (process.env.CORDOVA_CMDLINE && process.env.CORDOVA_CMDLINE.indexOf('--production') > 0) {
    console.log('version-increase STARTED');
    var fs = require('fs');

    fs.readFile("config.xml", 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }

      var version = data.match(/(<widget [^>]* version=\"[0-9]+\.[0-9]+\.)([0-9]+)(\")/i)[2];
      console.log('current minor version number is ',version, " increasing it to ", parseInt(version)+1);
      version++;

      var result = data.replace(/(<widget [^>]* version=\"[0-9]+\.[0-9]+\.)([0-9]+)(\")/i, '$1' + version + '$3');

      fs.writeFile("config.xml", result, 'utf8', function (err) {
         if (err) return console.log(err);
      });

      console.log('version-increase DONE');
    });
  }
});

/* **********************************************************************************
 * Watch task. Development only.
 * **********************************************************************************/
gulp.task('watch', function() {
  gulp.watch(['./scss/**/*.scss', './www/js/**/*.js', paths.html], ['build-css', 'replaceConfig', 'build-templatecache', 'build-js', 'build-html']);
});

gulp.task('default', ['build-css', 'replaceConfig', 'build-templatecache', 'build-js', 'uglify', 'build-vendor', 'build-html']);