--- lib/index.tsx.orig	2025-08-31 08:00:06 UTC
+++ lib/index.tsx
@@ -23,7 +23,7 @@ import * as plugins from './utils/plugins';
 
 // On Linux, the default zoom was somehow changed with Electron 3 (or maybe 2).
 // Setting zoom factor to 1.2 brings back the normal default size
-if (process.platform === 'linux') {
+if (process.platform === 'linux' || process.platform === 'freebsd') {
   webFrame.setZoomFactor(1.2);
 }
 
