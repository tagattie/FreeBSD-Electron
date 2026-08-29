--- src/main/main.ts.orig	2026-08-29 13:38:48 UTC
+++ src/main/main.ts
@@ -26,7 +26,7 @@ process.env.VENCORD_USER_DATA_DIR = DATA_DIR;
 // Make the Vencord files use our DATA_DIR
 process.env.VENCORD_USER_DATA_DIR = DATA_DIR;
 
-const isLinux = process.platform === "linux";
+const isLinux = process.platform === "linux" || process.platform === "freebsd";
 
 export let enableHardwareAcceleration = true;
 
