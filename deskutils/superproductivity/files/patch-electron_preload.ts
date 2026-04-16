--- electron/preload.ts.orig	2026-04-01 19:27:44 UTC
+++ electron/preload.ts
@@ -67,7 +67,7 @@ const ea: ElectronAPI = {
     webFrame.setZoomFactor(zoomFactor);
   },
   getZoomFactor: () => webFrame.getZoomFactor(),
-  isLinux: () => process.platform === 'linux',
+  isLinux: () => process.platform === 'linux' || process.platform === 'freebsd',
   isMacOS: () => process.platform === 'darwin',
   isSnap: () => process && process.env && !!process.env.SNAP,
   isFlatpak: () => process && process.env && !!process.env.FLATPAK_ID,
