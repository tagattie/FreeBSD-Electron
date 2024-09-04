--- node_modules/@electron/get/dist/cjs/index.js.orig	1971-12-10 00:00:00 UTC
+++ node_modules/@electron/get/dist/cjs/index.js
@@ -67,7 +67,7 @@ async function validateArtifact(artifactDetails, downl
                     mirrorOptions: artifactDetails.mirrorOptions,
                     // Never use the cache for loading checksums, load
                     // them fresh every time
-                    cacheMode: types_1.ElectronDownloadCacheMode.Bypass,
+                    cacheMode: types_1.ElectronDownloadCacheMode.ReadOnly,
                 });
             }
             try {
