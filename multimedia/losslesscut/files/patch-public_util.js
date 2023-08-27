--- public/util.js.orig	2023-08-27 12:02:19 UTC
+++ public/util.js
@@ -8,7 +8,7 @@ const arch = os.arch();
 // todo dedupe between renderer and main
 const isWindows = platform === 'win32';
 const isMac = platform === 'darwin';
-const isLinux = platform === 'linux';
+const isLinux = (platform === 'linux' || platform === 'freebsd');
 
 module.exports = {
   frontendBuildDir,
