--- src/renderer/util/index.js.orig	2020-12-27 12:26:19 UTC
+++ src/renderer/util/index.js
@@ -210,4 +210,4 @@ export const cloneObj = (obj, deepCopy = true) => {
 
 export const isOsx = process.platform === 'darwin'
 export const isWindows = process.platform === 'win32'
-export const isLinux = process.platform === 'linux'
+export const isLinux = (process.platform === 'linux' || process.platform === 'freebsd')
