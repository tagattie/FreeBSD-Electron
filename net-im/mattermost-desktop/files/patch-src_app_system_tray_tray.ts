--- src/app/system/tray/tray.ts.orig	2025-11-18 22:37:05 UTC
+++ src/app/system/tray/tray.ts
@@ -71,7 +71,7 @@ export class TrayIcon {
 
             break;
         }
-        case 'linux':
+        case 'linux': case 'freebsd':
         {
             if (trayIconTheme === 'dark') {
                 this.images = {
