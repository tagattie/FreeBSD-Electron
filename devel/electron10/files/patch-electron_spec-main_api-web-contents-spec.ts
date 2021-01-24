--- electron/spec-main/api-web-contents-spec.ts.orig	2021-01-14 16:50:03 UTC
+++ electron/spec-main/api-web-contents-spec.ts
@@ -128,7 +128,7 @@ describe('webContents module', () => {
       }).to.throw('webContents.print(): Invalid optional callback provided.');
     });
 
-    ifit(process.platform !== 'linux')('throws when an invalid deviceName is passed', () => {
+    ifit(process.platform !== 'linux' && process.platform !== 'freebsd')('throws when an invalid deviceName is passed', () => {
       expect(() => {
         w.webContents.print({ deviceName: 'i-am-a-nonexistent-printer' }, () => {});
       }).to.throw('webContents.print(): Invalid deviceName provided.');
