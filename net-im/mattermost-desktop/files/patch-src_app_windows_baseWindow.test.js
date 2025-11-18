--- src/app/windows/baseWindow.test.js.orig	2025-11-18 22:10:48 UTC
+++ src/app/windows/baseWindow.test.js
@@ -133,7 +133,7 @@ describe('BaseWindow', () => {
 
             expect(baseWindow).toBeDefined();
             expect(BrowserWindow).toHaveBeenCalledWith(expect.objectContaining({
-                fullscreenable: process.platform !== 'linux',
+                fullscreenable: (process.platform !== 'linux' && process.platform !== 'freebsd'),
                 show: false,
                 paintWhenInitiallyHidden: true,
                 minWidth: MINIMUM_WINDOW_WIDTH,
