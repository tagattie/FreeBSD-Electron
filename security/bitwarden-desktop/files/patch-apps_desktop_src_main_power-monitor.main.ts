--- apps/desktop/src/main/power-monitor.main.ts.orig	2026-07-15 09:46:59 UTC
+++ apps/desktop/src/main/power-monitor.main.ts
@@ -27,7 +27,7 @@ export class PowerMonitorMain {
       });
     }
 
-    if (process.platform !== "linux") {
+    if (process.platform !== "linux" && process.platform !== 'freebsd') {
       // System locked
       powerMonitor.on("lock-screen", () => {
         this.messagingService.send("systemLocked");
@@ -42,7 +42,7 @@ export class PowerMonitorMain {
         });
     }
     ipcMain.handle("powermonitor.isLockMonitorAvailable", async (_event: any, _message: any) => {
-      if (process.platform !== "linux") {
+      if (process.platform !== "linux" && process.platform !== 'freebsd') {
         return true;
       } else {
         return await powermonitors.isLockMonitorAvailable();
