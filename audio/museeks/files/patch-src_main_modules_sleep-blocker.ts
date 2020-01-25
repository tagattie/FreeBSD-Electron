--- src/main/modules/sleep-blocker.ts.orig	2019-07-19 16:29:54 UTC
+++ src/main/modules/sleep-blocker.ts
@@ -15,7 +15,7 @@ class SleepBlocker extends ModuleWindow {
 
     this.enabled = false;
     this.sleepBlockerId = 0;
-    this.platforms = ['win32', 'darwin', 'linux'];
+    this.platforms = ['win32', 'darwin', 'linux', 'freebsd'];
   }
 
   onStartPlayback = (_event: Event) => {
