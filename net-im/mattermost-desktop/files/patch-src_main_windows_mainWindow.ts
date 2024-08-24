--- src/main/windows/mainWindow.ts.orig	2024-08-02 19:12:02 UTC
+++ src/main/windows/mainWindow.ts
@@ -83,7 +83,7 @@ export class MainWindow extends EventEmitter {
             frame: !this.isFramelessWindow(),
             fullscreen: this.shouldStartFullScreen(),
             titleBarStyle: 'hidden' as const,
-            titleBarOverlay: process.platform === 'linux' ? this.getTitleBarOverlay() : false,
+            titleBarOverlay: (process.platform === 'linux' || process.platform === 'freebsd') ? this.getTitleBarOverlay() : false,
             trafficLightPosition: {x: 12, y: 12},
             backgroundColor: '#fff', // prevents blurry text: https://electronjs.org/docs/faq#the-font-looks-blurry-what-is-this-and-what-can-i-do
             webPreferences: {
@@ -94,7 +94,7 @@ export class MainWindow extends EventEmitter {
         });
         log.debug('main window options', windowOptions);
 
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             windowOptions.icon = path.join(path.resolve(app.getAppPath(), 'assets'), 'linux', 'app_icon.png');
         }
 
@@ -200,7 +200,7 @@ export class MainWindow extends EventEmitter {
         // Workaround for linux maximizing/minimizing, which doesn't work properly because of these bugs:
         // https://github.com/electron/electron/issues/28699
         // https://github.com/electron/electron/issues/28106
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             const size = this.win.getSize();
             return {...this.win.getContentBounds(), width: size[0], height: size[1]};
         }
@@ -322,7 +322,7 @@ export class MainWindow extends EventEmitter {
 
     private onFocus = () => {
         // Only add shortcuts when window is in focus
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             globalShortcut.registerAll(ALT_MENU_KEYS, () => {
                 // do nothing because we want to supress the menu popping up
             });
@@ -367,7 +367,7 @@ export class MainWindow extends EventEmitter {
             }
             switch (process.platform) {
             case 'win32':
-            case 'linux':
+            case 'linux': case 'freebsd':
                 if (Config.minimizeToTray) {
                     if (Config.alwaysMinimize) {
                         hideWindow(this.win);
@@ -560,7 +560,7 @@ export class MainWindow extends EventEmitter {
     };
 
     private handleUpdateTitleBarOverlay = () => {
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             this.win?.setTitleBarOverlay?.(this.getTitleBarOverlay());
         }
     };
