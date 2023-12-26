--- apps/desktop/src/utils.ts.orig	2023-12-21 15:05:46 UTC
+++ apps/desktop/src/utils.ts
@@ -24,7 +24,7 @@ export function isLinux() {
 }
 
 export function isLinux() {
-  return process.platform === "linux";
+  return (process.platform === "linux" || process.platform === "freebsd");
 }
 
 export function isAppImage() {
