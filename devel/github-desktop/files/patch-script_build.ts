--- script/build.ts.orig	2023-03-01 18:22:01 UTC
+++ script/build.ts
@@ -146,6 +146,9 @@ function packageApp() {
     if (platform === 'win32' || platform === 'darwin' || platform === 'linux') {
       return platform
     }
+    if (platform === 'freebsd') {
+      return 'linux'
+    }
     throw new Error(
       `Unable to convert to platform for electron-packager: '${process.platform}`
     )
