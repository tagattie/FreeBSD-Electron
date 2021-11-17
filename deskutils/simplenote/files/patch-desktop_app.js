--- desktop/app.js.orig	2021-11-17 06:30:58 UTC
+++ desktop/app.js
@@ -38,7 +38,7 @@ module.exports = function main() {
   });
 
   // Fixes rendering bug on Linux when sandbox === true (Electron 11.0)
-  if (process.platform === 'linux') {
+  if (process.platform === 'linux' || process.platform === 'freebsd') {
     app.disableHardwareAcceleration();
   }
 
