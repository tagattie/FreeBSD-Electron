--- apps/desktop/src/main/tray.main.ts.orig	2024-03-06 20:31:11 UTC
+++ apps/desktop/src/main/tray.main.ts
@@ -91,7 +91,7 @@ export class TrayMain {
   removeTray(showWindow = true) {
     // Due to https://github.com/electron/electron/issues/17622
     // we cannot destroy the tray icon on linux.
-    if (this.tray != null && process.platform !== "linux") {
+    if (this.tray != null && (process.platform !== "linux" && process.platform !== "freebsd")) {
       this.tray.destroy();
       this.tray = null;
     }
@@ -158,7 +158,7 @@ export class TrayMain {
   }
 
   private isLinux() {
-    return process.platform === "linux";
+    return (process.platform === "linux" || process.platform === "freebsd");
   }
 
   private async toggleWindow() {
