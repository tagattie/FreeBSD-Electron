--- electron/lib/browser/api/app.ts.orig	2021-01-14 16:50:03 UTC
+++ electron/lib/browser/api/app.ts
@@ -90,7 +90,7 @@ if (process.platform === 'darwin') {
   app.dock!.getMenu = () => dockMenu;
 }
 
-if (process.platform === 'linux') {
+if (process.platform === 'linux' || process.platform === 'freebsd') {
   const patternVmRSS = /^VmRSS:\s*(\d+) kB$/m;
   const patternVmHWM = /^VmHWM:\s*(\d+) kB$/m;
 
