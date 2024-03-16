--- src/main/notifications/index.ts.orig	2024-03-15 14:25:06 UTC
+++ src/main/notifications/index.ts
@@ -184,7 +184,7 @@ function getDoNotDisturb() {
         return getDarwinDoNotDisturb();
     }
 
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
         return getLinuxDoNotDisturb();
     }
 
@@ -192,7 +192,7 @@ function flashFrame(flash: boolean) {
 }
 
 function flashFrame(flash: boolean) {
-    if (process.platform === 'linux' || process.platform === 'win32') {
+    if (process.platform === 'linux' || process.platform === 'freebsd' || process.platform === 'win32') {
         if (Config.notifications.flashWindow) {
             MainWindow.get()?.flashFrame(flash);
         }
