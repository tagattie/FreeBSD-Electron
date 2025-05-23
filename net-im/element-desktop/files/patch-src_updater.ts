--- src/updater.ts.orig	2025-05-23 12:28:50 UTC
+++ src/updater.ts
@@ -112,7 +112,7 @@ async function available(updateBaseUrl?: string): Prom
 }
 
 async function available(updateBaseUrl?: string): Promise<boolean> {
-    if (process.platform === "linux") {
+    if (process.platform === "linux" || process.platform === "freebsd") {
         // Auto update is not supported on Linux
         console.log("Auto update not supported on this platform");
         return false;
