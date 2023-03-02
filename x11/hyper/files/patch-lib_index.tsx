--- lib/index.tsx.orig	2023-01-07 20:46:57 UTC
+++ lib/index.tsx
@@ -22,7 +22,7 @@ import {configOptions} from './config';
 
 // On Linux, the default zoom was somehow changed with Electron 3 (or maybe 2).
 // Setting zoom factor to 1.2 brings back the normal default size
-if (process.platform === 'linux') {
+if (process.platform === 'linux' || process.platform === 'freebsd') {
   webFrame.setZoomFactor(1.2);
 }
 
