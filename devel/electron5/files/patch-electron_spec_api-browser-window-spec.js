--- electron/spec/api-browser-window-spec.js.orig	2019-06-14 21:14:47 UTC
+++ electron/spec/api-browser-window-spec.js
@@ -1268,7 +1268,7 @@ describe('BrowserWindow module', () => {
 
   describe('enableLargerThanScreen" option', () => {
     before(function () {
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         this.skip()
       }
     })
@@ -2341,7 +2341,7 @@ describe('BrowserWindow module', () => {
       w.loadFile(path.join(fixtures, 'pages', 'visibilitychange.html'))
     })
     it('visibilityState changes when window is minimized', function (done) {
-      if (isCI && process.platform === 'linux') {
+      if (isCI && (process.platform === 'linux' || process.platform === 'freebsd')) {
         // FIXME(alexeykuzmin): Skip the test instead of marking it as passed.
         // afterEach hook won't be run if a test is skipped dynamically.
         // If afterEach isn't run current window won't be destroyed
@@ -2533,7 +2533,7 @@ describe('BrowserWindow module', () => {
   describe('beginFrameSubscription method', () => {
     before(function () {
       // FIXME These specs crash on Linux when run in a docker container
-      if (isCI && process.platform === 'linux') {
+      if (isCI && (process.platform === 'linux' || process.platform === 'freebsd')) {
         this.skip()
       }
     })
@@ -2779,7 +2779,7 @@ describe('BrowserWindow module', () => {
     // - `.skip()` called in the 'beforeEach' hook prevents 'afterEach'
     //     hook from being called.
     // Not implemented on Linux.
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
       return
     }
 
