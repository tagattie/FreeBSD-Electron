--- apps/desktop/src/main/tray.main.ts.orig	2026-11-17 15:45:14 UTC
+++ apps/desktop/src/main/tray.main.ts
@@ -112,7 +112,7 @@ export class TrayMain {
   removeTray(showWindow = true) {
     // Due to https://github.com/electron/electron/issues/17622
     // we cannot destroy the tray icon on linux.
-    if (this.tray != null && process.platform !== "linux") {
+    if (this.tray != null && (process.platform !== "linux" && process.platform !== "freebsd")) {
       this.tray.destroy();
       this.tray = null;
     }
@@ -194,7 +194,7 @@ export class TrayMain {
   }
 
   private isLinux() {
-    return process.platform === "linux";
+    return (process.platform === "linux" || process.platform === "freebsd");
   }
 
   private closeWindow() {
