--- electron/default_app/default_app.ts.orig	2020-04-30 17:03:43 UTC
+++ electron/default_app/default_app.ts
@@ -61,7 +61,7 @@ async function createWindow () {
     show: false
   };
 
-  if (process.platform === 'linux') {
+  if (process.platform === 'linux' || process.platform === 'freebsd') {
     options.icon = path.join(__dirname, 'icon.png');
   }
 
