--- src/ui/main/icons.ts.orig	2026-10-01 16:08:15 UTC
+++ src/ui/main/icons.ts
@@ -140,7 +140,7 @@ export const getTrayIconPath = ({
         showUnreadCounter
       );
 
-    case 'linux':
+    case 'linux': case 'freebsd':
       return getLinuxTrayIconPath(
         badge,
         presence,
