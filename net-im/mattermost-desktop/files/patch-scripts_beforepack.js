--- scripts/beforepack.js.orig	2026-09-08 05:53:32 UTC
+++ scripts/beforepack.js
@@ -41,7 +41,7 @@ exports.default = async function beforePack(context) {
 }
 
 exports.default = async function beforePack(context) {
-    await ensureKoffiBinary(context);
+    // await ensureKoffiBinary(context);
 
     // The debian packager (fpm) complains when the directory to output the package to doesn't exist
     // So we have to manually create it first
