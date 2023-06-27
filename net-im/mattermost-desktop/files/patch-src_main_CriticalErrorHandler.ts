--- src/main/CriticalErrorHandler.ts.orig	2023-06-19 18:19:05 UTC
+++ src/main/CriticalErrorHandler.ts
@@ -100,7 +100,7 @@ export class CriticalErrorHandler {
             return spawn('cmd', ['/C', 'start', url], spawnOption);
         case 'darwin':
             return spawn('open', [url], spawnOption);
-        case 'linux':
+        case 'linux': case 'freebsd':
             return spawn('xdg-open', [url], spawnOption);
         default:
             return undefined;
