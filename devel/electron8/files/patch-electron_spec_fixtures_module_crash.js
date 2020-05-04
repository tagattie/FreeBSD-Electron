--- electron/spec/fixtures/module/crash.js.orig	2020-04-30 17:03:43 UTC
+++ electron/spec/fixtures/module/crash.js
@@ -10,7 +10,7 @@ process.crashReporter.start({
   }
 });
 
-if (process.platform !== 'linux') {
+if (process.platform !== 'linux' && process.platform !== 'freebsd') {
   process.crashReporter.addExtraParameter('newExtra', 'newExtra');
   process.crashReporter.addExtraParameter('removeExtra', 'removeExtra');
   process.crashReporter.removeExtraParameter('removeExtra');
