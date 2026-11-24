--- electron/preload.ts.orig	2026-11-21 14:24:51 UTC
+++ electron/preload.ts
@@ -102,7 +102,7 @@ const ea: ElectronAPI = {
     webFrame.setZoomFactor(zoomFactor);
   },
   getZoomFactor: () => webFrame.getZoomFactor(),
-  isLinux: () => process.platform === 'linux',
+  isLinux: () => process.platform === 'linux' || process.platform === 'freebsd',
   isGnomeDesktop: () => IS_GNOME_DESKTOP,
   isGnomeWayland: () => IS_GNOME_WAYLAND,
   isMacOS: () => process.platform === 'darwin',
