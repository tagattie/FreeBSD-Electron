--- apps/desktop/src/utils.ts.orig	2024-03-06 20:31:11 UTC
+++ apps/desktop/src/utils.ts
@@ -26,7 +26,7 @@ export function isLinux() {
 }
 
 export function isLinux() {
-  return process.platform === "linux";
+  return (process.platform === "linux" || process.platform === "freebsd");
 }
 
 export function isAppImage() {
