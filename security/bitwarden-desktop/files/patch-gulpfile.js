--- gulpfile.js.orig	2020-03-13 12:46:07 UTC
+++ gulpfile.js
@@ -32,4 +32,4 @@ function cleanupAotIssue() {
 exports.clean = clean;
 exports.cleanupAotIssue = cleanupAotIssue;
 exports.webfonts = gulp.series(clean, webfonts);
-exports['prebuild:renderer'] = gulp.parallel(webfonts, cleanupAotIssue);
\ No newline at end of file
+exports['prebuild:renderer'] = cleanupAotIssue;
