--- src/main/main.ts.orig	2026-11-05 17:23:08 UTC
+++ src/main/main.ts
@@ -27,7 +27,7 @@ process.env.VENCORD_USER_DATA_DIR = DATA_DIR;
 // Make the Vencord files use our DATA_DIR
 process.env.VENCORD_USER_DATA_DIR = DATA_DIR;
 
-const isLinux = process.platform === "linux";
+const isLinux = process.platform === "linux" || process.platform === "freebsd";
 
 export let enableHardwareAcceleration = true;
 
