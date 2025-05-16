--- src/main/windows/mainWindow.ts.orig	2025-05-05 17:51:50 UTC
+++ src/main/windows/mainWindow.ts
@@ -70,7 +70,7 @@ export class MainWindow extends EventEmitter {
 
         const windowOptions: BrowserWindowConstructorOptions = Object.assign({}, this.savedWindowState, {
             title: app.name,
-            fullscreenable: process.platform !== 'linux',
+            fullscreenable: (process.platform !== 'linux' && process.platform !== 'freebsd'),
             show: false, // don't start the window until it is ready and only if it isn't hidden
             paintWhenInitiallyHidden: true, // we want it to start painting to get info from the webapp
             minWidth: MINIMUM_WINDOW_WIDTH,
@@ -89,7 +89,7 @@ export class MainWindow extends EventEmitter {
         });
         log.debug('main window options', windowOptions);
 
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             windowOptions.icon = path.join(path.resolve(app.getAppPath(), 'assets'), 'linux', 'app_icon.png');
         }
 
@@ -184,7 +184,7 @@ export class MainWindow extends EventEmitter {
         // Workaround for linux maximizing/minimizing, which doesn't work properly because of these bugs:
         // https://github.com/electron/electron/issues/28699
         // https://github.com/electron/electron/issues/28106
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             const size = this.win.getSize();
             return {...this.win.getContentBounds(), width: size[0], height: size[1]};
         }
@@ -219,7 +219,7 @@ export class MainWindow extends EventEmitter {
     };
 
     private shouldStartFullScreen = () => {
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             return false;
         }
 
@@ -311,7 +311,7 @@ export class MainWindow extends EventEmitter {
 
     private onFocus = () => {
         // Only add shortcuts when window is in focus
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             globalShortcut.registerAll(ALT_MENU_KEYS, () => {
                 // do nothing because we want to supress the menu popping up
             });
@@ -362,7 +362,7 @@ export class MainWindow extends EventEmitter {
             }
             switch (process.platform) {
             case 'win32':
-            case 'linux':
+            case 'linux': case 'freebsd':
                 if (Config.minimizeToTray) {
                     if (Config.alwaysMinimize) {
                         hideWindow(this.win);
@@ -477,7 +477,7 @@ export class MainWindow extends EventEmitter {
     };
 
     private handleUpdateTitleBarOverlay = () => {
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             this.win?.setTitleBarOverlay?.(this.getTitleBarOverlay());
         }
     };
