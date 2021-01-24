--- electron/spec/chromium-spec.js.orig	2021-01-14 16:50:03 UTC
+++ electron/spec/chromium-spec.js
@@ -226,7 +226,7 @@ describe('chromium feature', () => {
     });
 
     it('can be get as context in canvas', () => {
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         // FIXME(alexeykuzmin): Skip the test.
         // this.skip()
         return;
