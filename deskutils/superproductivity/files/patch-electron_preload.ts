--- electron/preload.ts.orig	2025-11-14 14:43:39 UTC
+++ electron/preload.ts
@@ -56,7 +56,7 @@ const ea: ElectronAPI = {
     webFrame.setZoomFactor(zoomFactor);
   },
   getZoomFactor: () => webFrame.getZoomFactor(),
-  isLinux: () => process.platform === 'linux',
+  isLinux: () => process.platform === 'linux' || process.platform === 'freebsd',
   isMacOS: () => process.platform === 'darwin',
   isSnap: () => process && process.env && !!process.env.SNAP,
 
