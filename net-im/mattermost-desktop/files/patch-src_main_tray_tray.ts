--- src/main/tray/tray.ts.orig	2023-06-19 18:19:05 UTC
+++ src/main/tray/tray.ts
@@ -73,7 +73,7 @@ export class TrayIcon {
 
             break;
         }
-        case 'linux':
+        case 'linux': case 'freebsd':
         {
             if (trayIconTheme === 'dark') {
                 this.images = {
