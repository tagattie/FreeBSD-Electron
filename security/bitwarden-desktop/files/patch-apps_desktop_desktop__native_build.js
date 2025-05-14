--- apps/desktop/desktop_native/build.js.orig	2025-04-28 18:52:32 UTC
+++ apps/desktop/desktop_native/build.js
@@ -13,6 +13,7 @@ const rustTargetsMap = {
     "aarch64-apple-darwin":       { nodeArch: 'arm64', platform: 'darwin' },
     'x86_64-unknown-linux-musl':  { nodeArch: 'x64',   platform: 'linux'  },
     'aarch64-unknown-linux-musl': { nodeArch: 'arm64', platform: 'linux'  },
+    'x86_64-unknown-freebsd':     { nodeArch: 'x64',   platform: 'freebsd'  },
 }
 
 // Ensure the dist directory exists
