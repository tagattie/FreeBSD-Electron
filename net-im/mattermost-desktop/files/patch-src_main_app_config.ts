--- src/main/app/config.ts.orig	2023-03-03 01:49:11 UTC
+++ src/main/app/config.ts
@@ -47,7 +47,7 @@ export function handleConfigUpdate(newConfig: Combined
         }
     }
 
-    if (process.platform === 'win32' || process.platform === 'linux') {
+    if (process.platform === 'win32' || process.platform === 'linux' || process.platform === 'freebsd') {
         const autoStartTask = newConfig.autostart ? AutoLauncher.enable() : AutoLauncher.disable();
         autoStartTask.then(() => {
             log.info('config.autostart has been configured:', newConfig.autostart);
