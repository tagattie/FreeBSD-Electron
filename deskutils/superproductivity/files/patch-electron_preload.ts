--- electron/preload.ts.orig	2026-10-11 07:51:03 UTC
+++ electron/preload.ts
@@ -90,7 +90,7 @@ const ea: ElectronAPI = {
     webFrame.setZoomFactor(zoomFactor);
   },
   getZoomFactor: () => webFrame.getZoomFactor(),
-  isLinux: () => process.platform === 'linux',
+  isLinux: () => process.platform === 'linux' || process.platform === 'freebsd',
   isGnomeDesktop: () => IS_GNOME_DESKTOP,
   isGnomeWayland: () => IS_GNOME_WAYLAND,
   isMacOS: () => process.platform === 'darwin',
