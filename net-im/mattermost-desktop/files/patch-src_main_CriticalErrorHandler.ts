--- src/main/CriticalErrorHandler.ts.orig	2022-12-06 14:05:15 UTC
+++ src/main/CriticalErrorHandler.ts
@@ -28,7 +28,7 @@ function openDetachedExternal(url: string) {
         return spawn('cmd', ['/C', 'start', url], spawnOption);
     case 'darwin':
         return spawn('open', [url], spawnOption);
-    case 'linux':
+    case 'linux': case 'freebsd':
         return spawn('xdg-open', [url], spawnOption);
     default:
         return undefined;
