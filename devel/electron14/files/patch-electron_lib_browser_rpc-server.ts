--- electron/lib/browser/rpc-server.ts.orig	2021-11-08 18:41:28 UTC
+++ electron/lib/browser/rpc-server.ts
@@ -48,7 +48,7 @@ const allowedClipboardMethods = (() => {
   switch (process.platform) {
     case 'darwin':
       return new Set(['readFindText', 'writeFindText']);
-    case 'linux':
+    case 'linux': case 'freebsd':
       return new Set(Object.keys(clipboard));
     default:
       return new Set();
