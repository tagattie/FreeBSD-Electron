--- electron/spec/fixtures/module/crash.js.orig	2020-03-02 19:30:38 UTC
+++ electron/spec/fixtures/module/crash.js
@@ -10,7 +10,7 @@ process.crashReporter.start({
   }
 })
 
-if (process.platform !== 'linux') {
+if (process.platform !== 'linux' && process.platform !== 'freebsd') {
   process.crashReporter.addExtraParameter('newExtra', 'newExtra')
   process.crashReporter.addExtraParameter('removeExtra', 'removeExtra')
   process.crashReporter.removeExtraParameter('removeExtra')
