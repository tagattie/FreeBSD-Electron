--- src/app/windows/baseWindow.ts.orig	2026-02-24 16:38:27 UTC
+++ src/app/windows/baseWindow.ts
@@ -40,7 +40,7 @@ export default class BaseWindow {
         this.altPressStatus = false;
 
         const windowOptions: BrowserWindowConstructorOptions = Object.assign({}, {
-            fullscreenable: process.platform !== 'linux',
+            fullscreenable: (process.platform !== 'linux' && process.platform !== 'freebsd'),
             show: false, // don't start the window until it is ready and only if it isn't hidden
             paintWhenInitiallyHidden: true, // we want it to start painting to get info from the webapp
             minWidth: MINIMUM_WINDOW_WIDTH,
@@ -60,7 +60,7 @@ export default class BaseWindow {
         }, options);
         log.debug('main window options', {windowOptions});
 
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             windowOptions.icon = path.join(path.resolve(app.getAppPath(), 'assets'), 'linux', 'app_icon.png');
         }
 
@@ -112,7 +112,7 @@ export default class BaseWindow {
         // Workaround for linux maximizing/minimizing, which doesn't work properly because of these bugs:
         // https://github.com/electron/electron/issues/28699
         // https://github.com/electron/electron/issues/28106
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
             const size = this.win.getSize();
             return {...this.win.getContentBounds(), width: size[0], height: size[1]};
         }
