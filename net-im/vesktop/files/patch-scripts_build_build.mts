--- scripts/build/build.mts.orig	2026-11-05 17:23:08 UTC
+++ scripts/build/build.mts
@@ -68,7 +68,7 @@ async function copyLibVesktop() {
 }
 
 async function copyLibVesktop() {
-    if (process.platform !== "linux") return;
+    if (process.platform !== "linux" && process.platform !== "freebsd") return;
 
     try {
         await copyFile(
