var gulp = require("gulp");
var concat = require("gulp-concat");

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


gulp.task("watch", function() {
	gulp.watch("app/src/**/*.js", ["concat-js", "concat-css"]);
});

gulp.task("default", ["concat-js", "concat-css"]);