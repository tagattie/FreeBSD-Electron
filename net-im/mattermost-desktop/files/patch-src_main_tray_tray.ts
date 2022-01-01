--- src/main/tray/tray.ts.orig	2021-12-31 10:16:20 UTC
+++ src/main/tray/tray.ts
@@ -42,7 +42,7 @@ export function refreshTrayImages(trayIconTheme: strin
 
         break;
     }
-    case 'linux':
+    case 'linux': case 'freebsd':
     {
         if (trayIconTheme === 'dark') {
             trayImages = {
