--- apps/desktop/src/main/tray.main.ts.orig	2023-02-08 11:57:23 UTC
+++ apps/desktop/src/main/tray.main.ts
@@ -87,7 +87,7 @@ export class TrayMain {
   removeTray(showWindow = true) {
     // Due to https://github.com/electron/electron/issues/17622
     // we cannot destroy the tray icon on linux.
-    if (this.tray != null && process.platform !== "linux") {
+    if (this.tray != null && (process.platform !== "linux" && process.platform !== "freebsd")) {
       this.tray.destroy();
       this.tray = null;
     }
@@ -150,7 +150,7 @@ export class TrayMain {
   }
 
   private isLinux() {
-    return process.platform === "linux";
+    return (process.platform === "linux" || process.platform === "freebsd");
   }
 
   private async toggleWindow() {
