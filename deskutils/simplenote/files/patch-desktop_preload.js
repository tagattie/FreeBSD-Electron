--- desktop/preload.js.orig	2024-09-13 05:17:51 UTC
+++ desktop/preload.js
@@ -60,7 +60,7 @@ const electronAPI = {
     }
   },
   isMac: process.platform === 'darwin',
-  isLinux: process.platform === 'linux',
+  isLinux: (process.platform === 'linux' || process.platform === 'freebsd'),
 };
 
 contextBridge.exposeInMainWorld('electron', electronAPI);
