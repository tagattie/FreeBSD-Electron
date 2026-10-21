--- packages/desktop/src/renderer/src/util/index.ts.orig	2026-10-21 04:24:51 UTC
+++ packages/desktop/src/renderer/src/util/index.ts
@@ -193,4 +193,4 @@ export const isWindows = platform === 'win32'
   ''
 export const isMac = platform === 'darwin'
 export const isWindows = platform === 'win32'
-export const isLinux = platform === 'linux'
+export const isLinux = platform === 'linux' || platform === 'freebsd'
