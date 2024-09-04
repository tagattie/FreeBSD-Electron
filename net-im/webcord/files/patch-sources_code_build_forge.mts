--- sources/code/build/forge.mts.orig	2024-08-25 00:06:02 UTC
+++ sources/code/build/forge.mts
@@ -116,7 +116,8 @@ const config:ForgeConfig = {
     osxUniversal: {
       mergeASARs: true
     },
-    osxSign: true
+    osxSign: true,
+    electronZipDir: projectPath
   },
   makers: [
     /* === STABLE MAKERS: === */
