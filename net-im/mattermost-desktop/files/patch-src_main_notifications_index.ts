--- src/main/notifications/index.ts.orig	2023-06-27 20:06:20 UTC
+++ src/main/notifications/index.ts
@@ -155,7 +155,7 @@ function getDoNotDisturb() {
         return getDarwinDoNotDisturb();
     }
 
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
         return getLinuxDoNotDisturb();
     }
 
@@ -163,7 +163,7 @@ function getDoNotDisturb() {
 }
 
 function flashFrame(flash: boolean) {
-    if (process.platform === 'linux' || process.platform === 'win32') {
+    if (process.platform === 'linux' || process.platform === 'freebsd' || process.platform === 'win32') {
         if (Config.notifications.flashWindow) {
             MainWindow.get()?.flashFrame(flash);
         }
