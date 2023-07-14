--- src/utils/main/windowManager.ts.orig	2023-07-13 00:45:22 UTC
+++ src/utils/main/windowManager.ts
@@ -57,7 +57,7 @@ export class WindowHandler {
   }
 
   public static get hasFrame() {
-    return process.platform === 'linux' || process.platform === 'darwin'
+    return process.platform === 'linux' || process.platform === 'darwin' || process.platform === 'freebsd'
   }
 
   public static get showTitlebarIcons() {
