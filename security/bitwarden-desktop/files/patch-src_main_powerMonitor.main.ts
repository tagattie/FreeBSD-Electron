--- src/main/powerMonitor.main.ts.orig	2020-01-20 05:09:10 UTC
+++ src/main/powerMonitor.main.ts
@@ -28,7 +28,7 @@ export class PowerMonitorMain {
             });
         }
 
-        if (process.platform !== 'linux') {
+        if (process.platform !== 'linux' && process.platform !== 'freebsd') {
             // System locked
             powerMonitor.on('lock-screen', async () => {
                 const lockOption = await this.getLockOption();
