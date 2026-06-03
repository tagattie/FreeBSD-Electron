--- lib/index.tsx.orig	2026-05-29 05:26:48 UTC
+++ lib/index.tsx
@@ -25,7 +25,7 @@ console.log('[renderer] index.tsx starting, platform:'
 
 // On Linux, the default zoom was somehow changed with Electron 3 (or maybe 2).
 // Setting zoom factor to 1.2 brings back the normal default size
-if (process.platform === 'linux') {
+if (process.platform === 'linux' || process.platform === 'freebsd') {
   webFrame.setZoomFactor(1.2);
 }
 
