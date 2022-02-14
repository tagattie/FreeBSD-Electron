--- jslib/electron/src/tray.main.ts.orig	2022-02-11 20:26:02 UTC
+++ jslib/electron/src/tray.main.ts
@@ -86,7 +86,7 @@ export class TrayMain {
   removeTray(showWindow = true) {
     // Due to https://github.com/electron/electron/issues/17622
     // we cannot destroy the tray icon on linux.
-    if (this.tray != null && process.platform !== "linux") {
+    if (this.tray != null && (process.platform !== "linux" && process.platform !== "freebsd")) {
       this.tray.destroy();
       this.tray = null;
     }
@@ -149,7 +149,7 @@ export class TrayMain {
   }
 
   private isLinux() {
-    return process.platform === "linux";
+    return (process.platform === "linux" || process.platform === "freebsd");
   }
 
   private async toggleWindow() {
