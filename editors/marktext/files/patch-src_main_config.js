--- src/main/config.js.orig	2020-12-27 12:26:19 UTC
+++ src/main/config.js
@@ -1,6 +1,6 @@
 export const isOsx = process.platform === 'darwin'
 export const isWindows = process.platform === 'win32'
-export const isLinux = process.platform === 'linux'
+export const isLinux = (process.platform === 'linux' || process.platform === 'freebsd')
 
 export const editorWinOptions = Object.freeze({
   minWidth: 550,
