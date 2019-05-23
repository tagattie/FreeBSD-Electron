--- electron/lib/browser/api/app.js.orig	2019-05-23 04:01:37 UTC
+++ electron/lib/browser/api/app.js
@@ -96,7 +96,7 @@ if (process.platform === 'darwin') {
   }
 }
 
-if (process.platform === 'linux') {
+if (process.platform === 'linux' || process.platform === 'freebsd') {
   app.launcher = {
     setBadgeCount: bindings.unityLauncherSetBadgeCount,
     getBadgeCount: bindings.unityLauncherGetBadgeCount,
