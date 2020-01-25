--- src/main/modules/mpris.ts.orig	2019-07-19 16:29:54 UTC
+++ src/main/modules/mpris.ts
@@ -18,7 +18,7 @@ class MprisModule extends ModuleWindow {
 
   constructor(window: Electron.BrowserWindow) {
     super(window);
-    this.platforms = ['linux'];
+    this.platforms = ['linux', 'freebsd'];
   }
 
   async load() {
