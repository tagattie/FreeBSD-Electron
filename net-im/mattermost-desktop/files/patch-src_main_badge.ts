--- src/main/badge.ts.orig	2023-06-19 18:19:05 UTC
+++ src/main/badge.ts
@@ -120,7 +120,7 @@ function showBadge(sessionExpired: boolean, mentionCou
     case 'darwin':
         showBadgeOSX(sessionExpired, mentionCount, showUnreadBadge);
         break;
-    case 'linux':
+    case 'linux': case 'freebsd':
         showBadgeLinux(sessionExpired, mentionCount);
         break;
     }
