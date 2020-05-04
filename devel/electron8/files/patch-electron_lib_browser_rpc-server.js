--- electron/lib/browser/rpc-server.js.orig	2020-04-30 17:03:43 UTC
+++ electron/lib/browser/rpc-server.js
@@ -50,7 +50,7 @@ const allowedClipboardMethods = (() => {
   switch (process.platform) {
     case 'darwin':
       return new Set(['readFindText', 'writeFindText']);
-    case 'linux':
+    case 'linux': case 'freebsd':
       return new Set(Object.keys(clipboard));
     default:
       return new Set();
