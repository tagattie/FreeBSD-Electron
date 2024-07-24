--- electron-builder.config.js.orig	2024-07-23 21:48:42 UTC
+++ electron-builder.config.js
@@ -53,6 +53,14 @@ const platformSpecificConfig = {
             target: [{ target: "AppImage" }, { target: "deb" }, { target: "zip" }],
         },
     },
+    freebsd: {
+        ...baseConfig,
+        linux: {
+            icon: "assets/Build/app-icon-dark.png",
+            category: "Utility",
+            target: [{ target: "AppImage" }, { target: "deb" }, { target: "zip" }],
+        },
+    },
 };
 
 module.exports = platformSpecificConfig[process.platform];
