--- src/main/modules/tray.ts.orig	2020-12-08 14:27:10 UTC
+++ src/main/modules/tray.ts
@@ -24,7 +24,7 @@ class TrayModule extends ModuleWindow {
   constructor(window: Electron.BrowserWindow, config: ConfigModule) {
     super(window);
 
-    this.platforms = ['linux', 'win32'];
+    this.platforms = ['linux', 'win32', 'freebsd'];
 
     this.config = config;
     this.tray = null;
@@ -55,7 +55,7 @@ class TrayModule extends ModuleWindow {
 
   async load() {
     // Fix for gnome-shell and high-dpi
-    if (os.platform() === 'linux') {
+    if (os.platform() === 'linux' || os.platform() === 'freebsd') {
       ps.lookup(
         {
           command: 'gnome-shell',
