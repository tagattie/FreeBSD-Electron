--- apps/desktop/src/utils.ts.orig	2025-09-09 17:14:14 UTC
+++ apps/desktop/src/utils.ts
@@ -24,7 +24,7 @@ export function isLinux() {
 }
 
 export function isLinux() {
-  return process.platform === "linux";
+  return (process.platform === "linux" || process.platform === "freebsd");
 }
 
 export function isAppImage() {
