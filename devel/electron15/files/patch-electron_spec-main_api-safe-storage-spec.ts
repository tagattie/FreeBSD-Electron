--- electron/spec-main/api-safe-storage-spec.ts.orig	2022-05-24 14:51:39 UTC
+++ electron/spec-main/api-safe-storage-spec.ts
@@ -33,7 +33,7 @@ describe('safeStorage module', () => {
   });
 });
 
-ifdescribe(process.platform !== 'linux')('safeStorage module', () => {
+ifdescribe(process.platform !== 'linux' && process.platform !== 'freebsd')('safeStorage module', () => {
   after(async () => {
     const pathToEncryptedString = path.resolve(__dirname, 'fixtures', 'api', 'safe-storage', 'encrypted.txt');
     if (fs.existsSync(pathToEncryptedString)) {
