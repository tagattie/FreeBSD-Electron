--- src/updater.ts.orig	2025-09-16 12:26:45 UTC
+++ src/updater.ts
@@ -121,7 +121,7 @@ async function available(): Promise<boolean> {
  * @returns True if auto update is available
  */
 async function available(): Promise<boolean> {
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
         // Auto update is not supported on Linux
         console.warn("Auto update not supported on this platform");
         return false;
