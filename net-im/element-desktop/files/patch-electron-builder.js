--- electron-builder.js.orig	2024-01-16 21:10:42 UTC
+++ electron-builder.js
@@ -35,7 +35,7 @@ const config = {
 const config = {
     appId: "im.riot.app",
     asarUnpack: "**/*.node",
-    afterPack: async (context) => {
+    /* afterPack: async (context) => {
         if (context.electronPlatformName !== "darwin" || context.arch === Arch.universal) {
             // Burn in electron fuses for proactive security hardening.
             // On macOS, we only do this for the universal package, as the constituent arm64 and amd64 packages are embedded within.
@@ -71,7 +71,7 @@ const config = {
                 [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: false,
             });
         }
-    },
+    }, */
     files: [
         "package.json",
         {
