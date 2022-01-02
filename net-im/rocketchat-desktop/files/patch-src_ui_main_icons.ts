--- src/ui/main/icons.ts.orig	2022-01-02 03:59:54 UTC
+++ src/ui/main/icons.ts
@@ -54,7 +54,7 @@ export const getTrayIconPath = ({
     case 'win32':
       return getWindowsTrayIconPath(badge);
 
-    case 'linux':
+    case 'linux': case 'freebsd':
       return getLinuxTrayIconPath(badge);
 
     default:
