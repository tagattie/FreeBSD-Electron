--- src/common/config/pastDefaultPreferences.ts.orig	2025-11-18 22:14:15 UTC
+++ src/common/config/pastDefaultPreferences.ts
@@ -50,9 +50,9 @@ const pastDefaultPreferences = {
         teams: [],
         showTrayIcon: true,
         trayIconTheme: 'use_system',
-        minimizeToTray: process.platform !== 'linux',
+        minimizeToTray: (process.platform !== 'linux' && process.platform !== 'freebsd'),
         notifications: {
-            flashWindow: process.platform === 'linux' ? 0 : 2,
+            flashWindow: (process.platform === 'linux' || process.platform === 'freebsd') ? 0 : 2,
             bounceIcon: true,
             bounceIconType: 'informational',
         },
