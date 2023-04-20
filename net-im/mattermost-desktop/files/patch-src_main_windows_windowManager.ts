--- src/main/windows/windowManager.ts.orig	2023-04-04 12:30:25 UTC
+++ src/main/windows/windowManager.ts
@@ -409,7 +409,7 @@ export class WindowManager {
             // Workaround for linux maximizing/minimizing, which doesn't work properly because of these bugs:
             // https://github.com/electron/electron/issues/28699
             // https://github.com/electron/electron/issues/28106
-            if (process.platform === 'linux') {
+            if (process.platform === 'linux' || process.platform === 'freebsd') {
                 const size = this.mainWindow.getSize();
                 bounds = {width: size[0], height: size[1]};
             } else {
@@ -486,7 +486,7 @@ export class WindowManager {
     }
 
     flashFrame = (flash: boolean) => {
-        if (process.platform === 'linux' || process.platform === 'win32') {
+        if (process.platform === 'linux' || process.platform === 'win32' || process.platform === 'freebsd') {
             if (Config.notifications.flashWindow) {
                 this.mainWindow?.flashFrame(flash);
             }
