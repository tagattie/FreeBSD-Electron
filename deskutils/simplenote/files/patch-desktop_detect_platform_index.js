--- desktop/detect/platform/index.js.orig	2020-06-02 16:52:22 UTC
+++ desktop/detect/platform/index.js
@@ -18,7 +18,7 @@ Platform.prototype.isWindows = function () {
 };
 
 Platform.prototype.isLinux = function () {
-  return process.platform === 'linux';
+  return (process.platform === 'linux' || process.platform === 'freebsd');
 };
 
 if (!platform) {
