var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = {
    pages: ['src/**/*.html']
};

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify, {target: 'es5'}));

watchedBrowserify.on("log", gutil.log);

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

function bundle(production) {
    var src = watchedBrowserify
        .bundle()
        .on('error', function (error) { console.error(error.message.toString()); })
        .pipe(source('bundle.js'));

    if (production) {
        src = src
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'));
    }

    return src.pipe(gulp.dest("dist"));
}

function developmentBundle() {
    watchedBrowserify.on("update", function () { return bundle(false); });

    return bundle(false);
}

function productionBundle() {
    watchedBrowserify.on("update", function () { return bundle(true); });

    return bundle(true);
}

gulp.task("default", ["copy-html"], developmentBundle);
gulp.task("production", ["copy-html"], productionBundle);
