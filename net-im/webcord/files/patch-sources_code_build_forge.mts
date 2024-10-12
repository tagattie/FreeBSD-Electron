--- sources/code/build/forge.mts.orig	2024-10-06 11:02:45 UTC
+++ sources/code/build/forge.mts
@@ -114,7 +114,8 @@ const config:ForgeConfig = {
     osxUniversal: {
       mergeASARs: true
     },
-    osxSign: true
+    osxSign: true,
+    electronZipDir: projectPath
   },
   makers: [
     /* === STABLE MAKERS: === */
