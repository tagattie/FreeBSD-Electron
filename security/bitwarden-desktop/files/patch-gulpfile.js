--- gulpfile.js.orig	2020-01-11 12:13:05 UTC
+++ gulpfile.js
@@ -132,7 +132,7 @@ function stdOutProc(proc) {
 exports.clean = clean;
 exports.cleanupAotIssue = cleanupAotIssue;
 exports.webfonts = gulp.series(clean, webfonts);
-exports['prebuild:renderer'] = gulp.parallel(webfonts, cleanupAotIssue);
+exports['prebuild:renderer'] = cleanupAotIssue;
 exports.fixSweetAlert = fixSweetAlert;
 exports.pkgMas = pkgMas;
 exports.signMas = signMas;
