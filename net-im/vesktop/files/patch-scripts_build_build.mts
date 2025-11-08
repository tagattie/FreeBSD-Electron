--- scripts/build/build.mts.orig	2025-11-08 20:15:46 UTC
+++ scripts/build/build.mts
@@ -54,7 +54,7 @@ async function copyLibVesktop() {
 }
 
 async function copyLibVesktop() {
-    if (process.platform !== "linux") return;
+    if (process.platform !== "linux" && process.platform !== "freebsd") return;
 
     try {
         await copyFile(
