--- app/config/paths.ts.orig	2021-10-09 08:39:21 UTC
+++ app/config/paths.ts
@@ -63,7 +63,7 @@ const defaultPlatformKeyPath = () => {
       return darwinKeys;
     case 'win32':
       return win32Keys;
-    case 'linux':
+    case 'linux': case 'freebsd':
       return linuxKeys;
     default:
       return darwinKeys;
