--- electron/spec/chromium-spec.js.orig	2020-04-30 17:03:43 UTC
+++ electron/spec/chromium-spec.js
@@ -266,7 +266,7 @@ describe('chromium feature', () => {
     });
 
     it('can be get as context in canvas', () => {
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         // FIXME(alexeykuzmin): Skip the test.
         // this.skip()
         return;
