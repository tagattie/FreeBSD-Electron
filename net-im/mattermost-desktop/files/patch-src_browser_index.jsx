--- src/browser/index.jsx.orig	2020-02-13 05:53:03 UTC
+++ src/browser/index.jsx
@@ -121,7 +121,7 @@ function showBadge(sessionExpired, unreadCount, mentio
   case 'darwin':
     showBadgeOSX(sessionExpired, unreadCount, mentionCount);
     break;
-  case 'linux':
+  case 'linux': case 'freebsd':
     showBadgeLinux(sessionExpired, unreadCount, mentionCount);
     break;
   }
