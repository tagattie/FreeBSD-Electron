--- scripts/build/build.mts.orig	2026-11-19 18:38:38 UTC
+++ scripts/build/build.mts
@@ -104,7 +104,7 @@ async function copyLibVesktop() {
 }
 
 async function copyLibVesktop() {
-    if (process.platform !== "linux") return;
+    if (process.platform !== "linux" && process.platform !== "freebsd") return;
 
     try {
         await copyNativeModule(
