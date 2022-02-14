--- jslib/electron/src/utils.ts.orig	2022-02-11 20:26:02 UTC
+++ jslib/electron/src/utils.ts
@@ -22,7 +22,7 @@ export function isDev() {
   if ("ELECTRON_IS_DEV" in process.env) {
     return parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
   }
-  return process.defaultApp || /node_modules[\\/]electron[\\/]/.test(process.execPath);
+  return /node_modules[\\/]electron[\\/]/.test(process.execPath);
 }
 
 export function isAppImage() {
