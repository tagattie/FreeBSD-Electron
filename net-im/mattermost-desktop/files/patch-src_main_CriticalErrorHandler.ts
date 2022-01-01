--- src/main/CriticalErrorHandler.ts.orig	2021-11-15 14:21:52 UTC
+++ src/main/CriticalErrorHandler.ts
@@ -31,7 +31,7 @@ function openDetachedExternal(url: string) {
         return spawn('cmd', ['/C', 'start', url], spawnOption);
     case 'darwin':
         return spawn('open', [url], spawnOption);
-    case 'linux':
+    case 'linux': case 'freebsd':
         return spawn('xdg-open', [url], spawnOption);
     default:
         return undefined;
