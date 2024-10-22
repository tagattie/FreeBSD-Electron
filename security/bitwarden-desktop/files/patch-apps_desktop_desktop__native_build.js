--- apps/desktop/desktop_native/build.js.orig	2024-10-22 14:07:33 UTC
+++ apps/desktop/desktop_native/build.js
@@ -45,6 +45,12 @@ switch (process.platform) {
         ];
     break;
 
+    case "freebsd":
+        targets = [
+            ["x86_64-unknown-freebsd", 'x64']
+        ];
+    break;
+
     default:
         targets = [
             ['x86_64-unknown-linux-musl', 'x64']
