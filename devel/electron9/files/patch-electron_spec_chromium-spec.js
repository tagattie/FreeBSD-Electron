--- electron/spec/chromium-spec.js.orig	2020-05-18 21:17:08 UTC
+++ electron/spec/chromium-spec.js
@@ -261,7 +261,7 @@ describe('chromium feature', () => {
     });
 
     it('can be get as context in canvas', () => {
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         // FIXME(alexeykuzmin): Skip the test.
         // this.skip()
         return;
