--- apps/desktop/src/main/power-monitor.main.ts.orig	2024-08-23 02:03:28 UTC
+++ apps/desktop/src/main/power-monitor.main.ts
@@ -27,7 +27,7 @@ export class PowerMonitorMain {
       });
     }
 
-    if (process.platform !== "linux") {
+    if (process.platform !== "linux" && process.platform !== 'freebsd') {
       // System locked
       powerMonitor.on("lock-screen", () => {
         this.messagingService.send("systemLocked");
