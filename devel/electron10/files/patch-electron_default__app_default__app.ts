--- electron/default_app/default_app.ts.orig	2021-01-14 16:50:03 UTC
+++ electron/default_app/default_app.ts
@@ -59,7 +59,7 @@ async function createWindow () {
     show: false
   };
 
-  if (process.platform === 'linux') {
+  if (process.platform === 'linux' || process.platform === 'freebsd') {
     options.icon = path.join(__dirname, 'icon.png');
   }
 
