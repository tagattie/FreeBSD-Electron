--- app/config/paths.ts.orig	2025-08-31 08:00:06 UTC
+++ app/config/paths.ts
@@ -71,7 +71,7 @@ const defaultPlatformKeyPath = () => {
       return darwinKeys;
     case 'win32':
       return win32Keys;
-    case 'linux':
+    case 'linux': case 'freebsd':
       return linuxKeys;
     default:
       return darwinKeys;
