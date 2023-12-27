--- src/main/notifications/index.ts.orig	2023-12-15 14:26:44 UTC
+++ src/main/notifications/index.ts
@@ -183,7 +183,7 @@ function getDoNotDisturb() {
         return getDarwinDoNotDisturb();
     }
 
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
         return getLinuxDoNotDisturb();
     }
 
@@ -191,7 +191,7 @@ function flashFrame(flash: boolean) {
 }
 
 function flashFrame(flash: boolean) {
-    if (process.platform === 'linux' || process.platform === 'win32') {
+    if (process.platform === 'linux' || process.platform === 'freebsd' || process.platform === 'win32') {
         if (Config.notifications.flashWindow) {
             MainWindow.get()?.flashFrame(flash);
         }
