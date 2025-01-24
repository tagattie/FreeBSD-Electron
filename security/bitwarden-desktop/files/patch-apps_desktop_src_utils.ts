--- apps/desktop/src/utils.ts.orig	2025-01-23 11:12:57 UTC
+++ apps/desktop/src/utils.ts
@@ -28,7 +28,7 @@ export function isLinux() {
 }
 
 export function isLinux() {
-  return process.platform === "linux";
+  return (process.platform === "linux" || process.platform === "freebsd");
 }
 
 export function isAppImage() {
