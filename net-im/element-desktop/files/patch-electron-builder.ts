--- electron-builder.ts.orig	2025-06-03 15:13:27 UTC
+++ electron-builder.ts
@@ -56,24 +56,24 @@ const config: Omit<Writable<Configuration>, "electronF
  */
 const config: Omit<Writable<Configuration>, "electronFuses"> & {
     // Make all fuses required to ensure they are all explicitly specified
-    electronFuses: Required<Configuration["electronFuses"]>;
+    // electronFuses: Required<Configuration["electronFuses"]>;
 } = {
     appId: DEFAULT_APP_ID,
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
