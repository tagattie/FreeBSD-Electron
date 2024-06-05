--- src/main/notifications/index.ts.orig	2024-05-16 20:45:52 UTC
+++ src/main/notifications/index.ts
@@ -196,7 +196,7 @@ async function getDoNotDisturb() {
         return getDarwinDoNotDisturb();
     }
 
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
         return getLinuxDoNotDisturb();
     }
 
@@ -204,7 +204,7 @@ function flashFrame(flash: boolean) {
 }
 
 function flashFrame(flash: boolean) {
-    if (process.platform === 'linux' || process.platform === 'win32') {
+    if (process.platform === 'linux' || process.platform === 'freebsd' || process.platform === 'win32') {
         if (Config.notifications.flashWindow) {
             MainWindow.get()?.flashFrame(flash);
         }
