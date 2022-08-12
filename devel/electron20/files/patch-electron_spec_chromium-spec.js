--- electron/spec/chromium-spec.js.orig	2022-08-03 15:31:32 UTC
+++ electron/spec/chromium-spec.js
@@ -217,7 +217,7 @@ describe('chromium feature', () => {
     });
 
     it('can be get as context in canvas', () => {
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         // FIXME(alexeykuzmin): Skip the test.
         // this.skip()
         return;
