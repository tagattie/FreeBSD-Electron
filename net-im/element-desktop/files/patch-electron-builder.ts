--- electron-builder.ts.orig	2025-04-23 11:15:41 UTC
+++ electron-builder.ts
@@ -71,25 +71,25 @@ const config: Omit<Writable<Configuration>, "electronF
  * @see https://www.electron.build/configuration/configuration
  */
 const config: Omit<Writable<Configuration>, "electronFuses"> & {
-    // Make all fuses required to ensure they are all explicitly specified
-    electronFuses: Required<Configuration["electronFuses"]>;
+    // // Make all fuses required to ensure they are all explicitly specified
+    // electronFuses: Required<Configuration["electronFuses"]>;
 } = {
     appId: "im.riot.app",
     asarUnpack: "**/*.node",
-    electronFuses: {
-        enableCookieEncryption: true,
-        onlyLoadAppFromAsar: true,
-        grantFileProtocolExtraPrivileges: false,
+    // electronFuses: {
+    //     enableCookieEncryption: true,
+    //     onlyLoadAppFromAsar: true,
+    //     grantFileProtocolExtraPrivileges: false,
 
-        runAsNode: false,
-        enableNodeOptionsEnvironmentVariable: false,
-        enableNodeCliInspectArguments: false,
-        // We need to reset the signature if we are not signing on darwin otherwise it won't launch
-        resetAdHocDarwinSignature: !process.env.APPLE_TEAM_ID,
+    //     runAsNode: false,
+    //     enableNodeOptionsEnvironmentVariable: false,
+    //     enableNodeCliInspectArguments: false,
+    //     // We need to reset the signature if we are not signing on darwin otherwise it won't launch
+    //     resetAdHocDarwinSignature: !process.env.APPLE_TEAM_ID,
 
-        loadBrowserProcessSpecificV8Snapshot: false,
-        enableEmbeddedAsarIntegrityValidation: true,
-    },
+    //     loadBrowserProcessSpecificV8Snapshot: false,
+    //     enableEmbeddedAsarIntegrityValidation: true,
+    // },
     afterPack: async (context: AfterPackContext) => {
         await injectAsarIntegrity(context);
     },
