--- src/app/system/badge.ts.orig	2026-05-05 05:14:08 UTC
+++ src/app/system/badge.ts
@@ -120,7 +120,7 @@ function showBadge(sessionExpired: boolean, mentionCou
     case 'darwin':
         showBadgeOSX(sessionExpired, mentionCount, showUnreadBadge);
         break;
-    case 'linux':
+    case 'linux': case 'freebsd':
         showBadgeLinux(sessionExpired, mentionCount);
         break;
     }
