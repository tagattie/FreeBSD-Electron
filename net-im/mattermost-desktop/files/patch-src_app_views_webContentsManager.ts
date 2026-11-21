--- src/app/views/webContentsManager.ts.orig	2026-11-05 06:34:20 UTC
+++ src/app/views/webContentsManager.ts
@@ -70,7 +70,7 @@ export class WebContentsManager {
         ipcMain.on(UPDATE_SERVER_THEME, ipcValidate(this.handleUpdateServerTheme, [themeSchema.required()]));
         ipcMain.on(UPDATE_THEME, ipcValidate(this.handleUpdateTheme, [themeSchema.required()]));
 
-        if (process.platform !== 'linux') {
+        if (process.platform !== 'linux' && process.platform !== 'freebsd') {
             nativeTheme.on('updated', this.handleDarkModeChanged);
         }
 
