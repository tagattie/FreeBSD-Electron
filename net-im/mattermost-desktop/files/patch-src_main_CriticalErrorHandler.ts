--- src/main/CriticalErrorHandler.ts.orig	2024-05-16 20:45:52 UTC
+++ src/main/CriticalErrorHandler.ts
@@ -98,7 +98,7 @@ export class CriticalErrorHandler {
             return spawn('cmd', ['/C', 'start', url], spawnOption);
         case 'darwin':
             return spawn('open', [url], spawnOption);
-        case 'linux':
+        case 'linux': case 'freebsd':
             return spawn('xdg-open', [url], spawnOption);
         default:
             return undefined;
