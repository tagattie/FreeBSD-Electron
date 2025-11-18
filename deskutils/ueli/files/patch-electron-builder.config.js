--- electron-builder.config.js.orig	2025-11-10 08:01:29 UTC
+++ electron-builder.config.js
@@ -59,6 +59,14 @@ const platformSpecificConfig = {
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
