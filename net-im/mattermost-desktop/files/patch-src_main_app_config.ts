--- src/main/app/config.ts.orig	2023-06-19 18:19:05 UTC
+++ src/main/app/config.ts
@@ -88,7 +88,7 @@ export function handleConfigUpdate(newConfig: Combined
         }
     }
 
-    if (process.platform === 'win32' || process.platform === 'linux') {
+    if (process.platform === 'win32' || process.platform === 'linux' || process.platform === 'freebsd') {
         const autoStartTask = newConfig.autostart ? AutoLauncher.enable() : AutoLauncher.disable();
         autoStartTask.then(() => {
             log.info('config.autostart has been configured:', newConfig.autostart);
