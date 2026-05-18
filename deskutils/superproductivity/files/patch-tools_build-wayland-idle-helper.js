--- tools/build-wayland-idle-helper.js.orig	2026-05-18 08:24:36 UTC
+++ tools/build-wayland-idle-helper.js
@@ -85,6 +85,6 @@ const buildHelper = () => {
   fs.renameSync(tempOutputPath, OUTPUT_PATH);
 };
 
-if (process.platform === 'linux') {
+if (process.platform === 'linux' || process.platform === 'freebsd') {
   buildHelper();
 }
