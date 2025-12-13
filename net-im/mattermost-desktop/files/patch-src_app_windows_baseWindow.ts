--- src/app/windows/baseWindow.ts.orig	2025-12-10 14:05:35 UTC
+++ src/app/windows/baseWindow.ts
@@ -39,7 +39,7 @@ export default class BaseWindow {
         this.altPressStatus = false;
 
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
 
@@ -111,7 +111,7 @@ export default class BaseWindow {
         // Workaround for linux maximizing/minimizing, which doesn't work properly because of these bugs:
         // https://github.com/electron/electron/issues/28699
         // https://github.com/electron/electron/issues/28106
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             const size = this.win.getSize();
             return {...this.win.getContentBounds(), width: size[0], height: size[1]};
         }
