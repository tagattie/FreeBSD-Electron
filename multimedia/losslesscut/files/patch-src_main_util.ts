--- src/main/util.ts.orig	2024-06-26 19:24:18 UTC
+++ src/main/util.ts
@@ -5,4 +5,4 @@ export const isMac = platform === 'darwin';
 
 export const isWindows = platform === 'win32';
 export const isMac = platform === 'darwin';
-export const isLinux = platform === 'linux';
+export const isLinux = (platform === 'linux' || platform === 'freebsd');
