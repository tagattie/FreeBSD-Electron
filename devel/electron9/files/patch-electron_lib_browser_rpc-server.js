--- electron/lib/browser/rpc-server.js.orig	2020-05-18 21:17:08 UTC
+++ electron/lib/browser/rpc-server.js
@@ -45,7 +45,7 @@ const allowedClipboardMethods = (() => {
   switch (process.platform) {
     case 'darwin':
       return new Set(['readFindText', 'writeFindText']);
-    case 'linux':
+    case 'linux': case 'freebsd':
       return new Set(Object.keys(clipboard));
     default:
       return new Set();
