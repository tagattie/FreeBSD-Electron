--- src/main/downloadsManager.ts.orig	2026-02-24 16:38:27 UTC
+++ src/main/downloadsManager.ts
@@ -608,7 +608,7 @@ export class DownloadsManager extends JsonFileManager<
             };
 
             // Linux doesn't support the thumbnail creation so we have to use the base function
-            if (process.platform === 'linux') {
+            if (process.platform === 'linux' || process.platform === 'freebsd') {
                 await fallback();
             } else {
                 // This has been known to fail on Windows, see: https://github.com/mattermost/desktop/issues/3140
