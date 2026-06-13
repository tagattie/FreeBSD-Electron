--- electron/preload.ts.orig	2026-06-12 11:11:09 UTC
+++ electron/preload.ts
@@ -107,7 +107,7 @@ const ea: ElectronAPI = {
     webFrame.setZoomFactor(zoomFactor);
   },
   getZoomFactor: () => webFrame.getZoomFactor(),
-  isLinux: () => process.platform === 'linux',
+  isLinux: () => process.platform === 'linux' || process.platform === 'freebsd',
   isGnomeDesktop,
   isMacOS: () => process.platform === 'darwin',
   isAppleSilicon: () => process.platform === 'darwin' && process.arch === 'arm64',
