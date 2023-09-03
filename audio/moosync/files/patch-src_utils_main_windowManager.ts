--- src/utils/main/windowManager.ts.orig	2023-08-30 00:01:06 UTC
+++ src/utils/main/windowManager.ts
@@ -55,7 +55,7 @@ export class WindowHandler {
   }
 
   public static get hasFrame() {
-    return process.platform === 'linux' || process.platform === 'darwin'
+    return process.platform === 'linux' || process.platform === 'darwin' || process.platform === 'freebsd'
   }
 
   public static get showTitlebarIcons() {
