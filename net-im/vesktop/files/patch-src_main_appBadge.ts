--- src/main/appBadge.ts.orig	2025-10-19 18:07:32 UTC
+++ src/main/appBadge.ts
@@ -33,7 +33,7 @@ export function setBadgeCount(count: number) {
     AppEvents.emit("setTrayVariant", count !== 0 ? "trayUnread" : "tray");
 
     switch (process.platform) {
-        case "linux":
+        case "linux": case "freebsd":
             if (count === -1) count = 0;
             updateUnityLauncherCount(count);
             break;
