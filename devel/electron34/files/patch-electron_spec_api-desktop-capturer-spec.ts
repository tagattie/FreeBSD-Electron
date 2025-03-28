--- electron/spec/api-desktop-capturer-spec.ts.orig	2025-03-26 14:46:58 UTC
+++ electron/spec/api-desktop-capturer-spec.ts
@@ -45,7 +45,7 @@ ifdescribe(!process.arch.includes('arm') && process.pl
   });
 
   // Linux doesn't return any window sources.
-  ifit(process.platform !== 'linux')('returns an empty display_id for window sources', async () => {
+  ifit(process.platform !== 'linux' && process.platform !== 'freebsd')('returns an empty display_id for window sources', async () => {
     const w = new BrowserWindow({ width: 200, height: 200 });
     await w.loadURL('about:blank');
 
@@ -57,7 +57,7 @@ ifdescribe(!process.arch.includes('arm') && process.pl
     }
   });
 
-  ifit(process.platform !== 'linux')('returns display_ids matching the Screen API', async () => {
+  ifit(process.platform !== 'linux' && process.platform !== 'freebsd')('returns display_ids matching the Screen API', async () => {
     const displays = screen.getAllDisplays();
     const sources = await desktopCapturer.getSources({ types: ['screen'] });
     expect(sources).to.be.an('array').of.length(displays.length);
@@ -118,7 +118,7 @@ ifdescribe(!process.arch.includes('arm') && process.pl
     // TODO(julien.isorce): investigate why |sources| is empty on the linux
     // bots while it is not on my workstation, as expected, with and without
     // the --ci parameter.
-    if (process.platform === 'linux' && sources.length === 0) {
+    if ((process.platform === 'linux' || process.platform === 'freebsd') && sources.length === 0) {
       it.skip('desktopCapturer.getSources returned an empty source list');
       return;
     }
@@ -154,7 +154,7 @@ ifdescribe(!process.arch.includes('arm') && process.pl
     // TODO(julien.isorce): investigate why |sources| is empty on the linux
     // bots while it is not on my workstation, as expected, with and without
     // the --ci parameter.
-    if (process.platform === 'linux' && sources.length === 0) {
+    if ((process.platform === 'linux' || process.platform === 'freebsd') && sources.length === 0) {
       it.skip('desktopCapturer.getSources returned an empty source list');
       return;
     }
@@ -223,7 +223,7 @@ ifdescribe(!process.arch.includes('arm') && process.pl
       // TODO(julien.isorce): investigate why |sources| is empty on the linux
       // bots while it is not on my workstation, as expected, with and without
       // the --ci parameter.
-      if (process.platform === 'linux' && sources.length === 0) {
+      if ((process.platform === 'linux' || process.platform === 'freebsd') && sources.length === 0) {
         destroyWindows();
         it.skip('desktopCapturer.getSources returned an empty source list');
         return;
