--- electron/helpers/utils.js.orig	2024-03-23 06:14:52 UTC
+++ electron/helpers/utils.js
@@ -53,7 +53,7 @@ export const isLinux = (
 )
 
 export const isLinux = (
-  process.platform === 'linux'
+  (process.platform === 'linux' || process.platform === 'freebsd')
 )
 
 export const isWindows = (
