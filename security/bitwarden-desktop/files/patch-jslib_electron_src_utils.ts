--- jslib/electron/src/utils.ts.orig	2021-11-25 07:25:12 UTC
+++ jslib/electron/src/utils.ts
@@ -18,7 +18,7 @@ export function isDev() {
     if ('ELECTRON_IS_DEV' in process.env) {
         return parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
     }
-    return (process.defaultApp || /node_modules[\\/]electron[\\/]/.test(process.execPath));
+    return /node_modules[\\/]electron[\\/]/.test(process.execPath);
 }
 
 export function isAppImage() {
