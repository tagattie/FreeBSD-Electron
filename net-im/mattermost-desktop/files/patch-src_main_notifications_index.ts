--- src/main/notifications/index.ts.orig	2023-10-02 16:43:32 UTC
+++ src/main/notifications/index.ts
@@ -160,7 +160,7 @@ function getDoNotDisturb() {
         return getDarwinDoNotDisturb();
     }
 
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
         return getLinuxDoNotDisturb();
     }
 
@@ -168,7 +168,7 @@ function getDoNotDisturb() {
 }
 
 function flashFrame(flash: boolean) {
-    if (process.platform === 'linux' || process.platform === 'win32') {
+    if (process.platform === 'linux' || process.platform === 'freebsd' || process.platform === 'win32') {
         if (Config.notifications.flashWindow) {
             MainWindow.get()?.flashFrame(flash);
         }
