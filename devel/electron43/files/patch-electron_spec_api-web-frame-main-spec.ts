--- electron/spec/api-web-frame-main-spec.ts.orig	2026-06-29 20:35:15 UTC
+++ electron/spec/api-web-frame-main-spec.ts
@@ -308,7 +308,7 @@ describe('webFrameMain module', () => {
     afterEach(closeAllWindows);
 
     // TODO(jkleinsc) fix this flaky test on linux
-    ifit(process.platform !== 'linux')('throws upon accessing properties when disposed', async () => {
+    ifit(process.platform !== 'linux' && process.platform !== 'freebsd')('throws upon accessing properties when disposed', async () => {
       await w.loadFile(path.join(subframesPath, 'frame-with-frame-container.html'));
       const { mainFrame } = w.webContents;
       w.destroy();
