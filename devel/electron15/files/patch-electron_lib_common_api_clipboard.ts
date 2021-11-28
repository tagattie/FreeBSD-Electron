--- electron/lib/common/api/clipboard.ts.orig	2021-11-08 18:41:28 UTC
+++ electron/lib/common/api/clipboard.ts
@@ -17,7 +17,7 @@ if (process.type === 'renderer') {
     };
   };
 
-  if (process.platform === 'linux') {
+  if (process.platform === 'linux' || process.platform === 'freebsd') {
     // On Linux we could not access clipboard in renderer process.
     for (const method of Object.keys(clipboard) as (keyof Electron.Clipboard)[]) {
       clipboard[method] = makeRemoteMethod(method);
