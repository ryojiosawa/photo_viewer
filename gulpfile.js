var gulp = require("gulp");
var concat = require("gulp-concat");
var del = require("del");

gulp.task("concat-js", function() {
	return gulp.src("app/src/**/*.js")
		.pipe(concat("app.js"))
		.pipe(gulp.dest("public/js"));
});

gulp.task("concat-css", function() {
	return gulp.src("app/styles/**/*.css")
		.pipe(concat("app.css"))
		.pipe(gulp.dest("public/styles"));
});

gulp.task("build", ["concat-js", "concat-css"]);

gulp.task("clean", function() {
	return del([
		"public/js",
		"public/styles"
	]);
});

gulp.task("watch", function() {
	gulp.watch("app/src/**/*.js", ["build"]);
});

gulp.task("default", ["clean", "build"]);