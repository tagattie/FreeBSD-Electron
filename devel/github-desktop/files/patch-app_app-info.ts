--- app/app-info.ts.orig	2023-03-08 00:23:56 UTC
+++ app/app-info.ts
@@ -34,7 +34,7 @@ export function getReplacements() {
     ),
     __DARWIN__: process.platform === 'darwin',
     __WIN32__: process.platform === 'win32',
-    __LINUX__: process.platform === 'linux',
+    __LINUX__: (process.platform === 'linux' || process.platform === 'freebsd'),
     __APP_NAME__: s(productName),
     __APP_VERSION__: s(version),
     __DEV__: isDevBuild,
