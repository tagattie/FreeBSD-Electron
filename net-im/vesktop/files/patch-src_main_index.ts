--- src/main/index.ts.orig	2025-08-27 22:17:42 UTC
+++ src/main/index.ts
@@ -26,7 +26,7 @@ process.env.VENCORD_USER_DATA_DIR = DATA_DIR;
 // Make the Vencord files use our DATA_DIR
 process.env.VENCORD_USER_DATA_DIR = DATA_DIR;
 
-const isLinux = process.platform === "linux";
+const isLinux = (process.platform === "linux" || process.platform === "freebsd");
 
 export let enableHardwareAcceleration = true;
 
