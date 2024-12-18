--- electron-builder.ts.orig	2024-12-17 13:50:37 UTC
+++ electron-builder.ts
@@ -51,7 +51,7 @@ const config: Writable<Configuration> = {
 const config: Writable<Configuration> = {
     appId: "im.riot.app",
     asarUnpack: "**/*.node",
-    afterPack: async (context: AfterPackContext) => {
+    /* afterPack: async (context: AfterPackContext) => {
         if (context.electronPlatformName !== "darwin" || context.arch === Arch.universal) {
             // Burn in electron fuses for proactive security hardening.
             // On macOS, we only do this for the universal package, as the constituent arm64 and amd64 packages are embedded within.
@@ -87,7 +87,7 @@ const config: Writable<Configuration> = {
                 [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: false,
             });
         }
-    },
+    }, */
     files: [
         "package.json",
         {
