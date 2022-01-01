--- src/main/windows/windowManager.ts.orig	2021-12-31 10:08:32 UTC
+++ src/main/windows/windowManager.ts
@@ -164,7 +164,7 @@ function handleResizeMainWindow() {
     // Workaround for linux maximizing/minimizing, which doesn't work properly because of these bugs:
     // https://github.com/electron/electron/issues/28699
     // https://github.com/electron/electron/issues/28106
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
         const size = status.mainWindow.getSize();
         bounds = {width: size[0], height: size[1]};
     } else {
@@ -179,7 +179,7 @@ function handleResizeMainWindow() {
 
     // Another workaround since the window doesn't update properly under Linux for some reason
     // See above comment
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
         setTimeout(setBoundsFunction, 10);
     } else {
         setBoundsFunction();
@@ -240,7 +240,7 @@ export function restoreMain() {
 }
 
 export function flashFrame(flash: boolean) {
-    if (process.platform === 'linux' || process.platform === 'win32') {
+    if (process.platform === 'linux' || process.platform === 'win32' || process.platform === 'freebsd') {
         if (status.config?.notifications.flashWindow) {
             status.mainWindow?.flashFrame(flash);
             if (status.settingsWindow) {
