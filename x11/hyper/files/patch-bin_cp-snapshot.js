--- bin/cp-snapshot.js.orig	2026-05-29 05:26:48 UTC
+++ bin/cp-snapshot.js
@@ -36,7 +36,7 @@ function getPathToElectron() {
         'dist/Electron.app/Contents/Frameworks/Electron Framework.framework/Versions/A/Resources'
       );
     case 'win32':
-    case 'linux':
+    case 'linux': case 'freebsd':
       return path.resolve(electronPath, '..', '..', '..', 'dist');
   }
 }
@@ -69,7 +69,7 @@ const useLoaderScriptFix = async (params) => {
 // copied and modified from https://github.com/Adamant-im/adamant-im/blob/7b20272a717833ffb0b49b034ab9974118fc59ec/scripts/electron/sandboxFix.js
 
 const useLoaderScriptFix = async (params) => {
-  if (params.electronPlatformName !== 'linux') {
+  if (params.electronPlatformName !== 'linux' && params.electronPlatformName !== 'freebsd') {
     // this fix is only required on linux
     return
   }
