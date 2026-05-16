--- src/app/windows/baseWindow.ts.orig	2026-05-05 05:14:08 UTC
+++ src/app/windows/baseWindow.ts
@@ -37,9 +37,9 @@ export default class BaseWindow {
         this.ready = false;
         this.altPressStatus = false;
 
-        const useNativeTitleBar = process.platform === 'linux' && Config.useNativeTitleBar;
+        const useNativeTitleBar = (process.platform === 'linux' || process.platform === 'freebsd') && Config.useNativeTitleBar;
         const windowOptions: BrowserWindowConstructorOptions = Object.assign({}, {
-            fullscreenable: process.platform !== 'linux',
+            fullscreenable: (process.platform !== 'linux' && process.platform !== 'freebsd'),
             show: false, // don't start the window until it is ready and only if it isn't hidden
             paintWhenInitiallyHidden: true, // we want it to start painting to get info from the webapp
             minWidth: MINIMUM_WINDOW_WIDTH,
@@ -59,7 +59,7 @@ export default class BaseWindow {
         }, options);
         log.debug('main window options', {windowOptions});
 
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             windowOptions.icon = path.join(path.resolve(app.getAppPath(), 'assets'), 'linux', 'app_icon.png');
         }
 
@@ -227,7 +227,7 @@ export default class BaseWindow {
     private onEmitConfiguration = () => {
         this.win.webContents.send(RELOAD_CONFIGURATION);
         if (process.platform !== 'darwin') {
-            const useNativeTitleBar = process.platform === 'linux' && Config.useNativeTitleBar;
+            const useNativeTitleBar = (process.platform === 'linux' || process.platform === 'freebsd') && Config.useNativeTitleBar;
             if (!useNativeTitleBar) {
                 this.win.setTitleBarOverlay(this.getTitleBarOverlay());
             }
