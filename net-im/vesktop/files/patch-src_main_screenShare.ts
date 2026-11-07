--- src/main/screenShare.ts.orig	2026-11-05 17:23:08 UTC
+++ src/main/screenShare.ts
@@ -15,7 +15,7 @@ const isWayland =
 import { isDiscordUrl } from "./utils/isDiscordUrl";
 
 const isWayland =
-    process.platform === "linux" && (process.env.XDG_SESSION_TYPE === "wayland" || !!process.env.WAYLAND_DISPLAY);
+    (process.platform === "linux" || process.platform === "freebsd") && (process.env.XDG_SESSION_TYPE === "wayland" || !!process.env.WAYLAND_DISPLAY);
 
 const supportsLoopbackWithoutChrome = process.platform === "win32" && Number(release().split(".").pop()) >= 19045;
 
