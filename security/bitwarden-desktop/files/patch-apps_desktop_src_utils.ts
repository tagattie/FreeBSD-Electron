--- apps/desktop/src/utils.ts.orig	2023-11-12 12:48:28 UTC
+++ apps/desktop/src/utils.ts
@@ -26,7 +26,7 @@ export function isDev() {
 }
 
 export function isLinux() {
-  return process.platform === "linux";
+  return (process.platform === "linux" || process.platform === "freebsd");
 }
 
 export function isAppImage() {
