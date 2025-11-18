--- apps/desktop/desktop_native/build.js.orig	2025-11-07 19:32:19 UTC
+++ apps/desktop/desktop_native/build.js
@@ -13,6 +13,7 @@ const rustTargetsMap = {
     "aarch64-apple-darwin":       { nodeArch: 'arm64', platform: 'darwin' },
     'x86_64-unknown-linux-musl':  { nodeArch: 'x64',   platform: 'linux'  },
     'aarch64-unknown-linux-musl': { nodeArch: 'arm64', platform: 'linux'  },
+    'x86_64-unknown-freebsd':     { nodeArch: 'x64',   platform: 'freebsd'  },
 }
 
 // Ensure the dist directory exists
@@ -65,7 +66,7 @@ function buildProcessIsolation() {
 }
 
 function buildProcessIsolation() {
-    if (process.platform !== "linux") {
+    if (process.platform !== "linux" && process.platform !== "freebsd") {
         return;
     }
 
