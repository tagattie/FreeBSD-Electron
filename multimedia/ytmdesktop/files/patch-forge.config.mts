--- forge.config.mts.orig	2026-10-28 22:31:39 UTC
+++ forge.config.mts
@@ -33,7 +33,8 @@ const config: ForgeConfig = {
       }
     ],
     appCategoryType: "public.app-category.music",
-    asar: true
+    asar: true,
+    electronZipDir: __dirname
   },
   rebuildConfig: {},
   makers: [
@@ -153,7 +154,7 @@ const config: ForgeConfig = {
             return ""
         }
       })()
-      const pkgs = ["xosms", `@xosms/xosms-${platform}-${arch}${xosmsPlatformSuffix}`];
+      const pkgs = ["xosms"];
 
       await Promise.all(
         pkgs.map(async pkg => {
