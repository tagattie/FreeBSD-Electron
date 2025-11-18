--- src/main/security/permissionsManager.test.js.orig	2025-11-18 22:15:50 UTC
+++ src/main/security/permissionsManager.test.js
@@ -69,7 +69,7 @@ describe('main/PermissionsManager', () => {
 
 describe('main/PermissionsManager', () => {
     describe('setForServer', () => {
-        if (process.platform !== 'linux') {
+        if (process.platform !== 'linux' && process.platform !== 'freebsd') {
             it('should ask for media permission when is not granted but the user explicitly granted it', () => {
                 systemPreferences.getMediaAccessStatus.mockReturnValue('denied');
                 const permissionsManager = new PermissionsManager('anyfile.json');
