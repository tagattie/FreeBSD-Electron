--- src/main/app/config.ts.orig	2023-04-04 12:30:25 UTC
+++ src/main/app/config.ts
@@ -54,7 +54,7 @@ export function handleConfigUpdate(newConfig: Combined
         }
     }
 
-    if (process.platform === 'win32' || process.platform === 'linux') {
+    if (process.platform === 'win32' || process.platform === 'linux' || process.platform === 'freebsd') {
         const autoStartTask = newConfig.autostart ? AutoLauncher.enable() : AutoLauncher.disable();
         autoStartTask.then(() => {
             log.info('config.autostart has been configured:', newConfig.autostart);
