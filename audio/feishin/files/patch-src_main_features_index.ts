--- src/main/features/index.ts.orig	2026-07-19 13:12:22 UTC
+++ src/main/features/index.ts
@@ -1,6 +1,6 @@ import './core';
 import './core';
 
-if (process.platform === 'linux') {
+if (process.platform === 'linux' || process.platform === 'freebsd') {
     import('./linux');
 } else if (process.platform === 'darwin') {
     import('./darwin');
