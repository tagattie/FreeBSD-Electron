--- electron/spec/chromium-spec.js.orig	2021-12-16 22:06:44 UTC
+++ electron/spec/chromium-spec.js
@@ -224,7 +224,7 @@ describe('chromium feature', () => {
     });
 
     it('can be get as context in canvas', () => {
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         // FIXME(alexeykuzmin): Skip the test.
         // this.skip()
         return;
