--- packages/desktop/src/renderer/src/util/index.ts.orig	2026-10-11 11:54:43 UTC
+++ packages/desktop/src/renderer/src/util/index.ts
@@ -210,4 +210,4 @@ export const isWindows = platform === 'win32'
   ''
 export const isMac = platform === 'darwin'
 export const isWindows = platform === 'win32'
-export const isLinux = platform === 'linux'
+export const isLinux = platform === 'linux' || platform === 'freebsd'
