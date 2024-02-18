--- vue.config.js.orig	2024-01-31 02:19:34 UTC
+++ vue.config.js
@@ -9,10 +9,10 @@ const archElectronConfig = {}
 
 const archElectronConfig = {}
 
-if (fs.existsSync('/usr/lib/electron') && fs.existsSync('/usr/lib/electron/version')) {
-  archElectronConfig.electronDist = '/usr/lib/electron'
+if (fs.existsSync('%%LOCALBASE%%/share/electron%%ELECTRON_VER_MAJOR%%') && fs.existsSync('%%LOCALBASE%%/share/electron%%ELECTRON_VER_MAJOR%%/version')) {
+  archElectronConfig.electronDist = '%%LOCALBASE%%/share/electron%%ELECTRON_VER_MAJOR%%'
   archElectronConfig.electronVersion = fs
-    .readFileSync('/usr/lib/electron/version', { encoding: 'utf-8' })
+    .readFileSync('%%LOCALBASE%%/share/electron%%ELECTRON_VER_MAJOR%%/version', { encoding: 'utf-8' })
     .replace('v', '')
     .trim()
 }
