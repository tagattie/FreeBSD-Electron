--- src/main/notifications/dnd-linux.ts.orig	2023-06-27 20:04:50 UTC
+++ src/main/notifications/dnd-linux.ts
@@ -10,7 +10,7 @@ const log = new Logger('Linux-DnD');
 
 function getLinuxDoNotDisturb() {
     try {
-        if (process.platform !== 'linux') {
+        if (process.platform !== 'linux' && process.platform !== 'freebsd') {
             return false;
         }
         const showNotifications = execSync(GNOME_READ_DND).toString().replace('\n', '');
