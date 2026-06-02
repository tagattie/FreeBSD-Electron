--- apps/desktop/src/updater.ts.orig	2026-05-27 13:46:37 UTC
+++ apps/desktop/src/updater.ts
@@ -122,7 +122,7 @@ async function available(): Promise<boolean> {
  * @returns True if auto update is available
  */
 async function available(): Promise<boolean> {
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
         // Auto update is not supported on Linux
         console.warn("Auto update not supported on this platform");
         return false;
