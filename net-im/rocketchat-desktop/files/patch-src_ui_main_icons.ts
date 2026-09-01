--- src/ui/main/icons.ts.orig	2026-08-31 19:36:42 UTC
+++ src/ui/main/icons.ts
@@ -100,7 +100,7 @@ export const getTrayIconPath = ({
     case 'win32':
       return getWindowsTrayIconPath(badge, presence, disconnected);
 
-    case 'linux':
+    case 'linux': case 'freebsd':
       return getLinuxTrayIconPath(badge, presence, disconnected);
 
     default:
