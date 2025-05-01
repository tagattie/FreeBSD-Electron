--- electron-builder.config.js.orig	2025-04-20 06:09:22 UTC
+++ electron-builder.config.js
@@ -58,6 +58,14 @@ const platformSpecificConfig = {
             ],
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
