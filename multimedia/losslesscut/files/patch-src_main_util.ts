--- src/main/util.ts.orig	2026-01-29 16:07:12 UTC
+++ src/main/util.ts
@@ -6,7 +6,7 @@ export const isMac = platform === 'darwin';
 
 export const isWindows = platform === 'win32';
 export const isMac = platform === 'darwin';
-export const isLinux = platform === 'linux';
+export const isLinux = (platform === 'linux' || platform === 'freebsd');
 
 export async function pathExists(path: string) {
   try {
