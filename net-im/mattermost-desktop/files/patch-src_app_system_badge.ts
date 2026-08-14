--- src/app/system/badge.ts.orig	2026-08-05 10:05:33 UTC
+++ src/app/system/badge.ts
@@ -127,7 +127,7 @@ function showBadge(sessionExpired: boolean, mentionCou
     case 'darwin':
         showBadgeOSX(sessionExpired, mentionCount, showUnreadBadge);
         break;
-    case 'linux':
+    case 'linux': case 'freebsd':
         showBadgeLinux(sessionExpired, mentionCount);
         break;
     }
