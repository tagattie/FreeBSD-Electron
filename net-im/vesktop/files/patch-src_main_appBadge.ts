--- src/main/appBadge.ts.orig	2026-11-05 17:23:08 UTC
+++ src/main/appBadge.ts
@@ -33,7 +33,7 @@ export function setBadgeCount(count: number) {
     AppEvents.emit("setTrayVariant", count !== 0 ? "trayUnread" : "tray");
 
     switch (process.platform) {
-        case "linux":
+        case "linux": case "freebsd":
             if (count === -1) count = 0;
             app.setBadgeCount(count);
             break;
