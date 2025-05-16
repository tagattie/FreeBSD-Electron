--- src/main/permissionsManager.test.js.orig	2025-05-16 07:07:35 UTC
+++ src/main/permissionsManager.test.js
@@ -60,7 +60,7 @@ describe('main/PermissionsManager', () => {
 
 describe('main/PermissionsManager', () => {
     describe('setForServer', () => {
-        if (process.platform !== 'linux') {
+        if (process.platform !== 'linux' && process.platform !== 'freebsd') {
             it('should ask for media permission when is not granted but the user explicitly granted it', () => {
                 systemPreferences.getMediaAccessStatus.mockReturnValue('denied');
                 const permissionsManager = new PermissionsManager('anyfile.json');
