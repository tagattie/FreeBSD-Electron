--- src/main/badge.ts.orig	2021-12-31 10:15:37 UTC
+++ src/main/badge.ts
@@ -56,7 +56,7 @@ function showBadge(sessionExpired: boolean, mentionCou
     case 'darwin':
         showBadgeOSX(sessionExpired, mentionCount, showUnreadBadge);
         break;
-    case 'linux':
+    case 'linux': case 'freebsd':
         showBadgeLinux(sessionExpired, mentionCount);
         break;
     }
