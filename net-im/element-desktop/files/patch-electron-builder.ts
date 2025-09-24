--- electron-builder.ts.orig	2025-09-23 12:46:01 UTC
+++ electron-builder.ts
@@ -92,24 +92,24 @@ const config: Omit<Writable<Configuration>, "electronF
  */
 const config: Omit<Writable<Configuration>, "electronFuses"> & {
     // Make all fuses required to ensure they are all explicitly specified
-    electronFuses: Required<Configuration["electronFuses"]>;
+    // electronFuses: Required<Configuration["electronFuses"]>;
 } = {
     appId: variant.appId,
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
