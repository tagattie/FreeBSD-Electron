--- apps/desktop/src/main/powerMonitor.main.ts.orig	2022-07-06 07:43:11 UTC
+++ apps/desktop/src/main/powerMonitor.main.ts
@@ -22,7 +22,7 @@ export class PowerMonitorMain {
       });
     }
 
-    if (process.platform !== "linux") {
+    if (process.platform !== "linux" && process.platform !== "freebsd") {
       // System locked
       powerMonitor.on("lock-screen", () => {
         this.main.messagingService.send("systemLocked");
