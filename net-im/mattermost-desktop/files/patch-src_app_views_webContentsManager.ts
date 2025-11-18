--- src/app/views/webContentsManager.ts.orig	2025-11-18 22:10:00 UTC
+++ src/app/views/webContentsManager.ts
@@ -64,7 +64,7 @@ export class WebContentsManager {
         ipcMain.on(UPDATE_SERVER_THEME, this.handleUpdateServerTheme);
         ipcMain.on(UPDATE_THEME, this.handleUpdateTheme);
 
-        if (process.platform !== 'linux') {
+        if (process.platform !== 'linux' && process.platform !== 'freebsd') {
             nativeTheme.on('updated', this.handleDarkModeChanged);
         }
 
