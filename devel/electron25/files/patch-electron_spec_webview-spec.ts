--- electron/spec/webview-spec.ts.orig	2023-05-31 14:28:29 UTC
+++ electron/spec/webview-spec.ts
@@ -527,7 +527,7 @@ describe('<webview> tag', function () {
     });
 
     // FIXME(zcbenz): Fullscreen events do not work on Linux.
-    ifit(process.platform !== 'linux')('exiting fullscreen should unfullscreen window', async () => {
+    ifit(process.platform !== 'linux' && process.platform !== 'freebsd')('exiting fullscreen should unfullscreen window', async () => {
       const [w, webview] = await loadWebViewWindow();
       const enterFullScreen = once(w, 'enter-full-screen');
       await webview.executeJavaScript('document.getElementById("div").requestFullscreen()', true);
