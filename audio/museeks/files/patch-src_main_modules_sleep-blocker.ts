--- src/main/modules/sleep-blocker.ts.orig	2021-07-28 21:45:51 UTC
+++ src/main/modules/sleep-blocker.ts
@@ -16,7 +16,7 @@ class SleepBlocker extends ModuleWindow {
 
     this.enabled = false;
     this.sleepBlockerId = 0;
-    this.platforms = ['win32', 'darwin', 'linux'];
+    this.platforms = ['win32', 'darwin', 'linux', 'freebsd'];
   }
 
   onStartPlayback = (_event: Event): void => {
