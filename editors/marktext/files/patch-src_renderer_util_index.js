--- src/renderer/util/index.js.orig	2020-02-24 06:28:08 UTC
+++ src/renderer/util/index.js
@@ -199,4 +199,4 @@ export const getContentHash = content => {
 
 export const isOsx = process.platform === 'darwin'
 export const isWindows = process.platform === 'win32'
-export const isLinux = process.platform === 'linux'
+export const isLinux = (process.platform === 'linux' || process.platform === 'freebsd')
