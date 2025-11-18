--- scripts/afterpack.js.orig	2025-11-18 22:35:49 UTC
+++ scripts/afterpack.js
@@ -28,7 +28,7 @@ function getAppFileName(context) {
     case 'darwin':
     case 'mas':
         return 'Mattermost.app';
-    case 'linux':
+    case 'linux': case 'freebsd':
         return context.packager.executableName;
     default:
         return '';
