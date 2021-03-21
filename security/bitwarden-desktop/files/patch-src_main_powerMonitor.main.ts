--- src/main/powerMonitor.main.ts.orig	2021-03-17 21:18:26 UTC
+++ src/main/powerMonitor.main.ts
@@ -28,7 +28,7 @@ export class PowerMonitorMain {
             });
         }
 
-        if (process.platform !== 'linux') {
+        if (process.platform !== 'linux' && process.platform !== 'freebsd') {
             // System locked
             powerMonitor.on('lock-screen', async () => {
                 const options = await this.getVaultTimeoutOptions();
