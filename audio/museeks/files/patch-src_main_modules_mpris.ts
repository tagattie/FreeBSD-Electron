--- src/main/modules/mpris.ts.orig	2021-07-28 21:45:51 UTC
+++ src/main/modules/mpris.ts
@@ -19,7 +19,7 @@ class MprisModule extends ModuleWindow {
 
   constructor(window: Electron.BrowserWindow) {
     super(window);
-    this.platforms = ['linux'];
+    this.platforms = ['linux', 'freebsd'];
   }
 
   async load(): Promise<void> {
