--- src/main/windows/mainWindow.ts.orig	2021-12-31 10:07:23 UTC
+++ src/main/windows/mainWindow.ts
@@ -88,7 +88,7 @@ function createMainWindow(config: CombinedConfig, opti
         },
     });
 
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
         windowOptions.icon = options.linuxAppIcon;
     }
 
@@ -145,7 +145,7 @@ function createMainWindow(config: CombinedConfig, opti
             case 'win32':
                 hideWindow(mainWindow);
                 break;
-            case 'linux':
+            case 'linux': case 'freebsd':
                 if (config.minimizeToTray) {
                     hideWindow(mainWindow);
                 } else {
@@ -185,7 +185,7 @@ function createMainWindow(config: CombinedConfig, opti
 
     // Only add shortcuts when window is in focus
     mainWindow.on('focus', () => {
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             globalShortcut.registerAll(['Alt+F', 'Alt+E', 'Alt+V', 'Alt+H', 'Alt+W', 'Alt+P'], () => {
                 // do nothing because we want to supress the menu popping up
             });
