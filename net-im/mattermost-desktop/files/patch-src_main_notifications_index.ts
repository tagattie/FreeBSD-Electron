--- src/main/notifications/index.ts.orig	2026-11-05 06:34:20 UTC
+++ src/main/notifications/index.ts
@@ -306,7 +306,7 @@ export async function getDoNotDisturb() {
         }
     }
 
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
         return getLinuxDoNotDisturb();
     }
 
@@ -314,7 +314,7 @@ export function flashFrame(flash: boolean) {
 }
 
 export function flashFrame(flash: boolean) {
-    if (process.platform === 'linux' || process.platform === 'win32') {
+    if (process.platform === 'linux' || process.platform === 'freebsd' || process.platform === 'win32') {
         if (Config.notifications.flashWindow) {
             MainWindow.get()?.flashFrame(flash);
         }
