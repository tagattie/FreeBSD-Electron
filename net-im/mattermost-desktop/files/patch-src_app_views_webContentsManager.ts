--- src/app/views/webContentsManager.ts.orig	2026-06-08 13:42:42 UTC
+++ src/app/views/webContentsManager.ts
@@ -69,7 +69,7 @@ export class WebContentsManager {
         ipcMain.on(UPDATE_SERVER_THEME, ipcValidate(this.handleUpdateServerTheme, [themeSchema.required()]));
         ipcMain.on(UPDATE_THEME, ipcValidate(this.handleUpdateTheme, [themeSchema.required()]));
 
-        if (process.platform !== 'linux') {
+        if (process.platform !== 'linux' && process.platform !== 'freebsd') {
             nativeTheme.on('updated', this.handleDarkModeChanged);
         }
 
