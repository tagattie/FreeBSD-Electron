--- src/utils/main/windowManager.ts.orig	2023-10-24 01:06:15 UTC
+++ src/utils/main/windowManager.ts
@@ -56,7 +56,7 @@ export class WindowHandler {
   }
 
   public static get hasFrame() {
-    return process.platform === 'linux' || process.platform === 'darwin'
+    return process.platform === 'linux' || process.platform === 'darwin' || process.platform === 'freebsd'
   }
 
   public static get showTitlebarIcons() {
