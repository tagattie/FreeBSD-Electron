--- bin/cp-snapshot.js.orig	2025-08-31 08:00:06 UTC
+++ bin/cp-snapshot.js
@@ -29,7 +29,7 @@ function getPathToElectron() {
         'dist/Electron.app/Contents/Frameworks/Electron Framework.framework/Versions/A/Resources'
       );
     case 'win32':
-    case 'linux':
+    case 'linux': case 'freebsd':
       return path.resolve(electronPath, '..', '..', '..', 'dist');
   }
 }
@@ -62,7 +62,7 @@ const useLoaderScriptFix = async (params) => {
 // copied and modified from https://github.com/Adamant-im/adamant-im/blob/7b20272a717833ffb0b49b034ab9974118fc59ec/scripts/electron/sandboxFix.js
 
 const useLoaderScriptFix = async (params) => {
-  if (params.electronPlatformName !== 'linux') {
+  if (params.electronPlatformName !== 'linux' && params.electronPlatformName !== 'freebsd') {
     // this fix is only required on linux
     return
   }
@@ -85,4 +85,4 @@ exec "$SCRIPT_DIR/${params.packager.executableName}.bi
   }
 
   console.log('sandbox fix successfully applied')
-}
\ No newline at end of file
+}
