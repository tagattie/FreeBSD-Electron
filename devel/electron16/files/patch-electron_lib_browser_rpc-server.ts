--- electron/lib/browser/rpc-server.ts.orig	2021-12-03 01:46:05 UTC
+++ electron/lib/browser/rpc-server.ts
@@ -47,7 +47,7 @@ const allowedClipboardMethods = (() => {
   switch (process.platform) {
     case 'darwin':
       return new Set(['readFindText', 'writeFindText']);
-    case 'linux':
+    case 'linux': case 'freebsd':
       return new Set(Object.keys(clipboard));
     default:
       return new Set();
