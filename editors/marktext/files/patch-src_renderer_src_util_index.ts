--- src/renderer/src/util/index.ts.orig	2026-05-29 12:08:08 UTC
+++ src/renderer/src/util/index.ts
@@ -210,4 +210,4 @@ export const isWindows = platform === 'win32'
   ''
 export const isOsx = platform === 'darwin'
 export const isWindows = platform === 'win32'
-export const isLinux = platform === 'linux'
+export const isLinux = (platform === 'linux' || platform === 'freebsd')
