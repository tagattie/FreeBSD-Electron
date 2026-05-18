--- electron/preload.ts.orig	2026-05-16 12:26:17 UTC
+++ electron/preload.ts
@@ -91,7 +91,7 @@ const ea: ElectronAPI = {
     webFrame.setZoomFactor(zoomFactor);
   },
   getZoomFactor: () => webFrame.getZoomFactor(),
-  isLinux: () => process.platform === 'linux',
+  isLinux: () => process.platform === 'linux' || process.platform === 'freebsd',
   isGnomeDesktop,
   isMacOS: () => process.platform === 'darwin',
   isAppleSilicon: () => process.platform === 'darwin' && process.arch === 'arm64',
