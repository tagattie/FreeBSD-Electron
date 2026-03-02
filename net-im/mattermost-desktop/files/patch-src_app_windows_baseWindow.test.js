--- src/app/windows/baseWindow.test.js.orig	2026-02-24 16:38:27 UTC
+++ src/app/windows/baseWindow.test.js
@@ -132,7 +132,7 @@ describe('BaseWindow', () => {
 
             expect(baseWindow).toBeDefined();
             expect(BrowserWindow).toHaveBeenCalledWith(expect.objectContaining({
-                fullscreenable: process.platform !== 'linux',
+                fullscreenable: (process.platform !== 'linux' && process.platform !== 'freebsd'),
                 show: false,
                 paintWhenInitiallyHidden: true,
                 minWidth: MINIMUM_WINDOW_WIDTH,
