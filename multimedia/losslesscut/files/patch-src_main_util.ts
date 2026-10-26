--- src/main/util.ts.orig	2026-10-19 12:17:39 UTC
+++ src/main/util.ts
@@ -11,7 +11,7 @@ export const isMac = platform === 'darwin';
 
 export const isWindows = platform === 'win32';
 export const isMac = platform === 'darwin';
-export const isLinux = platform === 'linux';
+export const isLinux = (platform === 'linux' || platform === 'freebsd');
 
 export async function pathExists(path: string) {
   try {
