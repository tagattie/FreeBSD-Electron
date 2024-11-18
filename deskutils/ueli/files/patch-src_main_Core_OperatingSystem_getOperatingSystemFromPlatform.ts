--- src/main/Core/OperatingSystem/getOperatingSystemFromPlatform.ts.orig	2024-11-11 07:16:12 UTC
+++ src/main/Core/OperatingSystem/getOperatingSystemFromPlatform.ts
@@ -5,6 +5,7 @@ export const getOperatingSystemFromPlatform = (platfor
         darwin: "macOS",
         win32: "Windows",
         linux: "Linux",
+        freebsd: "Linux",
     };
 
     const operatingSystem = operatingSystemMap[platform];
