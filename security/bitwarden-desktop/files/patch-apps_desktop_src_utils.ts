--- apps/desktop/src/utils.ts.orig	2026-07-15 09:46:59 UTC
+++ apps/desktop/src/utils.ts
@@ -5,7 +5,7 @@ export function isLinux() {
 }
 
 export function isLinux() {
-  return process.platform === "linux";
+  return (process.platform === "linux" || process.platform === "freebsd");
 }
 
 export function isAppImage() {
