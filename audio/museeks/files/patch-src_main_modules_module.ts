--- src/main/modules/module.ts.orig	2020-01-24 05:25:37 UTC
+++ src/main/modules/module.ts
@@ -10,7 +10,7 @@ class Module {
 
   constructor() {
     this.loaded = false;
-    this.platforms = ['win32', 'linux', 'darwin'];
+    this.platforms = ['win32', 'linux', 'darwin', 'freebsd'];
   }
 
   // To not be overriden
