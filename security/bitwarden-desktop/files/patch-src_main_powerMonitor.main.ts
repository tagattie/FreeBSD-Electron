--- src/main/powerMonitor.main.ts.orig	2021-01-26 21:32:25 UTC
+++ src/main/powerMonitor.main.ts
@@ -29,7 +29,7 @@ export class PowerMonitorMain {
             });
         }
 
-        if (process.platform !== 'linux') {
+        if (process.platform !== 'linux' && process.platform !== 'freebsd') {
             // System locked
             powerMonitor.on('lock-screen', async () => {
                 const options = await this.getVaultTimeoutOptions();
