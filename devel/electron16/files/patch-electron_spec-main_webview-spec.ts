--- electron/spec-main/webview-spec.ts.orig	2021-11-08 18:41:28 UTC
+++ electron/spec-main/webview-spec.ts
@@ -447,7 +447,7 @@ describe('<webview> tag', function () {
 
     // FIXME(zcbenz): Fullscreen events do not work on Linux.
     // This test is flaky on arm64 macOS.
-    ifit(process.platform !== 'linux' && process.arch !== 'arm64')('exiting fullscreen should unfullscreen window', async () => {
+    ifit((process.platform !== 'linux' && process.platform !== 'freebsd') && process.arch !== 'arm64')('exiting fullscreen should unfullscreen window', async () => {
       const [w, webview] = await loadWebViewWindow();
       const enterFullScreen = emittedOnce(w, 'enter-full-screen');
       await webview.executeJavaScript('document.getElementById("div").requestFullscreen()', true);
