--- src/common/config/defaultPreferences.ts.orig	2023-03-03 01:47:42 UTC
+++ src/common/config/defaultPreferences.ts
@@ -27,9 +27,9 @@ const defaultPreferences: ConfigV3 = {
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
