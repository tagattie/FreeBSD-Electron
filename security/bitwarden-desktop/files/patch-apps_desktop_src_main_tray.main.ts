--- apps/desktop/src/main/tray.main.ts.orig	2025-04-28 18:52:32 UTC
+++ apps/desktop/src/main/tray.main.ts
@@ -108,7 +108,7 @@ export class TrayMain {
   removeTray(showWindow = true) {
     // Due to https://github.com/electron/electron/issues/17622
     // we cannot destroy the tray icon on linux.
-    if (this.tray != null && process.platform !== "linux") {
+    if (this.tray != null && (process.platform !== "linux" && process.platform !== "freebsd")) {
       this.tray.destroy();
       this.tray = null;
     }
@@ -175,7 +175,7 @@ export class TrayMain {
   }
 
   private isLinux() {
-    return process.platform === "linux";
+    return (process.platform === "linux" || process.platform === "freebsd");
   }
 
   private async toggleWindow() {
