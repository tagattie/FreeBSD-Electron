--- electron/lib/common/api/clipboard.js.orig	2021-01-14 16:50:03 UTC
+++ electron/lib/common/api/clipboard.js
@@ -14,7 +14,7 @@ if (process.type === 'renderer') {
     };
   };
 
-  if (process.platform === 'linux') {
+  if (process.platform === 'linux' || process.platform === 'freebsd') {
     // On Linux we could not access clipboard in renderer process.
     for (const method of Object.keys(clipboard)) {
       clipboard[method] = makeRemoteMethod(method);
