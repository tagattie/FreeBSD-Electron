--- src/main/mainWindow.js.orig	2020-02-13 05:50:06 UTC
+++ src/main/mainWindow.js
@@ -42,7 +42,7 @@ function createMainWindow(config, options) {
   const {hideOnStartup, trayIconShown} = options;
   const {maximized: windowIsMaximized} = windowOptions;
 
-  if (process.platform === 'linux') {
+  if (process.platform === 'linux' || process.platform === 'freebsd') {
     windowOptions.icon = options.linuxAppIcon;
   }
   Object.assign(windowOptions, {
@@ -132,7 +132,7 @@ function createMainWindow(config, options) {
       case 'win32':
         hideWindow(mainWindow);
         break;
-      case 'linux':
+      case 'linux': case 'freebsd':
         if (config.minimizeToTray) {
           hideWindow(mainWindow);
         } else {
