--- src/common/config/defaultPreferences.ts.orig	2024-12-16 19:52:04 UTC
+++ src/common/config/defaultPreferences.ts
@@ -22,7 +22,7 @@ export const getDefaultDownloadLocation = (): string |
         return undefined;
     }
 
-    if (process.platform === 'linux' && process.env.XDG_DOWNLOAD_DIR) {
+    if ((process.platform === 'linux' || process.platform === 'freebsd') && process.env.XDG_DOWNLOAD_DIR) {
         return process.env.XDG_DOWNLOAD_DIR;
     }
 
@@ -34,9 +34,9 @@ const defaultPreferences: ConfigV3 = {
     teams: [],
     showTrayIcon: true,
     trayIconTheme: 'use_system',
-    minimizeToTray: process.platform !== 'linux',
+    minimizeToTray: (process.platform !== 'linux' && process.platform !== 'freebsd'),
     notifications: {
-        flashWindow: process.platform === 'linux' ? 0 : 2,
+        flashWindow: (process.platform === 'linux' || process.platform === 'freebsd') ? 0 : 2,
         bounceIcon: true,
         bounceIconType: 'informational',
     },
