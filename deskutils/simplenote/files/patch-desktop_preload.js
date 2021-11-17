--- desktop/preload.js.orig	2021-11-17 06:31:50 UTC
+++ desktop/preload.js
@@ -60,5 +60,5 @@ contextBridge.exposeInMainWorld('electron', {
     }
   },
   isMac: process.platform === 'darwin',
-  isLinux: process.platform === 'linux',
+  isLinux: (process.platform === 'linux' || process.platform === 'freebsd'),
 });
