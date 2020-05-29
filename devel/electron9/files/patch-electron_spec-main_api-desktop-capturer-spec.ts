--- electron/spec-main/api-desktop-capturer-spec.ts.orig	2020-05-18 21:17:08 UTC
+++ electron/spec-main/api-desktop-capturer-spec.ts
@@ -21,7 +21,7 @@ ifdescribe(features.isDesktopCapturerEnabled() && !pro
   };
 
   // TODO(nornagon): figure out why this test is failing on Linux and re-enable it.
-  ifit(process.platform !== 'linux')('should return a non-empty array of sources', async () => {
+  ifit(process.platform !== 'linux' && process.platform !== 'freebsd')('should return a non-empty array of sources', async () => {
     const sources = await getSources({ types: ['window', 'screen'] });
     expect(sources).to.be.an('array').that.is.not.empty();
   });
@@ -32,7 +32,7 @@ ifdescribe(features.isDesktopCapturerEnabled() && !pro
   });
 
   // TODO(nornagon): figure out why this test is failing on Linux and re-enable it.
-  ifit(process.platform !== 'linux')('does not throw an error when called more than once (regression)', async () => {
+  ifit(process.platform !== 'linux' && process.platform !== 'freebsd')('does not throw an error when called more than once (regression)', async () => {
     const sources1 = await getSources({ types: ['window', 'screen'] });
     expect(sources1).to.be.an('array').that.is.not.empty();
 
@@ -40,7 +40,7 @@ ifdescribe(features.isDesktopCapturerEnabled() && !pro
     expect(sources2).to.be.an('array').that.is.not.empty();
   });
 
-  ifit(process.platform !== 'linux')('responds to subsequent calls of different options', async () => {
+  ifit(process.platform !== 'linux' && process.platform !== 'freebsd')('responds to subsequent calls of different options', async () => {
     const promise1 = getSources({ types: ['window'] });
     await expect(promise1).to.eventually.be.fulfilled();
 
@@ -49,7 +49,7 @@ ifdescribe(features.isDesktopCapturerEnabled() && !pro
   });
 
   // Linux doesn't return any window sources.
-  ifit(process.platform !== 'linux')('returns an empty display_id for window sources on Windows and Mac', async () => {
+  ifit(process.platform !== 'linux' && process.platform !== 'freebsd')('returns an empty display_id for window sources on Windows and Mac', async () => {
     const w = new BrowserWindow({ width: 200, height: 200 });
 
     const sources = await getSources({ types: ['window'] });
@@ -60,7 +60,7 @@ ifdescribe(features.isDesktopCapturerEnabled() && !pro
     }
   });
 
-  ifit(process.platform !== 'linux')('returns display_ids matching the Screen API on Windows and Mac', async () => {
+  ifit(process.platform !== 'linux' && process.platform !== 'freebsd')('returns display_ids matching the Screen API on Windows and Mac', async () => {
     const displays = screen.getAllDisplays();
     const sources = await getSources({ types: ['screen'] });
     expect(sources).to.be.an('array').of.length(displays.length);
@@ -70,7 +70,7 @@ ifdescribe(features.isDesktopCapturerEnabled() && !pro
     }
   });
 
-  ifit(process.platform !== 'linux')('returns an empty source list if blocked by the main process', async () => {
+  ifit(process.platform !== 'linux' && process.platform !== 'freebsd')('returns an empty source list if blocked by the main process', async () => {
     w.webContents.once('desktop-capturer-get-sources', (event) => {
       event.preventDefault();
     });
@@ -117,7 +117,7 @@ ifdescribe(features.isDesktopCapturerEnabled() && !pro
     // TODO(julien.isorce): investigate why |sources| is empty on the linux
     // bots while it is not on my workstation, as expected, with and without
     // the --ci parameter.
-    if (process.platform === 'linux' && sources.length === 0) {
+    if ((process.platform === 'linux' || process.platform === 'freebsd') && sources.length === 0) {
       it.skip('desktopCapturer.getSources returned an empty source list');
       return;
     }
@@ -161,7 +161,7 @@ ifdescribe(features.isDesktopCapturerEnabled() && !pro
       // TODO(julien.isorce): investigate why |sources| is empty on the linux
       // bots while it is not on my workstation, as expected, with and without
       // the --ci parameter.
-      if (process.platform === 'linux' && sources.length === 0) {
+      if ((process.platform === 'linux' || process.platform === 'freebsd') && sources.length === 0) {
         wList.forEach((w) => {
           if (w !== mainWindow) {
             w.destroy();
