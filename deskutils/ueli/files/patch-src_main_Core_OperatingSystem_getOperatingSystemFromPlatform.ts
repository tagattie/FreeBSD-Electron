--- src/main/Core/OperatingSystem/getOperatingSystemFromPlatform.ts.orig	2024-07-23 21:51:24 UTC
+++ src/main/Core/OperatingSystem/getOperatingSystemFromPlatform.ts
@@ -1,10 +1,11 @@ export const getOperatingSystemFromPlatform = (platfor
 import type { OperatingSystem } from "@common/Core";
 
 export const getOperatingSystemFromPlatform = (platform: string): OperatingSystem => {
-    const operatingSystemMap: Record<"darwin" | "win32" | "linux", OperatingSystem> = {
+    const operatingSystemMap: Record<"darwin" | "win32" | "linux" | "freebsd", OperatingSystem> = {
         darwin: "macOS",
         win32: "Windows",
         linux: "Linux",
+        freebsd: "Linux",
     };
 
     const operatingSystem = operatingSystemMap[platform];
