--- src/main/notifications/index.ts.orig	2025-11-18 12:31:15 UTC
+++ src/main/notifications/index.ts
@@ -260,7 +260,7 @@ export async function getDoNotDisturb() {
         }
     }
 
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
         return getLinuxDoNotDisturb();
     }
 
@@ -268,7 +268,7 @@ function flashFrame(flash: boolean) {
 }
 
 function flashFrame(flash: boolean) {
-    if (process.platform === 'linux' || process.platform === 'win32') {
+    if (process.platform === 'linux' || process.platform === 'freebsd' || process.platform === 'win32') {
         if (Config.notifications.flashWindow) {
             MainWindow.get()?.flashFrame(flash);
         }
