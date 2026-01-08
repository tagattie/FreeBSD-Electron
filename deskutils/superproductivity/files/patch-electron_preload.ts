--- electron/preload.ts.orig	2026-01-04 16:27:04 UTC
+++ electron/preload.ts
@@ -56,7 +56,7 @@ const ea: ElectronAPI = {
     webFrame.setZoomFactor(zoomFactor);
   },
   getZoomFactor: () => webFrame.getZoomFactor(),
-  isLinux: () => process.platform === 'linux',
+  isLinux: () => process.platform === 'linux' || process.platform === 'freebsd',
   isMacOS: () => process.platform === 'darwin',
   isSnap: () => process && process.env && !!process.env.SNAP,
   isFlatpak: () => process && process.env && !!process.env.FLATPAK_ID,
