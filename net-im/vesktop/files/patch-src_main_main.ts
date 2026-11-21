--- src/main/main.ts.orig	2026-11-19 18:38:38 UTC
+++ src/main/main.ts
@@ -32,7 +32,7 @@ process.env.VENCORD_USER_DATA_DIR = DATA_DIR;
 // Make the Vencord files use our DATA_DIR
 process.env.VENCORD_USER_DATA_DIR = DATA_DIR;
 
-const isLinux = process.platform === "linux";
+const isLinux = process.platform === "linux" || process.platform === "freebsd";
 
 export let enableHardwareAcceleration = true;
 
