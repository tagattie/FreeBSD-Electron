--- app/notify.ts.orig	2025-08-31 08:00:06 UTC
+++ app/notify.ts
@@ -17,5 +17,5 @@ const _createNotification = (title: string, body: stri
 }
 
 const _createNotification = (title: string, body: string) => {
-  new Notification({title, body, ...(process.platform === 'linux' && {icon})}).show();
+  new Notification({title, body, ...((process.platform === 'linux' || process.platform === 'freebsd') && {icon})}).show();
 };
