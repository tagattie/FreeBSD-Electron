--- electron-builder.ts.orig	2025-05-20 14:01:24 UTC
+++ electron-builder.ts
@@ -48,24 +48,24 @@ const config: Omit<Writable<Configuration>, "electronF
  */
 const config: Omit<Writable<Configuration>, "electronFuses"> & {
     // Make all fuses required to ensure they are all explicitly specified
-    electronFuses: Required<Configuration["electronFuses"]>;
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
     files: [
         "package.json",
         {
