--- src/main/screenShare.ts.orig	2026-10-21 23:21:33 UTC
+++ src/main/screenShare.ts
@@ -13,7 +13,7 @@ const isWayland =
 import { handle } from "./utils/ipcWrappers";
 
 const isWayland =
-    process.platform === "linux" && (process.env.XDG_SESSION_TYPE === "wayland" || !!process.env.WAYLAND_DISPLAY);
+    (process.platform === "linux" || process.platform === "freebsd") && (process.env.XDG_SESSION_TYPE === "wayland" || !!process.env.WAYLAND_DISPLAY);
 
 const supportsLoopbackWithoutChrome = process.platform === "win32" && Number(release().split(".").pop()) >= 19045;
 
