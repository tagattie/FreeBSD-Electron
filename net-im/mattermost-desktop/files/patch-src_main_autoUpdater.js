--- src/main/autoUpdater.js.orig	2020-02-13 05:49:23 UTC
+++ src/main/autoUpdater.js
@@ -40,7 +40,7 @@ function createUpdaterModal(parentWindow, options) {
     resizable: false,
     autoHideMenuBar: true,
   };
-  if (process.platform === 'linux') {
+  if (process.platform === 'linux' || process.platform === 'freebsd') {
     windowOptions.icon = options.linuxAppIcon;
   }
 
