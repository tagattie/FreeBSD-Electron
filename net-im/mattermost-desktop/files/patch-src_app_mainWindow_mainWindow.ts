--- src/app/mainWindow/mainWindow.ts.orig	2025-11-18 22:07:00 UTC
+++ src/app/mainWindow/mainWindow.ts
@@ -162,7 +162,7 @@ export class MainWindow extends EventEmitter {
     };
 
     private shouldStartFullScreen = () => {
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             return false;
         }
 
@@ -242,7 +242,7 @@ export class MainWindow extends EventEmitter {
 
     private onFocus = () => {
         // Only add shortcuts when window is in focus
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd' ) {
             // check if KDE + windows is minimized to prevent unwanted focus event
             // that was causing an error not allowing minimization (MM-60233)
             if ((!this.win || this.win.browserWindow.isMinimized()) && isKDE()) {
@@ -288,7 +288,7 @@ export class MainWindow extends EventEmitter {
             }
             switch (process.platform) {
             case 'win32':
-            case 'linux':
+            case 'linux': case 'freebsd':
                 if (Config.minimizeToTray) {
                     if (Config.alwaysMinimize) {
                         hideWindow(this.win.browserWindow);
