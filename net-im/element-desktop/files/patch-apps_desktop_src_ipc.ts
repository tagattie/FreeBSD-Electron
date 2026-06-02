--- apps/desktop/src/ipc.ts.orig	2026-05-27 13:46:37 UTC
+++ apps/desktop/src/ipc.ts
@@ -14,7 +14,7 @@ ipcMain.on("loudNotification", function (): void {
 
 let focusHandlerAttached = false;
 ipcMain.on("loudNotification", function (): void {
-    if (process.platform === "win32" || process.platform === "linux") {
+    if (process.platform === "win32" || process.platform === "linux" || process.platform === "freebsd") {
         if (global.mainWindow && !global.mainWindow.isFocused() && !focusHandlerAttached) {
             global.mainWindow.flashFrame(true);
             global.mainWindow.once("focus", () => {
