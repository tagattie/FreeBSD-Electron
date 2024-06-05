--- src/main/tray/tray.ts.orig	2024-05-16 20:45:52 UTC
+++ src/main/tray/tray.ts
@@ -71,7 +71,7 @@ export class TrayIcon {
 
             break;
         }
-        case 'linux':
+        case 'linux': case 'freebsd':
         {
             if (trayIconTheme === 'dark') {
                 this.images = {
