--- electron/preload.ts.orig	2026-05-02 18:20:10 UTC
+++ electron/preload.ts
@@ -86,7 +86,7 @@ const ea: ElectronAPI = {
     webFrame.setZoomFactor(zoomFactor);
   },
   getZoomFactor: () => webFrame.getZoomFactor(),
-  isLinux: () => process.platform === 'linux',
+  isLinux: () => process.platform === 'linux' || process.platform === 'freebsd',
   isGnomeDesktop,
   isMacOS: () => process.platform === 'darwin',
   isSnap: () => process && process.env && !!process.env.SNAP,
