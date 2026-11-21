--- src/app/system/badge.ts.orig	2026-11-05 06:34:20 UTC
+++ src/app/system/badge.ts
@@ -125,7 +125,7 @@ function showBadge(sessionExpired: boolean, mentionCou
     case 'darwin':
         showBadgeOSX(sessionExpired, mentionCount, showUnreadBadge);
         break;
-    case 'linux':
+    case 'linux': case 'freebsd':
         showBadgeLinux(sessionExpired, mentionCount);
         break;
     }
