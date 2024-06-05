--- src/main/app/config.ts.orig	2024-05-16 20:45:52 UTC
+++ src/main/app/config.ts
@@ -86,7 +86,7 @@ export function handleConfigUpdate(newConfig: Combined
         }
     }
 
-    if (process.platform === 'win32' || process.platform === 'linux') {
+    if (process.platform === 'win32' || process.platform === 'linux' || process.platform === 'freebsd') {
         const autoStartTask = newConfig.autostart ? AutoLauncher.enable() : AutoLauncher.disable();
         autoStartTask.then(() => {
             log.info('config.autostart has been configured:', newConfig.autostart);
