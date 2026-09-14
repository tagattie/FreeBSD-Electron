--- electron/preload.ts.orig	2026-09-12 10:08:04 UTC
+++ electron/preload.ts
@@ -92,7 +92,7 @@ const ea: ElectronAPI = {
     webFrame.setZoomFactor(zoomFactor);
   },
   getZoomFactor: () => webFrame.getZoomFactor(),
-  isLinux: () => process.platform === 'linux',
+  isLinux: () => process.platform === 'linux' || process.platform === 'freebsd',
   isGnomeDesktop: () => IS_GNOME_DESKTOP,
   isGnomeWayland: () => IS_GNOME_WAYLAND,
   isMacOS: () => process.platform === 'darwin',
