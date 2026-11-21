--- src/app/mainWindow/mainWindow.ts.orig	2026-11-05 06:34:20 UTC
+++ src/app/mainWindow/mainWindow.ts
@@ -173,7 +173,7 @@ export class MainWindow extends EventEmitter {
     };
 
     private shouldStartFullScreen = () => {
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             return false;
         }
 
@@ -259,7 +259,7 @@ export class MainWindow extends EventEmitter {
 
     private onFocus = () => {
         // Only add shortcuts when window is in focus
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd' ) {
             // check if KDE + windows is minimized to prevent unwanted focus event
             // that was causing an error not allowing minimization (MM-60233)
             if ((!this.win || this.win.browserWindow.isMinimized()) && isKDE()) {
@@ -306,7 +306,7 @@ export class MainWindow extends EventEmitter {
             }
             switch (process.platform) {
             case 'win32':
-            case 'linux':
+            case 'linux': case 'freebsd':
                 if (Config.minimizeToTray) {
                     if (Config.alwaysMinimize) {
                         hideWindow(this.win.browserWindow);
