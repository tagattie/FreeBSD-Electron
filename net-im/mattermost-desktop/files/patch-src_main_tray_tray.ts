--- src/main/tray/tray.ts.orig	2022-12-06 14:05:15 UTC
+++ src/main/tray/tray.ts
@@ -47,7 +47,7 @@ export function refreshTrayImages(trayIconTheme: strin
 
         break;
     }
-    case 'linux':
+    case 'linux': case 'freebsd':
     {
         if (trayIconTheme === 'dark') {
             trayImages = {
