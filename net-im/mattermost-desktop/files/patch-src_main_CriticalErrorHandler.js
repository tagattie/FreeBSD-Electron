--- src/main/CriticalErrorHandler.js.orig	2020-02-13 05:54:26 UTC
+++ src/main/CriticalErrorHandler.js
@@ -25,7 +25,7 @@ function openDetachedExternal(url) {
     return spawn('cmd', ['/C', 'start', url], spawnOption);
   case 'darwin':
     return spawn('open', [url], spawnOption);
-  case 'linux':
+  case 'linux': case 'freebsd':
     return spawn('xdg-open', [url], spawnOption);
   default:
     return null;
