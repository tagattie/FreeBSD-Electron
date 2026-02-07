--- apps/desktop/desktop_native/build.js.orig	2026-02-02 09:34:46 UTC
+++ apps/desktop/desktop_native/build.js
@@ -13,6 +13,8 @@ const rustTargetsMap = {
     "aarch64-apple-darwin":       { nodeArch: 'arm64', platform: 'darwin' },
     'x86_64-unknown-linux-gnu':   { nodeArch: 'x64',   platform: 'linux'  },
     'aarch64-unknown-linux-gnu':  { nodeArch: 'arm64', platform: 'linux'  },
+    'x86_64-unknown-freebsd':     { nodeArch: 'x64',   platform: 'freebsd' },
+    'aarch64-unknown-freebsd':    { nodeArch: 'arm64', platform: 'freebsd' },
 }
 
 // Ensure the dist directory exists
@@ -97,7 +99,7 @@ function buildProcessIsolation() {
 }
 
 function buildProcessIsolation() {
-    if (process.platform !== "linux") {
+    if (process.platform !== "linux" && process.platform !== "freebsd") {
         return;
     }
 
