--- electron/preload.ts.orig	2026-10-23 18:21:52 UTC
+++ electron/preload.ts
@@ -96,7 +96,7 @@ const ea: ElectronAPI = {
     webFrame.setZoomFactor(zoomFactor);
   },
   getZoomFactor: () => webFrame.getZoomFactor(),
-  isLinux: () => process.platform === 'linux',
+  isLinux: () => process.platform === 'linux' || process.platform === 'freebsd',
   isGnomeDesktop: () => IS_GNOME_DESKTOP,
   isGnomeWayland: () => IS_GNOME_WAYLAND,
   isMacOS: () => process.platform === 'darwin',
