--- apps/desktop/src/main/power-monitor.main.ts.orig	2023-02-08 11:56:25 UTC
+++ apps/desktop/src/main/power-monitor.main.ts
@@ -21,7 +21,7 @@ export class PowerMonitorMain {
       });
     }
 
-    if (process.platform !== "linux") {
+    if (process.platform !== "linux" && process.platform !== 'freebsd') {
       // System locked
       powerMonitor.on("lock-screen", () => {
         this.main.messagingService.send("systemLocked");
