--- bin/cp-snapshot.js.orig	2023-03-02 05:33:23 UTC
+++ bin/cp-snapshot.js
@@ -22,7 +22,7 @@ function getPathToElectron() {
         'node_modules/electron/dist/Electron.app/Contents/Frameworks/Electron Framework.framework/Versions/A/Resources'
       );
     case 'win32':
-    case 'linux':
+    case 'linux': case 'freebsd':
       return path.resolve(__dirname, '..', 'node_modules', 'electron', 'dist');
   }
 }
