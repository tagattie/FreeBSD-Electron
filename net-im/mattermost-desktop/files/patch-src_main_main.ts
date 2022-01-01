--- src/main/main.ts.orig	2021-12-31 10:05:59 UTC
+++ src/main/main.ts
@@ -280,7 +280,7 @@ function handleConfigUpdate(newConfig: CombinedConfig)
     if (!newConfig) {
         return;
     }
-    if (process.platform === 'win32' || process.platform === 'linux') {
+    if (process.platform === 'win32' || process.platform === 'linux' || process.platform === 'freebsd') {
         const appLauncher = new AutoLauncher();
         const autoStartTask = config.autostart ? appLauncher.enable() : appLauncher.disable();
         autoStartTask.then(() => {
