--- desktop/env.js.orig	2020-02-16 09:58:42 UTC
+++ desktop/env.js
@@ -1,6 +1,5 @@
 module.exports = {
   isDev:
     process.env.NODE_ENV === 'development' ||
-    process.defaultApp ||
     /node_modules[\\/]electron[\\/]/.test(process.execPath),
 };
