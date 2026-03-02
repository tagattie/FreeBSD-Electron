--- src/main/CriticalErrorHandler.ts.orig	2026-02-24 16:38:27 UTC
+++ src/main/CriticalErrorHandler.ts
@@ -101,7 +101,7 @@ export class CriticalErrorHandler {
             return spawn('cmd', ['/C', 'start', url], spawnOption);
         case 'darwin':
             return spawn('open', [url], spawnOption);
-        case 'linux':
+        case 'linux': case 'freebsd':
             return spawn('xdg-open', [url], spawnOption);
         default:
             return undefined;
