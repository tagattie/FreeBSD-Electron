--- src/main/windows/mainWindow.ts.orig	2024-05-16 20:45:52 UTC
+++ src/main/windows/mainWindow.ts
@@ -90,7 +90,7 @@ export class MainWindow extends EventEmitter {
             },
         });
 
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             windowOptions.icon = path.join(path.resolve(app.getAppPath(), 'assets'), 'linux', 'app_icon.png');
         }
 
@@ -137,7 +137,7 @@ export class MainWindow extends EventEmitter {
             // This is mostly a fix for Windows 11 snapping
             this.win.on('moved', this.onResized);
         }
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             this.win.on('resize', this.onResize);
         }
         this.win.webContents.on('before-input-event', this.onBeforeInputEvent);
@@ -196,7 +196,7 @@ export class MainWindow extends EventEmitter {
         // Workaround for linux maximizing/minimizing, which doesn't work properly because of these bugs:
         // https://github.com/electron/electron/issues/28699
         // https://github.com/electron/electron/issues/28106
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             const size = this.win.getSize();
             return {...this.win.getContentBounds(), width: size[0], height: size[1]};
         }
@@ -297,7 +297,7 @@ export class MainWindow extends EventEmitter {
 
     private onFocus = () => {
         // Only add shortcuts when window is in focus
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             globalShortcut.registerAll(ALT_MENU_KEYS, () => {
                 // do nothing because we want to supress the menu popping up
             });
@@ -342,7 +342,7 @@ export class MainWindow extends EventEmitter {
             }
             switch (process.platform) {
             case 'win32':
-            case 'linux':
+            case 'linux': case 'freebsd':
                 if (Config.minimizeToTray) {
                     if (Config.alwaysMinimize) {
                         hideWindow(this.win);
