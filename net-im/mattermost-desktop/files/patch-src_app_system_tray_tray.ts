--- src/app/system/tray/tray.ts.orig	2025-12-10 14:05:35 UTC
+++ src/app/system/tray/tray.ts
@@ -74,7 +74,7 @@ export class TrayIcon {
 
             break;
         }
-        case 'linux':
+        case 'linux': case 'freebsd':
         {
             if (trayIconTheme === 'dark') {
                 this.images = {
