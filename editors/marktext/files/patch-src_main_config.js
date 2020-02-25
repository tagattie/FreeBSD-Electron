--- src/main/config.js.orig	2020-02-24 06:27:20 UTC
+++ src/main/config.js
@@ -1,6 +1,6 @@
 export const isOsx = process.platform === 'darwin'
 export const isWindows = process.platform === 'win32'
-export const isLinux = process.platform === 'linux'
+export const isLinux = (process.platform === 'linux' || process.platform === 'freebsd')
 
 export const editorWinOptions = {
   minWidth: 450,
