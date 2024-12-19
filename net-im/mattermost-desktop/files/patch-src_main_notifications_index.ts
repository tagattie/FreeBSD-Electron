--- src/main/notifications/index.ts.orig	2024-12-16 19:52:04 UTC
+++ src/main/notifications/index.ts
@@ -253,7 +253,7 @@ export async function getDoNotDisturb() {
         }
     }
 
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
         return getLinuxDoNotDisturb();
     }
 
@@ -261,7 +261,7 @@ function flashFrame(flash: boolean) {
 }
 
 function flashFrame(flash: boolean) {
-    if (process.platform === 'linux' || process.platform === 'win32') {
+    if (process.platform === 'linux' || process.platform === 'freebsd' || process.platform === 'win32') {
         if (Config.notifications.flashWindow) {
             MainWindow.get()?.flashFrame(flash);
         }
