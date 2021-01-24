--- electron/spec/api-native-image-spec.js.orig	2021-01-23 02:19:33 UTC
+++ electron/spec/api-native-image-spec.js
@@ -521,7 +521,7 @@ describe('nativeImage module', () => {
     });
   });
 
-  ifdescribe(process.platform !== 'linux')('createThumbnailFromPath(path, size)', () => {
+  ifdescribe(process.platform !== 'linux' && process.platform !== 'freebsd')('createThumbnailFromPath(path, size)', () => {
     it('throws when invalid size is passed', async () => {
       const badSize = { width: -1, height: -1 };
 
