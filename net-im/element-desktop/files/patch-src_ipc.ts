--- src/ipc.ts.orig	2025-07-29 13:25:01 UTC
+++ src/ipc.ts
@@ -14,7 +14,7 @@ ipcMain.on("loudNotification", function (): void {
 
 let focusHandlerAttached = false;
 ipcMain.on("loudNotification", function (): void {
-    if (process.platform === "win32" || process.platform === "linux") {
+    if (process.platform === "win32" || process.platform === "linux" || process.platform === "freebsd") {
         if (global.mainWindow && !global.mainWindow.isFocused() && !focusHandlerAttached) {
             global.mainWindow.flashFrame(true);
             global.mainWindow.once("focus", () => {
