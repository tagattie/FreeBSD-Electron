--- src/app/windows/baseWindow.test.js.orig	2025-12-10 14:05:35 UTC
+++ src/app/windows/baseWindow.test.js
@@ -129,7 +129,7 @@ describe('BaseWindow', () => {
 
             expect(baseWindow).toBeDefined();
             expect(BrowserWindow).toHaveBeenCalledWith(expect.objectContaining({
-                fullscreenable: process.platform !== 'linux',
+                fullscreenable: (process.platform !== 'linux' && process.platform !== 'freebsd'),
                 show: false,
                 paintWhenInitiallyHidden: true,
                 minWidth: MINIMUM_WINDOW_WIDTH,
