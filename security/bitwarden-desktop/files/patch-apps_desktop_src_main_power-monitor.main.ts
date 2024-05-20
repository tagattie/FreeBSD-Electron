--- apps/desktop/src/main/power-monitor.main.ts.orig	2024-05-06 13:04:55 UTC
+++ apps/desktop/src/main/power-monitor.main.ts
@@ -22,7 +22,7 @@ export class PowerMonitorMain {
       });
     }
 
-    if (process.platform !== "linux") {
+    if (process.platform !== "linux" && process.platform !== 'freebsd') {
       // System locked
       powerMonitor.on("lock-screen", () => {
         this.messagingService.send("systemLocked");
