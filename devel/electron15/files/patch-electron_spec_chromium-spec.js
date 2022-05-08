--- electron/spec/chromium-spec.js.orig	2022-05-04 15:34:57 UTC
+++ electron/spec/chromium-spec.js
@@ -225,7 +225,7 @@ describe('chromium feature', () => {
     });
 
     it('can be get as context in canvas', () => {
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         // FIXME(alexeykuzmin): Skip the test.
         // this.skip()
         return;
