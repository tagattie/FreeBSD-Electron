--- src/main/app/config.ts.orig	2025-11-18 12:31:15 UTC
+++ src/main/app/config.ts
@@ -80,7 +80,7 @@ export function handleConfigUpdate(newConfig: Combined
         }
     }
 
-    if (process.platform === 'win32' || process.platform === 'linux') {
+    if (process.platform === 'win32' || process.platform === 'linux' || process.platform === 'freebsd') {
         const autoStartTask = newConfig.autostart ? AutoLauncher.enable() : AutoLauncher.disable();
         autoStartTask.then(() => {
             log.info('config.autostart has been configured:', {autostart: newConfig.autostart});
