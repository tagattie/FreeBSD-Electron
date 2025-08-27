--- src/main/appBadge.ts.orig	2025-08-27 22:19:25 UTC
+++ src/main/appBadge.ts
@@ -23,7 +23,7 @@ export function setBadgeCount(count: number) {
 
 export function setBadgeCount(count: number) {
     switch (process.platform) {
-        case "linux":
+        case "linux": case "freebsd":
             if (count === -1) count = 0;
             app.setBadgeCount(count);
             break;
