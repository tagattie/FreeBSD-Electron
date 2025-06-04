--- src/ipc.ts.orig	2025-06-03 15:13:27 UTC
+++ src/ipc.ts
@@ -27,7 +27,7 @@ ipcMain.on("loudNotification", function (): void {
 
 let focusHandlerAttached = false;
 ipcMain.on("loudNotification", function (): void {
-    if (process.platform === "win32" || process.platform === "linux") {
+    if (process.platform === "win32" || process.platform === "linux" || process.platform === "freebsd") {
         if (global.mainWindow && !global.mainWindow.isFocused() && !focusHandlerAttached) {
             global.mainWindow.flashFrame(true);
             global.mainWindow.once("focus", () => {
