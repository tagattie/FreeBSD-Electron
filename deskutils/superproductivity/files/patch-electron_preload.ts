--- electron/preload.ts.orig	2026-02-06 19:11:32 UTC
+++ electron/preload.ts
@@ -68,7 +68,7 @@ const ea: ElectronAPI = {
     webFrame.setZoomFactor(zoomFactor);
   },
   getZoomFactor: () => webFrame.getZoomFactor(),
-  isLinux: () => process.platform === 'linux',
+  isLinux: () => process.platform === 'linux' || process.platform === 'freebsd',
   isMacOS: () => process.platform === 'darwin',
   isSnap: () => process && process.env && !!process.env.SNAP,
   isFlatpak: () => process && process.env && !!process.env.FLATPAK_ID,
