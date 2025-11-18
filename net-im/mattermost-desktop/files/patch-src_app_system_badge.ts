--- src/app/system/badge.ts.orig	2025-11-18 22:36:27 UTC
+++ src/app/system/badge.ts
@@ -119,7 +119,7 @@ function showBadge(sessionExpired: boolean, mentionCou
     case 'darwin':
         showBadgeOSX(sessionExpired, mentionCount, showUnreadBadge);
         break;
-    case 'linux':
+    case 'linux': case 'freebsd':
         showBadgeLinux(sessionExpired, mentionCount);
         break;
     }
