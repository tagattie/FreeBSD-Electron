--- src/main/security/permissionsManager.test.js.orig	2026-11-05 06:34:20 UTC
+++ src/main/security/permissionsManager.test.js
@@ -133,7 +133,7 @@ describe('main/PermissionsManager', () => {
             systemPreferences.askForMediaAccess.mockClear();
         });
 
-        if (process.platform !== 'linux') {
+        if (process.platform !== 'linux' && process.platform !== 'freebsd') {
             it('should ask for media permission when is not granted but the user explicitly granted it', () => {
                 systemPreferences.getMediaAccessStatus.mockReturnValue('denied');
                 const permissionsManager = new PermissionsManager('anyfile.json');
@@ -143,7 +143,7 @@ describe('main/PermissionsManager', () => {
             });
         }
 
-        if (process.platform !== 'linux') {
+        if (process.platform !== 'linux' && process.platform !== 'freebsd') {
             it('PM-U06: should not call askForMediaAccess when OS has already granted access', () => {
                 systemPreferences.getMediaAccessStatus.mockReturnValue('granted');
                 const permissionsManager = new PermissionsManager('anyfile.json');
