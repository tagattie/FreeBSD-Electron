--- jslib/src/electron/utils.ts.orig	2021-03-21 10:55:56 UTC
+++ jslib/src/electron/utils.ts
@@ -3,7 +3,7 @@ export function isDev() {
     if ('ELECTRON_IS_DEV' in process.env) {
         return parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
     }
-    return (process.defaultApp || /node_modules[\\/]electron[\\/]/.test(process.execPath));
+    return /node_modules[\\/]electron[\\/]/.test(process.execPath);
 }
 
 export function isAppImage() {
