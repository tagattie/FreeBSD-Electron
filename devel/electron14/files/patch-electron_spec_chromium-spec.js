--- electron/spec/chromium-spec.js.orig	2022-03-29 23:00:48 UTC
+++ electron/spec/chromium-spec.js
@@ -225,7 +225,7 @@ describe('chromium feature', () => {
     });
 
     it('can be get as context in canvas', () => {
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         // FIXME(alexeykuzmin): Skip the test.
         // this.skip()
         return;
