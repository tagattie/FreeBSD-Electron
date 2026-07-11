--- apps/desktop/src/ipc.ts.orig	2026-07-07 12:56:48 UTC
+++ apps/desktop/src/ipc.ts
@@ -15,7 +15,7 @@ ipcMain.on("loudNotification", function (): void {
 
 let focusHandlerAttached = false;
 ipcMain.on("loudNotification", function (): void {
-    if (process.platform === "win32" || process.platform === "linux") {
+    if (process.platform === "win32" || process.platform === "linux" || process.platform === "freebsd") {
         if (global.mainWindow && !global.mainWindow.isFocused() && !focusHandlerAttached) {
             global.mainWindow.flashFrame(true);
             global.mainWindow.once("focus", () => {
