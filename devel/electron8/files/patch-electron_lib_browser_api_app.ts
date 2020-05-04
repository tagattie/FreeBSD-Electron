--- electron/lib/browser/api/app.ts.orig	2020-04-30 17:03:43 UTC
+++ electron/lib/browser/api/app.ts
@@ -67,7 +67,7 @@ if (process.platform === 'darwin') {
   app.dock!.getMenu = () => dockMenu;
 }
 
-if (process.platform === 'linux') {
+if (process.platform === 'linux' || process.platform === 'freebsd') {
   const patternVmRSS = /^VmRSS:\s*(\d+) kB$/m;
   const patternVmHWM = /^VmHWM:\s*(\d+) kB$/m;
 
