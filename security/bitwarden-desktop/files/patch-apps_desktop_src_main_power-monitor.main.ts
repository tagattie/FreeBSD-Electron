--- apps/desktop/src/main/power-monitor.main.ts.orig	2023-03-22 14:48:32 UTC
+++ apps/desktop/src/main/power-monitor.main.ts
@@ -21,7 +21,7 @@ export class PowerMonitorMain {
       });
     }
 
-    if (process.platform !== "linux") {
+    if (process.platform !== "linux" && process.platform !== 'freebsd') {
       // System locked
       powerMonitor.on("lock-screen", () => {
         this.messagingService.send("systemLocked");
