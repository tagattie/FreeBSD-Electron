--- src/main/windows/mainWindow.ts.orig	2022-12-06 14:05:15 UTC
+++ src/main/windows/mainWindow.ts
@@ -96,7 +96,7 @@ function createMainWindow(options: {linuxAppIcon: stri
         },
     });
 
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
         windowOptions.icon = options.linuxAppIcon;
     }
 
@@ -151,7 +151,7 @@ function createMainWindow(options: {linuxAppIcon: stri
             }
             switch (process.platform) {
             case 'win32':
-            case 'linux':
+            case 'linux': case 'freebsd':
                 if (Config.minimizeToTray) {
                     if (Config.alwaysMinimize) {
                         hideWindow(mainWindow);
@@ -222,7 +222,7 @@ function createMainWindow(options: {linuxAppIcon: stri
 
     // Only add shortcuts when window is in focus
     mainWindow.on('focus', () => {
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             globalShortcut.registerAll(['Alt+F', 'Alt+E', 'Alt+V', 'Alt+H', 'Alt+W', 'Alt+P'], () => {
                 // do nothing because we want to supress the menu popping up
             });
