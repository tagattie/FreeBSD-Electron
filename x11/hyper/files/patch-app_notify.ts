--- app/notify.ts.orig	2021-12-30 13:29:33 UTC
+++ app/notify.ts
@@ -16,5 +16,5 @@ export default function notify(title: string, body = '
 }
 
 const _createNotification = (title: string, body: string) => {
-  new Notification({title, body, ...(process.platform === 'linux' && {icon})}).show();
+  new Notification({title, body, ...((process.platform === 'linux' || process.platform === 'freebsd') && {icon})}).show();
 };
