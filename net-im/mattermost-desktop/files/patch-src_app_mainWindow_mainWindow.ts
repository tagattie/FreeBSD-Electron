--- src/app/mainWindow/mainWindow.ts.orig	2026-08-05 10:05:33 UTC
+++ src/app/mainWindow/mainWindow.ts
@@ -165,7 +165,7 @@ export class MainWindow extends EventEmitter {
     };
 
     private shouldStartFullScreen = () => {
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             return false;
         }
 
@@ -245,7 +245,7 @@ export class MainWindow extends EventEmitter {
 
     private onFocus = () => {
         // Only add shortcuts when window is in focus
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd' ) {
             // check if KDE + windows is minimized to prevent unwanted focus event
             // that was causing an error not allowing minimization (MM-60233)
             if ((!this.win || this.win.browserWindow.isMinimized()) && isKDE()) {
@@ -291,7 +291,7 @@ export class MainWindow extends EventEmitter {
             }
             switch (process.platform) {
             case 'win32':
-            case 'linux':
+            case 'linux': case 'freebsd':
                 if (Config.minimizeToTray) {
                     if (Config.alwaysMinimize) {
                         hideWindow(this.win.browserWindow);
