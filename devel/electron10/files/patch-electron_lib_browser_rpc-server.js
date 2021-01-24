--- electron/lib/browser/rpc-server.js.orig	2021-01-14 16:50:03 UTC
+++ electron/lib/browser/rpc-server.js
@@ -44,7 +44,7 @@ const allowedClipboardMethods = (() => {
   switch (process.platform) {
     case 'darwin':
       return new Set(['readFindText', 'writeFindText']);
-    case 'linux':
+    case 'linux': case 'freebsd':
       return new Set(Object.keys(clipboard));
     default:
       return new Set();
