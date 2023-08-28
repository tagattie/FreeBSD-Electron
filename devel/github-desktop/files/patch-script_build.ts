--- script/build.ts.orig	2023-08-26 16:06:35 UTC
+++ script/build.ts
@@ -125,6 +125,9 @@ function packageApp() {
     if (platform === 'win32' || platform === 'darwin' || platform === 'linux') {
       return platform
     }
+    if (platform === 'freebsd') {
+      return 'linux'
+    }
     throw new Error(
       `Unable to convert to platform for electron-packager: '${process.platform}`
     )
@@ -165,7 +168,7 @@ function packageApp() {
   // this setting only works for macOS and Windows, so let's clear it now to ensure
   // the app is working as expected
   const icon =
-    process.platform === 'linux'
+    (process.platform === 'linux' || process.platform === 'freebsd')
       ? undefined
       : path.join(projectRoot, 'app', 'static', 'logos', getIconFileName())
 
