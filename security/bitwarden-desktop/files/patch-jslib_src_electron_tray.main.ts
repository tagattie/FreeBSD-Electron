--- jslib/src/electron/tray.main.ts.orig	2021-03-21 08:20:57 UTC
+++ jslib/src/electron/tray.main.ts
@@ -88,7 +88,7 @@ export class TrayMain {
     removeTray(showWindow = true) {
         // Due to https://github.com/electron/electron/issues/17622
         // we cannot destroy the tray icon on linux.
-        if (this.tray != null && process.platform !== 'linux') {
+        if (this.tray != null && (process.platform !== 'linux' && process.platform !== 'freebsd')) {
             this.tray.destroy();
             this.tray = null;
         }
