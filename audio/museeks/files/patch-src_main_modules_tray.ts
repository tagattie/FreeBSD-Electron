--- src/main/modules/tray.ts.orig	2021-07-28 21:45:51 UTC
+++ src/main/modules/tray.ts
@@ -23,7 +23,7 @@ class TrayModule extends ModuleWindow {
   constructor(window: Electron.BrowserWindow) {
     super(window);
 
-    this.platforms = ['linux', 'win32'];
+    this.platforms = ['linux', 'win32', 'freebsd'];
 
     this.tray = null;
     this.playToggle = [];
@@ -53,7 +53,7 @@ class TrayModule extends ModuleWindow {
 
   async load(): Promise<void> {
     // Fix for gnome-shell and high-dpi
-    if (os.platform() === 'linux') {
+    if (os.platform() === 'linux' || os.platform() === 'freebsd') {
       ps.lookup(
         {
           command: 'gnome-shell',
