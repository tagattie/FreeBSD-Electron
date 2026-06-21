--- electron/preload.ts.orig	2026-06-20 15:17:50 UTC
+++ electron/preload.ts
@@ -89,7 +89,7 @@ const ea: ElectronAPI = {
     webFrame.setZoomFactor(zoomFactor);
   },
   getZoomFactor: () => webFrame.getZoomFactor(),
-  isLinux: () => process.platform === 'linux',
+  isLinux: () => process.platform === 'linux' || process.platform === 'freebsd',
   isGnomeDesktop: () => IS_GNOME_DESKTOP,
   isGnomeWayland: () => IS_GNOME_WAYLAND,
   isMacOS: () => process.platform === 'darwin',
